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

cred = credentials.Certificate("sigma-50b08-firebase-adminsdk-xrxnc-f8669db2bd.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://sigma-50b08-default-rtdb.firebaseio.com/'
})
import uuid



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

    thing="2339 - 3857"
a, b = thing.replace("'","").split("-")
print(categorize_range(int(a), int(b)))


    ideas_append = {
        "timeAdded":time.ctime(),
        "expenses": ideas["priceRange"],
    }
    ideas_ref.child(idea_id).update(ideas_append)
    # Return a response if necessary
    response = {'status': 'success'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
