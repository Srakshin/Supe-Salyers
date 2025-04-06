from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your JS frontend

genai.configure(api_key="AIzaSyDydWxM_3IoML4ZPSe-YAlBQOZvXGCz8PI")
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat()

@app.route("/api/chat", methods=["POST"])
def chatbot():
    user_input = request.json.get("message")
    response = chat.send_message(user_input)
    return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)
