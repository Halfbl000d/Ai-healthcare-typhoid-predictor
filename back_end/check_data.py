import pandas as pd
import os

# ✅ FIXED - Use relative path instead of hardcoded path
CSV_PATH = os.path.join(os.path.dirname(__file__), "typhoid_data.csv")

# Load the dataset
df = pd.read_csv(CSV_PATH)

# Show the first 5 rows of the dataset
print("First 5 rows of the dataset:")
print(df.head())

# Show unique values in the label column (last column)
print("\nUnique values in label column:")
print(df.iloc[:, -1].unique())

# Convert label text to numeric: 1 for typhoid, 0 for healthy
df['label_numeric'] = df.iloc[:, -1].apply(lambda x: 1 if 'typhoid' in str(x).lower() else 0)

# Show first 5 rows of labels before and after conversion
print("\nLabels before and after numeric conversion:")
print(df.iloc[:, -1].head())
print(df['label_numeric'].head())

# Show counts of each class (0 and 1)
print("\nClass distribution:")
print(df['label_numeric'].value_counts())