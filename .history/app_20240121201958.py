from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/home')
def home():
    return render_template('home')

@app.route('/<page_name>')
def render_dynamic_page(page_name):
    # Render the template dynamically based on the page name
    return render_template(f'{page_name}')

@app.route('/submit', methods=['POST'])
def receive_data():
    # Get the JSON data from the request
    data_received = request.get_json()

    # Extract the formData dictionary from the received data
    formData = data_received.get('formData', {})
    print(formData)
    # Process the formData as needed
    # ...

    # Return a response if necessary
    response = {'status': 'success'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
