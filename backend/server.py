from flask import Flask, request, jsonify
# from io import BytesIO
import google.generativeai as genai
from flask_cors import CORS
from flask import render_template

app = Flask(__name__)
CORS(app)


genai.configure(api_key="AIzaSyDydWxM_3IoML4ZPSe-YAlBQOZvXGCz8PI")  
model = genai.GenerativeModel("gemini-1.5-flash")

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
has_greeted = False

@app.route("/api/chat", methods=["POST"])
def chatbot():
    global has_greeted
    user_input = request.json.get("message")

    if not has_greeted:
        has_greeted = True
        return jsonify({
            "reply": "Hey! Do you have any questions about India’s heritage, culture, or our website?"
        })

    try:
        response = chat.send_message(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Sorry, something went wrong."})


@app.route("/generate-itinerary", methods=["POST"])
def generate_itinerary():
    data = request.json
    location = data.get("location")
    days = data.get("days")
    month = data.get("month")

    prompt = f"""
    Generate a {days}-day travel itinerary for {location} in {month}.
    Include specific timings for morning, afternoon, and evening activities, with food suggestions.
    Cover both popular and offbeat spots. Avoid pricing information.
    Format it as bullet points and easy-to-read sections.
    """

    try:
        response = model.generate_content(prompt)
        return jsonify({"itinerary": response.text})
    except Exception as e:
        return jsonify({"itinerary": f"⚠️ Error generating itinerary: {str(e)}"})


# @app.route("/download-pdf", methods=["POST"])
# def download_pdf():
#     data = request.json
#     itinerary = data.get("itinerary", "No itinerary content.")
    
#     pdf = FPDF()
#     pdf.add_page()

#     # Add and use the DejaVu font
#     pdf.add_font('DejaVu', '', 'fonts/DejaVuSans.ttf', uni=True)  # Make sure path is correct
#     pdf.set_font("DejaVu", size=12)

#     pdf.multi_cell(0, 10, itinerary)

#     pdf_stream = BytesIO()
#     pdf.output(pdf_stream)
#     pdf_stream.seek(0)

#     return send_file(pdf_stream, as_attachment=True, download_name="Travel_Itinerary.pdf", mimetype="application/pdf")

if __name__ == "__main__":
    app.run(debug=True)
