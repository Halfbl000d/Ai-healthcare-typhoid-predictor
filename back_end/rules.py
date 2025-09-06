from fuzzywuzzy import process

# Threshold for fuzzy symptom matching inside rules if needed
FUZZY_THRESHOLD = 80

def apply_rules(symptoms):
    """
    Custom rules for Healthy prediction only.
    Returns:
        'Healthy' if any healthy rule matches,
        None if ML should predict (default Typhoid)
    """
    # ----------------- Healthy rules -----------------
    # 1. Single symptom → Healthy
    if len(symptoms) == 1:
        return "Healthy"

    # 2. Mild symptom combinations → Healthy
    if set(symptoms).issubset({"Headache", "Fatigue", "Nausea"}):
        return "Healthy"

    # 3. Two-symptom mild combos → Healthy
    two_symptom_healthy = [
        {"Headache", "Weakness"},
        {"Stomach Pain", "Diarrhea"},
        {"Nausea", "Stomach Pain"}
    ]
    for combo in two_symptom_healthy:
        if combo.issubset(symptoms):
            return "Healthy"

    # 4. Three-symptom mild combos → Healthy
    three_symptom_healthy = [
        {"Nausea", "Vomiting", "Stomach Pain"},
        {"Weakness", "Stomach Pain", "Diarrhea"}
    ]
    for combo in three_symptom_healthy:
        if combo.issubset(symptoms):
            return "Healthy"

    # If no healthy rule matched, fallback to ML (predicts Typhoid)
    return None
