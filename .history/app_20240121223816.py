from flask import Flask, render_template, request, jsonify
import firebase_admin
from firebase_admin import credentials,db
from firebase_admin import firestore
import time
import os
from collections import Counter
from itertools import zip_longest
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import re
from string import punctuation
from itertools import zip_longest
from pdfminer.high_level import extract_text
import requests
import io
from PIL import Image
from io import BytesIO
import torch
import ipywidgets as widgets
import IPython.display as display
import en_core_web_sm
import base64
cred = credentials.Certificate("sigma-50b08-firebase-adminsdk-xrxnc-f8669db2bd.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://sigma-50b08-default-rtdb.firebaseio.com/'
})
import uuid

nlp = spacy.load("en_core_web_sm")

nlp1 = pipeline("k2t-base")

config = {"do_sample": True, "num_beams": 4, "no_repeat_ngram_size": 3, "early_stopping": False, "max_new_tokens":100}

API_TOKEN="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"
API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

device = "cuda" if torch.cuda.is_available() else "cpu"
model = torch.hub.load("bryandlee/animegan2-pytorch:main", "generator", device=device).eval()
face2paint = torch.hub.load("bryandlee/animegan2-pytorch:main", "face2paint", device=device)
image_format = "png"

def get_hotwords(text, n=1):
    result = []
    pos_tag = ['PROPN', 'ADJ', 'NOUN']
    doc = nlp(text.lower())
    for token in doc:
        if (token.text in nlp.Defaults.stop_words or token.text in punctuation):
            continue
        if (token.pos_ in pos_tag):
            result.append(token.text)

    # Generate n-grams (bigrams or trigrams)
    ngrams = zip_longest(*[result[i:] for i in range(n)])
    ngrams = [' '.join(filter(None, ng)) for ng in ngrams]

    return ngrams


def calculate_cosine_similarity(report_texts):
    # Create a TfidfVectorizer to convert text to TF-IDF representation
    vectorizer = TfidfVectorizer()
    trigram_matrix = vectorizer.fit_transform(report_texts)

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(trigram_matrix, trigram_matrix)

    return cosine_sim

pdf_data = {}

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/home')
def home():
    return render_template('home')

@app.route('/<page_name>')
def render_dynamic_page(page_name):
    # Render the template dynamically based on the page name
    return render_template(f'{page_name}')

@app.route('/submit_idea', methods=['POST'])
def receive_data():
    print("OMG!!!!")
    # Get the JSON data from the request
    ideas = request.get_json()
    print(ideas)

    ideas_ref = db.reference('/ideas')

    # Generate a random ID
    idea_id = str(uuid.uuid4())

    # Add the idea data to the database with the random ID
    ideas_ref.child(idea_id).set(ideas)

    def categorize_expenses(range_start, range_end):
        # Define threshold values for Low, Medium, and High categories
        low_threshold = 1000
        medium_threshold = 5000

        # Calculate the range width
        range_width=(range_end + range_start)/2+ (range_end - range_start)/8
        print(range_width)
        # Categorize based on the range width
        if range_width < low_threshold:
            return "Low"
        elif range_width < medium_threshold:
            return "Medium"
        else:
            return "High"

    priceRange=ideas["priceRange"]
    a, b = priceRange.replace("'","").split("-")

    docs = nlp(text)
    text = ' '.join(token.text for token in docs if not token.ent_type_)
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)

    # Get 1-grams and store in a list
    output_1grams = get_hotwords(text, n=1)
    most_common_1grams = [item[0] for item in Counter(output_1grams).most_common(10) if item[1] > 1]

    # Get 2-grams (bigrams) and store in a list
    output_2grams = get_hotwords(text, n=2)
    most_common_2grams = [item[0] for item in Counter(output_2grams).most_common(20) if item[1] > 1]

    # Get 3-grams (trigrams) and store in a list
    output_3grams = get_hotwords(text, n=3)
    most_common_3grams = [item[0] for item in Counter(output_3grams).most_common(30) if item[1] > 1]

    # Combine all n-grams into a single list
    ngrams = most_common_1grams + most_common_2grams + most_common_3grams

    prompt=nlp1(ngrams[:3], **config)
    file_name = prompt.lower().replace(" ","-")

    image_raw=generate_and_save_image(prompt, file_name, save_image=False)
    image_buffer = io.BytesIO()
    image_raw.save(image_buffer, format='PNG')
    image_base64 = base64.b64encode(image_buffer.getvalue()).decode('utf-8')
    ideas_append = {
        "timeAdded":time.ctime(),
        "expenses": categorize_expenses(int(a), int(b)),
        "keywords":ngrams,
        "image":image_base64
    }
    ideas_ref.child(idea_id).update(ideas_append)
    # Return a response if necessary
    response = {'status': 'success'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
