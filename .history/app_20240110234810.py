from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='.',template_folder=static_folder='static')

@app.route('/busidea.html')
def index():
    return render_template('static/busidea.html')

@app.route('/submit_idea', methods=['POST'])
def submit_idea():
    try:
        data_from_js = request.json 

        return jsonify({"status": "success", "message": "Idea submitted successfully"})
    except Exception as e:
        return jsonify({"status": "error", "message": f"Error processing data: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
