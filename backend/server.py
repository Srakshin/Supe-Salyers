from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

genai.configure(api_key="AIzaSyDydWxM_3IoML4ZPSe-YAlBQOZvXGCz8PI")
model = genai.GenerativeModel("gemini-1.5-flash")

# Start chat session with a limited scope
chat = model.start_chat(history=[
    {
        "role": "user",
        "parts": [
            "You are a chatbot for a website focused on Indian heritage and culture. "
            "Only answer questions related to India’s traditions, history, architecture, festivals, art, and this website. "
            "If the user asks anything outside this scope, say: 'I’m here to help with Indian heritage and this website. I can’t answer that.'"
        ]
    }
])

# Track greeting status
has_greeted = False

@app.route("/api/chat", methods=["POST"])
def chatbot():
    global has_greeted
    user_input = request.json.get("message")

    # Greet only once
    if not has_greeted:
        has_greeted = True
        return jsonify({
            "reply": "Hey! Do you have any questions about India’s heritage, culture, or our website?"
        })

    # Process actual chat input
    try:
        response = chat.send_message(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Sorry, something went wrong."})
# chat = model.start_chat()

# @app.route("/api/chat", methods=["POST"])
# def chatbot():
#     user_input = request.json.get("message")
#     response = chat.send_message(user_input)
#     return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)
