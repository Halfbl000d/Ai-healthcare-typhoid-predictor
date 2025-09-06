import joblib
from config import NB_MODEL_PATH  # Uses dynamic absolute path from config.py

# Load the model using joblib
try:
    model = joblib.load(NB_MODEL_PATH)
    print("✅ Model loaded successfully.")
    print("\nModel type:", type(model))

    try:
        print("\nModel parameters:\n", model.get_params())
    except AttributeError:
        print("⚠️ Model does not have get_params() method.")

except FileNotFoundError:
    print(f"❌ Model file not found at: {NB_MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
