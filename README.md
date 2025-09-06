# AI Healthcare Typhoid Predictor 🏥

An intelligent healthcare system that predicts typhoid fever using machine learning algorithms. Built with Flask (Python) backend and React frontend, featuring multiple ML models for accurate disease prediction.

## 🌟 Features

- **Disease Prediction**: AI-powered typhoid prediction using symptoms
- **Multiple ML Models**: Naive Bayes, Random Forest, and SVM algorithms
- **User Authentication**: Secure login/registration system
- **Interactive UI**: Modern React-based user interface
- **Symptom Analysis**: Fuzzy matching for symptom input
- **Docker Support**: One-command deployment
- **Cross-Platform**: Works on Windows, Mac, and Linux

## 🖥️ Demo

Visit the live demo: [Your-Live-Demo-Link] *(if deployed)*

## 📁 Project Structure

```
AI-healthcare-typhoid-predictor/
├── back_end/                 # Flask API & ML Models
│   ├── app.py               # Main Flask application
│   ├── predict_*.py         # ML model predictions
│   ├── train_*.py           # Model training scripts
│   ├── typhoid_data.csv     # Training dataset
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Backend Docker config
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Application pages
│   │   └── context/         # Authentication context
│   ├── package.json         # Node.js dependencies
│   └── Dockerfile           # Frontend Docker config
├── docker-compose.yml       # Complete app orchestration
└── README.md               # This file
```

## 🚀 Quick Start (Recommended)

### Prerequisites
- [Docker](https://www.docker.com/get-started) installed on your system
- [Git](https://git-scm.com/) for cloning the repository

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Halfbl000d/Ai-healthcare-typhoid-predictor.git
   cd Ai-healthcare-typhoid-predictor
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

That's it! 🎉 The application will automatically set up:
- MongoDB database
- Flask backend with ML models
- React frontend interface

## 🛠️ Manual Setup (Alternative)

If you prefer to run without Docker:

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd back_end
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install & Start MongoDB**
   - Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)
   - Start MongoDB service

5. **Create environment file**
   ```bash
   # Create .env file in back_end directory
   MONGODB_URI=mongodb://localhost:27017/ai_healthcare
   SECRET_KEY=your_super_secret_key_here
   FUZZY_THRESHOLD=80
   FLASK_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

6. **Run the backend**
   ```bash
   python app.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in frontend directory
   VITE_API_URL=http://127.0.0.1:5000
   ```

4. **Start the frontend**
   ```bash
   npm run dev
   ```

## 🧠 Machine Learning Models

The system uses three different ML algorithms:

- **Naive Bayes**: Probabilistic classifier based on Bayes' theorem
- **Random Forest**: Ensemble method using multiple decision trees
- **Support Vector Machine**: Finds optimal decision boundary

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/test` | API health check |
| POST | `/typhoidpredict` | Predict typhoid from symptoms |
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | User login |
| GET | `/symptoms` | Get available symptoms list |

## 📊 Usage

1. **Register/Login**: Create an account or login
2. **Enter Symptoms**: Input patient symptoms
3. **Get Prediction**: AI analyzes and provides prediction
4. **View Results**: See prediction confidence and recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Docker not starting:**
```bash
# Make sure Docker is running
docker --version
docker-compose --version
```

**Port already in use:**
```bash
# Kill processes using ports 3000, 5000, or 27017
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**MongoDB connection error:**
- Ensure MongoDB is running (for manual setup)
- Check the MONGODB_URI in your .env file

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/ai_healthcare
SECRET_KEY=your-secret-key-here
FUZZY_THRESHOLD=80
FLASK_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://127.0.0.1:5000
```

## 🔧 Technologies Used

**Backend:**
- Python 3.x
- Flask (Web Framework)
- PyMongo (MongoDB)
- Scikit-learn (Machine Learning)
- Pandas (Data Processing)
- FuzzyWuzzy (String Matching)

**Frontend:**
- React 18
- Vite (Build Tool)
- Tailwind CSS
- React Router
- Axios (HTTP Client)

**Database:**
- MongoDB

**Deployment:**
- Docker & Docker Compose

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Halfbl000d**
- GitHub: [@Halfbl000d](https://github.com/Halfbl000d)
- Project Link: [https://github.com/Halfbl000d/Ai-healthcare-typhoid-predictor](https://github.com/Halfbl000d/Ai-healthcare-typhoid-predictor)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📸 Screenshots

*Add screenshots of your application here*

---

**Made with ❤️ for better healthcare through AI**