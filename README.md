# AI Healthcare Typhoid Predictor 🏥

A full-stack web application that predicts typhoid fever based on patient symptoms using machine learning. Built with a Flask backend, React frontend, and three ML models for comparison.

---

## What It Does

Users enter their symptoms into the app. The system runs the input through three trained machine learning models and returns a prediction with confidence. It also includes a doctor recommendation system and a basic AI chatbot for health queries.

---

## Features

- Symptom-based typhoid disease prediction
- Three ML models: Random Forest, SVM, and Naive Bayes
- Fuzzy symptom matching — handles typos and partial input
- User authentication (register/login)
- Doctor recommendation system
- AI-powered chatbot for basic health queries
- MongoDB for storing patient records
- Docker support — one command to run everything

---

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Axios  
**Backend:** Python, Flask, PyMongo, FuzzyWuzzy  
**Machine Learning:** Scikit-learn (Random Forest, SVM, Naive Bayes)  
**Database:** MongoDB  
**Deployment:** Docker & Docker Compose  

---

## Machine Learning Models

Three classifiers were trained and compared on a cleaned, balanced symptom dataset (~3,000 records, approximately 45/55 class split):

| Model | Performance |
|-------|------------|
| Random Forest | ~90% accuracy (best performer) |
| SVM | ~85-90% accuracy |
| Naive Bayes | ~70% accuracy (lowest, expected for this data type) |

Models were evaluated on a 30% held-out test set using stratified splitting. Random Forest performed best overall. Naive Bayes showed lower performance, which is typical for symptom-based classification tasks.

---

## Dataset

Training data was sourced from a publicly available Kaggle dataset on typhoid cases. The dataset was cleaned manually before use — personal identifiers (names, IDs, location details) were removed and only symptom and diagnosis fields were retained. Approximately 3,000 records were used after cleaning, with class distribution balanced to around 45/55 (positive/negative).

---

## Quick Start (Docker)

**Prerequisites:** Docker and Git installed

```bash
# Clone the repo
git clone https://github.com/Halfbl000d/Ai-healthcare-typhoid-predictor.git
cd Ai-healthcare-typhoid-predictor

# Start everything
docker-compose up --build
```

Then open:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Manual Setup

### Backend

```bash
cd back_end
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `back_end/`:
```
MONGODB_URI=mongodb://localhost:27017/ai_healthcare
SECRET_KEY=your-secret-key-here
FUZZY_THRESHOLD=80
FLASK_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

```bash
python app.py
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```
VITE_API_URL=http://127.0.0.1:5000
```

```bash
npm run dev
```

Open http://localhost:3000

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /test | Health check |
| POST | /typhoidpredict | Predict typhoid from symptoms |
| POST | /auth/register | Register new user |
| POST | /auth/login | Login |
| GET | /symptoms | Get available symptoms list |

---

## Project Structure

```
Ai-healthcare-typhoid-predictor/
├── back_end/
│   ├── app.py
│   ├── predict_nb.py
│   ├── predict_rf.py
│   ├── predict_svm.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Author

**Karun Subedi**  
GitHub: [@Halfbl000d](https://github.com/Halfbl000d)  
Email: karunsubedi41@gmail.com

---

## License

MIT License
