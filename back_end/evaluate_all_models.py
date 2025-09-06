import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from config import NB_MODEL_PATH, RF_MODEL_PATH, SVM_MODEL_PATH, CSV_PATH

# Load dataset
df = pd.read_csv(CSV_PATH)

# Separate features and target
X = df.iloc[:, :-1]
y = df.iloc[:, -1].apply(lambda x: 1 if 'typhoid' in x.lower() else 0)

# Split into train and test sets with same random state and test size as training
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

# Load trained models
nb_model = joblib.load(NB_MODEL_PATH)
rf_model = joblib.load(RF_MODEL_PATH)
svm_model = joblib.load(SVM_MODEL_PATH)

# Predict on test set
y_pred_nb = nb_model.predict(X_test)
y_pred_rf = rf_model.predict(X_test)
y_pred_svm = svm_model.predict(X_test)

# Print evaluation reports
print("Naive Bayes:\n", classification_report(y_test, y_pred_nb))
print("Random Forest:\n", classification_report(y_test, y_pred_rf))
print("SVM:\n", classification_report(y_test, y_pred_svm))
