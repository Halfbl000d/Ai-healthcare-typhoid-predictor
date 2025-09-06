from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import joblib
import config
import numpy as np
from fuzzywuzzy import process
from rules import apply_rules
import datetime
import jwt
import traceback
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Flask App ---
app = Flask(__name__)

# Use environment variables with fallbacks
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', config.SECRET_KEY)
app.config['MONGO_URI'] = os.getenv('MONGODB_URI', config.MONGO_URI)

# CORS configuration - use environment variable for frontend URL
frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
CORS(app, resources={r"/*": {"origins": [frontend_url, "http://localhost:3000", "http://127.0.0.1:5173", "*"]}})

# --- MongoDB Setup ---
mongo = PyMongo(app)

# --- Fuzzy threshold ---
FUZZY_THRESHOLD = int(os.getenv('FUZZY_THRESHOLD', getattr(config, "FUZZY_THRESHOLD", 80)))

# --- Load ML models & data dict ---
nb_model = joblib.load(config.NB_MODEL_PATH)
rf_model = joblib.load(config.RF_MODEL_PATH)
svm_model = joblib.load(config.SVM_MODEL_PATH)
data_dict = joblib.load(config.DATA_DICT_PATH)

# --- Model accuracies ---
model_accuracies = {
    "Naive Bayes": 0.56,
    "Random Forest": 0.54,
    "SVM": 0.54
}

# -------------------------
# Helper: normalize field
# -------------------------
def normalize_field(value):
    if value:
        return value.strip().lower()
    return value

# -------------------------
# AUTH ROUTES
# -------------------------
@app.route("/auth/register", methods=["POST"])
def register():
    try:
        print("=== Registration endpoint called ===")
        data = request.json
        print("Incoming registration JSON:", data)

        if not data:
            return jsonify({"error": "No data provided"}), 400

        first_name = data.get("first_name", "").strip()
        last_name = data.get("last_name", "").strip()
        # FIX: Handle both 'phone' and 'phone_number' for backward compatibility
        phone = str(data.get("phone_number", data.get("phone", ""))).strip()
        email = data.get("email", "").strip().lower()
        age = data.get("age")
        gender = data.get("gender", "").strip()
        city = data.get("city", "").strip()
        state = data.get("state", "").strip()
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        if password != confirm_password:
            return jsonify({"error": "Passwords do not match"}), 400

        users = mongo.db.users

        if users.find_one({"email": email}):
            return jsonify({"error": "Email already registered"}), 400
        if phone and users.find_one({"phone_number": phone}):
            return jsonify({"error": "Phone already registered"}), 400

        hashed_pw = generate_password_hash(password)

        users.insert_one({
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": phone,
            "email": email,
            "age": age,
            "gender": gender,
            "city": city,
            "state": state,
            "password": hashed_pw,
            "created_at": datetime.datetime.utcnow()
        })

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

@app.route("/auth/login", methods=["POST"])
def login():
    try:
        data = request.json
        print("Incoming login JSON:", data)

        if not data:
            return jsonify({"error": "No data provided"}), 400

        email = normalize_field(data.get("email"))
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        users = mongo.db.users
        user = users.find_one({"email": email})

        if not user:
            return jsonify({"error": "User not found"}), 404

        if not check_password_hash(user["password"], password):
            return jsonify({"error": "Invalid password"}), 401

        # Use environment variable for JWT secret
        jwt_secret = os.getenv('SECRET_KEY', config.SECRET_KEY)
        token = jwt.encode({
            "user_id": str(user["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        },
        jwt_secret,
        algorithm="HS256"
        )

        return jsonify({"token": token, "username": user.get("first_name")}), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

# -------------------------
# Symptoms Endpoint
# -------------------------
@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    try:
        return jsonify({"symptoms": list(data_dict["symptom_index"].keys())})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# -------------------------
# Typhoid Prediction
# -------------------------
@app.route('/typhoidpredict', methods=['POST'])
def typhoid_predict():
    try:
        symptoms = request.get_json()
        if not symptoms:
            return jsonify({"error": "Invalid or missing JSON data"}), 400

        symptom_list = []
        for key in symptoms:
            if isinstance(symptoms[key], str):
                symptom_list.append(symptoms[key].strip())

        matched_symptoms = []
        input_data = [0] * len(data_dict["symptom_index"])
        for symptom in symptom_list:
            match, score = process.extractOne(symptom, data_dict["symptom_index"].keys())
            if score >= FUZZY_THRESHOLD:
                matched_symptoms.append(match)
                input_data[data_dict["symptom_index"][match]] = 1

        if sum(input_data) == 0:
            return jsonify({
                "error": "No valid symptoms provided",
                "available_symptoms": list(data_dict["symptom_index"].keys())[:10]
            }), 400

        input_array = np.array(input_data).reshape(1, -1)

        rule_prediction = apply_rules(matched_symptoms)

        if rule_prediction is None:
            predictions = {
                "Naive Bayes": data_dict["predictions_classes"][int(nb_model.predict(input_array)[0])],
                "Random Forest": data_dict["predictions_classes"][int(rf_model.predict(input_array)[0])],
                "SVM": data_dict["predictions_classes"][int(svm_model.predict(input_array)[0])]
            }
            best_model_name = max(model_accuracies, key=model_accuracies.get)
            final_prediction = predictions[best_model_name]
            method_used = "ML (best model)"
        else:
            final_prediction = rule_prediction
            best_model_name = "Custom Rules"
            predictions = {}
            method_used = "Rules"

        if final_prediction.lower() == "typhoid":
            description = "Typhoid fever is a bacterial infection that can spread throughout the body."
            precautions = ["Drink clean water", "Maintain hygiene", "Avoid street food", "Get vaccinated"]
            doctor = "General Physician"
        else:
            description = "You seem healthy based on the symptoms provided."
            precautions = ["No action needed", "Maintain regular health checkups", "Stay hydrated", "Eat balanced meals"]
            doctor = "No doctor needed"

        response = {
            "prediction": final_prediction,
            "best_model_used": best_model_name,
            "method_used": method_used,
            "description": description,
            "precautions": precautions,
            "specialize": doctor,
            "matched_symptoms": matched_symptoms,
            "model_predictions": predictions
        }

        return jsonify(response)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

# -------------------------
# Home / Test
# -------------------------
@app.route('/')
def home():
    return "Welcome to AI Health Care API!"

@app.route('/test')
def test():
    return jsonify({
        "message": "API is working!",
        "endpoints": ["/", "/test", "/typhoidpredict", "/auth/register", "/auth/login", "/symptoms"],
        "environment_check": {
            "SECRET_KEY": "✓ Loaded" if os.getenv('SECRET_KEY') else "✗ Using fallback",
            "MONGODB_URI": "✓ Loaded" if os.getenv('MONGODB_URI') else "✗ Using fallback",
            "FUZZY_THRESHOLD": os.getenv('FUZZY_THRESHOLD', 'Using fallback'),
            "FRONTEND_URL": os.getenv('FRONTEND_URL', 'Using fallback')
        }
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    print(f"Starting Flask app on port {port}, debug mode: {debug_mode}")
    print(f"Environment variables loaded: SECRET_KEY={'✓' if os.getenv('SECRET_KEY') else '✗'}")
    app.run(host='0.0.0.0', port=port, debug=debug_mode)