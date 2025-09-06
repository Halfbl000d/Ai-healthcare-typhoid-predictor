from flask import Flask, jsonify, request
import joblib
import config

app = Flask(__name__)

# Load models once on startup
svm_model = joblib.load(config.SVM_MODEL_PATH)
nb_model = joblib.load(config.NB_MODEL_PATH)
rf_model = joblib.load(config.RF_MODEL_PATH)
data_dict = joblib.load(config.DATA_DICT_PATH)

try:
    specialization = joblib.load(config.DOCTOR_SPECIALIST_MODEL_PATH)
except Exception:
    specialization = {}

@app.route('/')
def home():
    return "Welcome to the AI Health Care API for Typhoid Prediction!"

@app.route('/test')
def test():
    return jsonify({
        "message": "API is working!",
        "available_endpoints": ["/", "/test", "/typhoidpredict"],
        "model_status": "All models loaded successfully"
    })

@app.route('/typhoidpredict', methods=['POST'])
def typhoid_predict():
    try:
        symptoms = request.get_json()
        if not symptoms:
            return jsonify({"error": "Invalid or missing JSON data"}), 400

        symptom_list = []
        for key in symptoms:
            if isinstance(symptoms[key], dict) and "value" in symptoms[key]:
                symptom_list.append(str(symptoms[key]["value"]).strip())
            elif isinstance(symptoms[key], str):
                symptom_list.append(str(symptoms[key]).strip())

        symptom_list = [s for s in symptom_list if s]

        input_data = [0] * len(data_dict["symptom_index"])
        matched_symptoms = []
        for symptom in symptom_list:
            index = data_dict["symptom_index"].get(symptom, -1)
            if index != -1:
                input_data[index] = 1
                matched_symptoms.append(symptom)

        if sum(input_data) == 0:
            return jsonify({
                "error": "No valid symptoms provided.",
                "available_symptoms": list(data_dict["symptom_index"].keys())[:10]
            }), 400

        import numpy as np
        input_array = np.array(input_data).reshape(1, -1)

        rf_pred = data_dict["predictions_classes"][int(rf_model.predict(input_array)[0])]
        nb_pred = data_dict["predictions_classes"][int(nb_model.predict(input_array)[0])]
        svm_pred = data_dict["predictions_classes"][int(svm_model.predict(input_array)[0])]

        # Here you can decide which model result to show based on accuracy or F1, for example:
        # For simplicity, let's assume SVM is best and return that
        final_prediction = svm_pred

        if final_prediction.lower() == "typhoid":
            description = "Typhoid fever is a bacterial infection that can spread throughout the body."
            precautions = [
                "Drink clean water",
                "Maintain hygiene",
                "Avoid street food",
                "Get vaccinated"
            ]
            doctor = specialization.get("Typhoid", "General Physician")
        else:
            description = "You seem to be healthy based on the symptoms provided."
            precautions = [
                "No action needed",
                "Maintain regular health checkups",
                "Stay hydrated",
                "Eat balanced meals"
            ]
            doctor = "No doctor needed"

        response = {
            "prediction": final_prediction,
            "description": description,
            "precautions": precautions,
            "specialize": doctor,
            "matched_symptoms": matched_symptoms,
            "model_predictions": {
                "random_forest": rf_pred,
                "naive_bayes": nb_pred,
                "svm": svm_pred
            }
        }
        return jsonify(response)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True)
