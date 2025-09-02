from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# Load model
model = pickle.load(open("stress_model.pkl", "rb"))

# Load dataset columns
df = pd.read_csv("Stress_Dataset.csv")
target_col = "Which type of stress do you primarily experience?"
feature_cols = df.drop(target_col, axis=1).columns.tolist()

@app.route("/")
def index():
    return render_template("index.html", questions=feature_cols)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json.get("answers", {})

    # Collect answers in correct order
    answers = []
    for col in feature_cols:
        val = data.get(col, 0)
        answers.append(val)

    # Encode gender
    if "Gender" in feature_cols:
        idx = feature_cols.index("Gender")
        if isinstance(answers[idx], str):
            answers[idx] = 1 if answers[idx].lower() == "male" else 0

    # Encode age (keep numeric)
    if "Age" in feature_cols:
        idx = feature_cols.index("Age")
        answers[idx] = int(answers[idx])

    # DataFrame
    X = pd.DataFrame([answers], columns=feature_cols)

    # Prediction
    pred = model.predict(X)[0]

    tone = {
        "Distress (Negative Stress) - Stress that causes anxiety and impairs well-being.": ("#ff6b6b", "😥"),
        "Eustress (Positive Stress) - Stress that motivates and enhances performance.": ("#55efc4", "😄"),
        "No Stress - Currently experiencing minimal to no stress.": ("#74b9ff", "🙂")
    }
    color, emoji = tone.get(str(pred), ("#a29bfe", "😐"))

    return jsonify({"prediction": str(pred), "color": color, "emoji": emoji})

import os
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

