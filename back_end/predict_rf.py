import joblib
import config
import pandas as pd

# Load Random Forest model once
rf_model = joblib.load(config.RF_MODEL_PATH)

def predict(symptoms):
    # symptoms: dict with all features expected by model (e.g. 'High Fever', 'Headache', etc.)

    # Convert dict to DataFrame row for RF model
    X = pd.DataFrame([symptoms])
    
    # RF prediction: 1=Typhoid, 0=Healthy
    pred = rf_model.predict(X)[0]
    return 'Typhoid' if pred == 1 else 'Healthy'

# Example usage
if __name__ == "__main__":
    example_symptoms = {
        'High Fever': True,
        'Headache': False,
        'Weakness': True,
        'Stomach Pain': False,
        'Diarrhea': False,
        'Vomiting': False,
        'Loss of Appetite': False,
        'Rose Spots on Chest': False,
        'Fatigue': False,
        'Nausea': False,
    }
    print("Prediction:", predict(example_symptoms))
