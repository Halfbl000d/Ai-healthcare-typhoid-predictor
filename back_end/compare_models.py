import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, classification_report
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
import os

# Import paths from config.py
from config import CSV_PATH, MODELS_DIR, NB_MODEL_PATH, RF_MODEL_PATH, SVM_MODEL_PATH

# Load dataset using absolute path
df = pd.read_csv(CSV_PATH)

# Assuming last column is the label and contains 'typhoid' or 'healthy' strings
X = df.iloc[:, :-1]
y = df.iloc[:, -1].apply(lambda x: 1 if 'typhoid' in str(x).lower() else 0)

# Split dataset into train and test (70/30)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize models
models = {
    "Naive Bayes": GaussianNB(),
    "Random Forest": RandomForestClassifier(random_state=42),
    "SVM": SVC(probability=True)  # probability=True if you want probability later
}

# Create models directory if not exists
os.makedirs(MODELS_DIR, exist_ok=True)

# Evaluate each model
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    acc = accuracy_score(y_test, y_pred) * 100
    f1 = f1_score(y_test, y_pred, pos_label=1) * 100  # F1 score for 'typhoid' class
    
    print(f"\n{name} Accuracy: {acc:.2f}%")
    print(f"{name} F1 Score (typhoid): {f1:.2f}%")
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['healthy', 'typhoid']))
    
    # Save model using joblib with absolute path from config.py
    if name == "Naive Bayes":
        joblib.dump(model, NB_MODEL_PATH)
        print(f"{name} model saved to {NB_MODEL_PATH}")
    elif name == "Random Forest":
        joblib.dump(model, RF_MODEL_PATH)
        print(f"{name} model saved to {RF_MODEL_PATH}")
    elif name == "SVM":
        joblib.dump(model, SVM_MODEL_PATH)
        print(f"{name} model saved to {SVM_MODEL_PATH}")
