from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

current_state = None

@app.route("/")
def test():
    return "pog"

@app.route("/status")
def get_status():
    return jsonify(current_state)

@app.route("/update-master", methods=["POST"])
def update_master():
    current_state = request.json
    return "SUCCESS"
