from fuzzywuzzy import process
import joblib
import config
import numpy as np
from rules import apply_rules

nb_model = joblib.load(config.NB_MODEL_PATH)
rf_model = joblib.load(config.RF_MODEL_PATH)
svm_model = joblib.load(config.SVM_MODEL_PATH)
data_dict = joblib.load(config.DATA_DICT_PATH)
FUZZY_THRESHOLD = config.FUZZY_THRESHOLD

user_input = input("Enter symptoms separated by commas: ")
raw_symptoms = [s.strip() for s in user_input.split(",")]

matched_symptoms = []
input_data = [0] * len(data_dict["symptom_index"])
for symptom in raw_symptoms:
    match, score = process.extractOne(symptom, data_dict["symptom_index"].keys())
    if score >= FUZZY_THRESHOLD:
        matched_symptoms.append(match)
        input_data[data_dict["symptom_index"][match]] = 1

input_array = np.array(input_data).reshape(1, -1)
rule_prediction = apply_rules(matched_symptoms)

if rule_prediction is None:
    predictions = {
        "Naive Bayes": data_dict["predictions_classes"][int(nb_model.predict(input_array)[0])],
        "Random Forest": data_dict["predictions_classes"][int(rf_model.predict(input_array)[0])],
        "SVM": data_dict["predictions_classes"][int(svm_model.predict(input_array)[0])]
    }
    best_model_name = max({"Naive Bayes":0.56,"Random Forest":0.54,"SVM":0.54}, key=lambda k: {"Naive Bayes":0.56,"Random Forest":0.54,"SVM":0.54}[k])
    final_prediction = predictions[best_model_name]
    method_used = "ML (best model)"
else:
    final_prediction = rule_prediction
    best_model_name = "Custom Rules"
    predictions = {}
    method_used = "Rules"

print("Matched Symptoms:", matched_symptoms)
print("All Model Predictions:", predictions if predictions else "Rules applied")
print("Best Model Used:", best_model_name)
print("Final Prediction:", final_prediction)
print("Prediction Method Used:", method_used)
