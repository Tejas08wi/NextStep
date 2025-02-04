from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Google Generative AI configuration
genai.configure(api_key="AIzaSyAMZ7sJlD2ZlUyqObwLOZgJ9BGneYATG2o")

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 200,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Chatbot function
def get_response(input_text):
    chat_session = genai.ChatSession(model=model)  # Create a new chat session with the model
    # Add a welcome message if it's the start of a session
    if not input_text.strip():
        input_text = "Hi! How can I assist you today?"
    response = chat_session.send_message(input_text)
    return response.text

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if user_input:
        response = get_response(user_input)
        return jsonify({"response": response})
    return jsonify({"response": "No input received."})

if __name__ == "__main__":
    app.run(host="localhost",port=5000,debug=True)
