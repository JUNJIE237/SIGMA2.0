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
from google.colab import files
import torch
import ipywidgets as widgets
import IPython.display as display

cred = credentials.Certificate("sigma-2-ec27d-firebase-adminsdk-zv9by-ee48ca898f.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://sigma-50b08-default-rtdb.firebaseio.com/'
})
import uuid

nlp = spacy.load("en_core_web_sm")

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
    ideas_append = {
        "timeAdded":time.ctime(),
        "expenses": categorize_expenses(int(a), int(b)),
    }
    ideas_ref.child(idea_id).update(ideas_append)
    # Return a response if necessary
    response = {'status': 'success'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
