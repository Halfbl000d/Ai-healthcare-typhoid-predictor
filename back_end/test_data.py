import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
print(f"Running test_data.py from directory: {BASE_DIR}")

pkl_file_path = os.path.join(BASE_DIR, 'models', 'data_dict.pkl')
print(f"Looking for data_dict.pkl at: {pkl_file_path}")

if not os.path.exists(pkl_file_path):
    print(f"❌ {pkl_file_path} file not found!")
else:
    data_dict = joblib.load(pkl_file_path)
    print("✅ test_data.py ran successfully.")
    print("✅ Loaded symptom_index from data_dict.pkl:\n")

    for idx, (symptom, index) in enumerate(data_dict['symptom_index'].items()):
        print(f"{index}: {symptom}")

    print("\n✅ Prediction classes:")
    for condition, code in data_dict['predictions_classes'].items():
        print(f"{code}: {condition}")
