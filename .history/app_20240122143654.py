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
from keytotext import pipeline
import json
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

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content
def text_to_image(prompt, image_name):

    image_bytes = query({"inputs" : prompt,
                         "options" : {"use_cache" : False,
                                      "wait_for_model" : True}})
    image_raw = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image_raw.save(image_name + ".png")
    return image_raw
def filter_run(image, image_name):

    im_in = image
    im_out = face2paint(model, im_in, side_by_side=False)
    im_out.save(image_name + "_filtered" + ".png")
    return im_out
def run_promp(prompt, image_name):
    image_raw = text_to_image(prompt, image_name)
    image_filter = filter_run(image_raw, image_name)

    return image_raw, image_filter
def generate_and_save_image(prompt, file_name, save_image = True):

    image_raw, image_filter = run_promp(prompt, file_name)

    return image_raw


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
def calculate_cosine_similarity(idea_keywords_dict):
    # Extract 'keywords' from the dictionary and join them into a single string
    report_texts = [' '.join(keywords) for keywords in idea_keywords_dict.values()]

    # Create a TfidfVectorizer to convert text to TF-IDF representation
    vectorizer = TfidfVectorizer()
    trigram_matrix = vectorizer.fit_transform(report_texts)

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(trigram_matrix, trigram_matrix)

    # Create a DataFrame with idea keys as row and column labels
    cosine_sim_df = pd.DataFrame(cosine_sim, index=idea_keywords_dict.keys(), columns=idea_keywords_dict.keys())

    # Convert DataFrame to JSON string
    cosine_sim_json = cosine_sim_df.to_json()

    return cosine_sim_json


pdf_data = {}

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/home')
def home():
    return render_template('home')

@app.route('/<page_name>')
def render_dynamic_page(page_name):
    # Render the template dynamically based on the page name
    return render_template(f'{page_name}')

@app.route('/get_similarities', methods=['POST'])


@app.route('/submit_idea', methods=['POST'])
def receive_data():
    # Get the JSON data from the request
    ideas = request.get_json()

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
        # Categorize based on the range width
        if range_width < low_threshold:
            return "Low"
        elif range_width < medium_threshold:
            return "Medium"
        else:
            return "High"

    priceRange=ideas["priceRange"]
    a, b = priceRange.replace("'","").split("-")
    text=ideas["ideaContent"]
    docs = nlp(text)
    text = ' '.join(token.text for token in docs if not token.ent_type_)
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)

    output_1grams = get_hotwords(text, n=1)
    most_common_1grams = [item[0] for item in Counter(output_1grams).most_common(10) if item[1] > 1]

    output_2grams = get_hotwords(text, n=2)
    most_common_2grams = [item[0] for item in Counter(output_2grams).most_common(20) if item[1] > 1]

    output_3grams = get_hotwords(text, n=3)
    most_common_3grams = [item[0] for item in Counter(output_3grams).most_common(30) if item[1] > 1]

    ngrams = most_common_1grams + most_common_2grams + most_common_3grams
    print(ngrams)
    prompt=nlp1(ngrams[:3], **config)
    print(prompt)
    file_name = prompt.lower().replace(" ","-")

    image_raw=generate_and_save_image(prompt, file_name, save_image=False)
    image_buffer = io.BytesIO()
    image_raw.save(image_buffer, format='PNG')
    image_base64 = base64.b64encode(image_buffer.getvalue()).decode('utf-8')
    print(image_base64[:100]+"aaaaaaaaaaaaaaaaa")
    ideas_append = {
        "timeAdded":time.time(),
        "expenses": categorize_expenses(int(a), int(b)),
        "keywords":ngrams,
        "image":image_base64
    }
    ideas_ref.child(idea_id).update(ideas_append)

    def calculate_cosine_similarity(idea_keywords_dict):
    # Extract 'keywords' from the dictionary and join them into a single string
    report_texts = [' '.join(keywords) for keywords in idea_keywords_dict.values()]

    # Create a TfidfVectorizer to convert text to TF-IDF representation
    vectorizer = TfidfVectorizer()
    trigram_matrix = vectorizer.fit_transform(report_texts)

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(trigram_matrix, trigram_matrix)

    # Create a DataFrame with idea keys as row and column labels
    cosine_sim_df = pd.DataFrame(cosine_sim, index=idea_keywords_dict.keys(), columns=idea_keywords_dict.keys())

    # Convert DataFrame to JSON string
    cosine_sim_json = cosine_sim_df.to_json()

    return cosine_sim_json

# Assuming idea_keywords_dict is already defined
cosine_similarity_string = calculate_cosine_similarity({user_key: users[user_key]['keywords'] for user_key in users.keys()})

# Assuming db is initialized with Firebase
ideas_ref = db.reference('/similarities')

# Convert the JSON string to a Python dictionary
cosine_similarity_dict = json.loads(cosine_similarity_string)

# Update the Firebase database with the similarity data
ideas_ref.child('similarity').update(cosine_similarity_dict)
    # Return a response if necessary
    response = {'status': 'success'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
