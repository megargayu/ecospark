from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

current_state = {
    # Master
    "mac_address": "cc:db:a7:55:27:1c",
    "time": 1684120306,
    "panic_flag": "None",
    "data": [
        # Worker 1
        {
            "mac_address": "cc:db:a7:56:7a:30",
            "time": 1684120306,
            "panic_flag": "None",
            "sensors": {
                "temp": 24,
                "hum": 30,
                "pres": 100,
                "MQ2": 622,
                "MQ3": 509,
                "MQ7": 730,
                "MQ8": 821,
                "MQ5": 518
            }
        },
        # Worker 2
        {
            "mac_address": "cc:db:a7:56:3e:00",
            "time": 1684120306,
            "panic_flag": "None",
            "sensors": {
                "MQ4": 427,
                "MQ135": 135,
                "MQ6": 605,
                "MQ9": 908
            }
        }
    ]
}

@app.route("/test")
def test():
    return "SUCCESS"

@app.route("/status")
def get_status():
    return jsonify(current_state)

@app.route("/update-master", methods=["POST"])
def update_master():
    global current_state
    current_state = request.json
    print(request.json)
    return "SUCCESS"
