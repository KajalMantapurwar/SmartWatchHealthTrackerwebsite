from flask import Flask, request, jsonify
from flask_cors import CORS  # To allow cross-origin requests

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")  # Allow only React dev server (port 3000)

USER_HEALTH_DATA = {
    "steps": 7500,
    "heartRate": 72,
    "sleepHours": 6.5,
}

# API route for fetching health data
@app.route("/api/health-data", methods=["GET"])
def get_health_data():
    print("Health data route hit!")  # Debugging log
    return jsonify(USER_HEALTH_DATA)

# API route for chatbot
@app.route("/api/chatbot", methods=["POST"])
def chatbot_response():
    data = request.get_json()
    query = data.get("query", "").lower()

    if "steps" in query:
        response = f"You have walked {USER_HEALTH_DATA['steps']} steps today."
    elif "heart rate" in query:
        response = f"Your heart rate is {USER_HEALTH_DATA['heartRate']} bpm."
    elif "sleep" in query:
        response = f"You slept for {USER_HEALTH_DATA['sleepHours']} hours."
    else:
        response = "Try asking about steps, heart rate, or sleep."

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
