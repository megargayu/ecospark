from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/sensors")
def get_sensors():
    return jsonify()
