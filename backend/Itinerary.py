from flask import Flask, request, jsonify, send_file
from fpdf import FPDF
import google.generativeai as genai
import os
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Replace with your actual Gemini API Key
genai.configure(api_key="AIzaSyDydWxM_3IoML4ZPSe-YAlBQOZvXGCz8PI")
model = genai.GenerativeModel("gemini-1.5-flash")

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

@app.route("/download-pdf", methods=["POST"])
def download_pdf():
    data = request.json
    itinerary = data.get("itinerary", "No itinerary content.")
    
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, itinerary)
    
    pdf_stream = BytesIO()
    pdf.output(pdf_stream)
    pdf_stream.seek(0)

    return send_file(pdf_stream, as_attachment=True, download_name="Travel_Itinerary.pdf", mimetype="application/pdf")

if __name__ == "__main__":
    app.run(debug=True)
