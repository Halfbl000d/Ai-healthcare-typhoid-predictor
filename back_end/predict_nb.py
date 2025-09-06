import joblib
import pandas as pd
from config import NB_MODEL_PATH  # Absolute model path

# List of symptoms in expected order
all_symptoms = [
    'High Fever', 'Headache', 'Weakness', 'Stomach Pain', 'Diarrhea',
    'Vomiting', 'Loss of Appetite', 'Rose Spots on Chest', 'Fatigue', 'Nausea'
]

# Load Naive Bayes model using absolute path
try:
    model = joblib.load(NB_MODEL_PATH)
    print(f"✅ Model loaded from {NB_MODEL_PATH}")
except Exception as e:
    print(f"❌ Failed to load model: {e}")
    exit()

# Display symptom options
print("Select the symptoms you're experiencing:\n")
for i, symptom in enumerate(all_symptoms):
    print(f"{i}: {symptom}")

# Collect user input
try:
    user_input = input("\nEnter symptom numbers separated by space (e.g., 0 1 4): ").strip().split()
    selected_indices = [int(i) for i in user_input if i.isdigit() and int(i) < len(all_symptoms)]
except Exception:
    print("\n❌ Invalid input. Please enter numbers only.")
    exit()

# Create binary feature vector
input_features = [1 if i in selected_indices else 0 for i in range(len(all_symptoms))]
input_df = pd.DataFrame([input_features], columns=all_symptoms)

# Make prediction
prediction = model.predict(input_df)[0]

# Display result
print("\n🔍 Prediction Result:")
if prediction == 1:
    print("✅ You have typhoid.")
else:
    print("✅ You do not have typhoid.")
