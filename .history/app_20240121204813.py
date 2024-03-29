from flask import Flask, render_template, request, jsonify
import firebase_admin
from firebase_admin import credentials,db
from firebase_admin import firestore
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
    # Import the required libraries


    # Write data to Firestore
    

    ideas_ref = db.reference('/ideas')

    # Generate a random ID
    idea_id = str(uuid.uuid4())

    # Add the idea data to the database with the random ID
    ideas_ref.child(idea_id).add(ideas)

    
    # Process the formData as needed
    # ...

    # Return a response if necessary
    response = {'status': 'success'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
