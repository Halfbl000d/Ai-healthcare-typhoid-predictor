import os
import joblib
from config import MODELS_DIR, DATA_DICT_PATH

# Full list of clean typhoid symptoms
typhoid_symptoms = [
    'High Fever',
    'Headache',
    'Weakness',
    'Stomach Pain',
    'Diarrhea',
    'Vomiting',
    'Loss of Appetite',
    'Rose Spots on Chest',
    'Fatigue',
    'Nausea'
]

# Generate symptom index
symptom_index = {symptom: idx for idx, symptom in enumerate(typhoid_symptoms)}

# Define prediction classes: 0 = Healthy, 1 = Typhoid
clean_data_dict = {
    'symptom_index': symptom_index,
    'predictions_classes': {
        0: 'Healthy',
        1: 'Typhoid'
    }
}

# Ensure models directory exists
os.makedirs(MODELS_DIR, exist_ok=True)

# Save using joblib
joblib.dump(clean_data_dict, DATA_DICT_PATH)
print(f"✅ data_dict.pkl has been saved at: {DATA_DICT_PATH}")
print("📋 Structure:", clean_data_dict)
