import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, classification_report
from imblearn.over_sampling import RandomOverSampler
import config

def main():
    df = pd.read_csv(config.CSV_PATH)
    df.columns = df.columns.str.strip()

    if 'label' not in df.columns:
        raise KeyError("'label' column not found in dataset")

    X = df.drop('label', axis=1)
    y = df['label'].map({'Typhoid': 1, 'Healthy': 0})

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )

    ros = RandomOverSampler(random_state=42)
    X_train_resampled, y_train_resampled = ros.fit_resample(X_train, y_train)

    rf_model = RandomForestClassifier(random_state=42)
    rf_model.fit(X_train_resampled, y_train_resampled)

    y_pred = rf_model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)

    print(f"✅ Random Forest Accuracy: {acc * 100:.2f}%")
    print(f"🎯 Random Forest F1 Score (Typhoid): {f1 * 100:.2f}%")
    print("\n📊 Classification Report:\n", classification_report(
        y_test, y_pred, target_names=['Healthy', 'Typhoid']))

    joblib.dump(rf_model, config.RF_MODEL_PATH)
    print(f"✅ Random Forest model saved at: {config.RF_MODEL_PATH}")

if __name__ == "__main__":
    main()
