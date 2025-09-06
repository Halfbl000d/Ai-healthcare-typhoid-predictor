// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/NavBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQs.jsx";
// New combined component for symptoms and prediction
import TyphoidAssessment from "./components/TyphoidAssessment.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Protected Routes - Only accessible after login */}
        <Route 
          path="/assessment" 
          element={
            <ProtectedRoute>
              <TyphoidAssessment />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect old routes to the new assessment */}
        <Route 
          path="/symptoms" 
          element={
            <ProtectedRoute>
              <TyphoidAssessment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/predict" 
          element={
            <ProtectedRoute>
              <TyphoidAssessment />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;