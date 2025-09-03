# Stress Analyzer ML Web App

A **Machine Learning-based Stress Analyzer** that predicts your stress type based on responses to 20 questions. This project combines a **Random Forest Classifier** developed in a Jupyter Notebook with a **Flask-based web application** for an interactive user experience.

Access: https://stress-analyser.onrender.com
---

## 🚀 Features

- **Predict Stress Type:** Answer 20 questions to get your personalized stress analysis.
- **High Accuracy:** Achieved **96.44% accuracy** using a Random Forest Classifier.
- **Interactive Web App:** Built with **Flask, HTML, CSS, and JavaScript**.
- **Reproducible Results:** Download the model and code to run locally and reproduce results.
- **Descriptive Feedback:** Provides detailed information about your stress type and suggestions.

---

## 🧠 Models Tested

- Categorical Model  
- Naive Bayes Classifier  
- Logistic Regression  
- Decision Tree Classifier  
- **Random Forest Classifier** (best performing)
- <img width="850" height="572" alt="model_performance" src="https://github.com/user-attachments/assets/7b3730c8-c77a-43d8-a3e2-34bad2c441eb" />


---

## ⚙️ How It Works

1. User answers 20 questions on the web interface.  
2. The Flask backend receives the responses.  
3. The trained Random Forest model predicts the stress type.  
4. Results are displayed with a detailed description of the stress type.
<img width="867" height="2450" alt="preprocessing_flow_HQ" src="https://github.com/user-attachments/assets/3335260e-e5ef-4fb4-b1b9-61aa65401bf2" />

---

📊 Dataset

Dataset used: https://www.kaggle.com/datasets/mdsultanulislamovi/student-stress-monitoring-datasets

📈 Results

Accuracy: 96.44%

Best Model: Random Forest Classifier

Reproducible: Yes, all results can be reproduced locally

🛠 Technologies Used

Backend: Flask, Python

Frontend: HTML, CSS, JavaScript

ML & Data: scikit-learn, pandas, numpy, Jupyter Notebook



