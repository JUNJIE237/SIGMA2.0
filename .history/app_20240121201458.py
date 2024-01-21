from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/home')
def home():
    return render_template('home')

@app.route('/<page_name>')
def render_dynamic_page(page_name):
    # Render the template dynamically based on the page name
    return render_template(f'{page_name}')

@app.route('/submit_idea', methods=['POST'])
def submit_idea():
    try:
        data_from_js = request.get_json()
        formData = data_received.get('formData', {})
        print(data_from_js)
        return jsonify({"status": "success", "message": "Idea submitted successfully"})
    except Exception as e:
        return jsonify({"status": "error", "message": f"Error processing data: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
