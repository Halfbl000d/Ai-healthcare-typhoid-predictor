// src/components/TyphoidAssessment.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const TyphoidAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    phone_number: '', // Fixed: Changed from 'phone' to 'phone_number'
  });
  
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fixed: Use environment variable for API URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  // Fetch available symptoms from backend
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/symptoms`);
        setAvailableSymptoms(response.data.symptoms || []);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
        toast.error('Failed to load symptoms. Please try again.');
        
        // Fallback symptoms if backend is unavailable
        const fallbackSymptoms = [
          'fever', 'headache', 'nausea', 'vomiting', 'diarrhea', 
          'abdominal_pain', 'weakness', 'loss_of_appetite', 'rash', 
          'constipation', 'muscle_aches', 'chills'
        ];
        setAvailableSymptoms(fallbackSymptoms);
      }
    };

    fetchSymptoms();
  }, [API_BASE_URL]);

  const handlePatientInfoChange = (field, value) => {
    setPatientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }

    setLoading(true);
    
    try {
      // Fixed: Prepare symptoms data in the format backend expects
      const symptomsData = {};
      
      // Add patient info
      symptomsData.name = patientInfo.name;
      symptomsData.age = parseInt(patientInfo.age);
      symptomsData.gender = patientInfo.gender;
      if (patientInfo.phone_number) {
        symptomsData.phone_number = patientInfo.phone_number;
      }

      // Fixed: Format symptoms as symptom1, symptom2, etc. (no underscore)
      selectedSymptoms.forEach((symptom, index) => {
        symptomsData[`symptom${index + 1}`] = symptom;
      });

      console.log('Sending data to backend:', symptomsData); // Debug log

      const response = await axios.post(`${API_BASE_URL}/typhoidpredict`, symptomsData);
      
      setResults({
        ...response.data,
        patientInfo: patientInfo,
        selectedSymptoms: selectedSymptoms,
        assessmentDate: new Date().toISOString()
      });
      
      setCurrentStep(3);
      toast.success('Assessment completed successfully!');
      
    } catch (error) {
      console.error('Prediction error:', error);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Failed to get prediction. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(1);
    // Fixed: Reset phone_number instead of phone
    setPatientInfo({ name: '', age: '', gender: '', phone_number: '' });
    setSelectedSymptoms([]);
    setResults(null);
  };

  const getDoctorRecommendations = (specialization) => {
    const doctorDatabase = {
      "General Physician": [
        {
          name: "Dr. Sarah Johnson",
          specialty: "General Medicine",
          experience: "15+ years",
          phone: "(555) 123-4567",
          availability: "Mon-Fri, 9 AM - 5 PM"
        },
        {
          name: "Dr. Michael Chen",
          specialty: "Internal Medicine",
          experience: "12+ years",
          phone: "(555) 987-6543",
          availability: "Tue-Sat, 10 AM - 6 PM"
        }
      ],
      "Infectious Disease Specialist": [
        {
          name: "Dr. Emily Rodriguez",
          specialty: "Infectious Diseases",
          experience: "18+ years",
          phone: "(555) 246-8135",
          availability: "Mon-Thu, 8 AM - 4 PM"
        },
        {
          name: "Dr. James Wilson",
          specialty: "Tropical Medicine",
          experience: "20+ years",
          phone: "(555) 369-2580",
          availability: "Tue-Fri, 9 AM - 5 PM"
        }
      ],
      "No doctor needed": [
        {
          name: "Health Monitoring",
          specialty: "Preventive Care",
          experience: "Continue monitoring symptoms",
          phone: "Emergency: 911",
          availability: "24/7 Emergency Services"
        }
      ]
    };

    return doctorDatabase[specialization] || doctorDatabase["General Physician"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Typhoid Risk Assessment
          </h1>
          <p className="text-gray-600 mb-6">
            Professional health screening powered by machine learning
          </p>
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                3
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Patient Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Patient Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={patientInfo.name}
                  onChange={(e) => handlePatientInfoChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) => handlePatientInfoChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={patientInfo.gender}
                  onChange={(e) => handlePatientInfoChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                {/* Fixed: Updated label and field name */}
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={patientInfo.phone_number}
                  onChange={(e) => handlePatientInfoChange('phone_number', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!patientInfo.name || !patientInfo.age || !patientInfo.gender}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                Next: Symptoms Assessment
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Symptoms Assessment */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Symptoms Assessment</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Please select all symptoms you are currently experiencing:
            </p>

            {availableSymptoms.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {availableSymptoms.map((symptom, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedSymptoms.includes(symptom)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleSymptomToggle(symptom)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        selectedSymptoms.includes(symptom)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedSymptoms.includes(symptom) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-700 capitalize font-medium">
                        {symptom.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading symptoms...</p>
              </div>
            )}

            {selectedSymptoms.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Selected Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {symptom.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || selectedSymptoms.length === 0}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Get AI Assessment
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && results && (
          <div className="space-y-6">
            {/* Patient Summary Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Medical Assessment Report</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Patient Information</h3>
                  <p><span className="font-medium">Name:</span> {results.patientInfo.name}</p>
                  <p><span className="font-medium">Age:</span> {results.patientInfo.age}</p>
                  <p><span className="font-medium">Gender:</span> {results.patientInfo.gender}</p>
                  {/* Fixed: Updated to use phone_number */}
                  {results.patientInfo.phone_number && <p><span className="font-medium">Phone:</span> {results.patientInfo.phone_number}</p>}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Assessment Details</h3>
                  <p><span className="font-medium">Date:</span> {new Date(results.assessmentDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {new Date(results.assessmentDate).toLocaleTimeString()}</p>
                  {results.method_used && <p><span className="font-medium">Method:</span> {results.method_used}</p>}
                  {results.best_model_used && <p><span className="font-medium">Model Used:</span> {results.best_model_used}</p>}
                </div>
              </div>
            </div>

            {/* Diagnosis Result Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-4">Diagnosis Result</h3>
                <div className={`inline-block px-8 py-4 rounded-full text-white text-xl font-bold ${
                  results.prediction && results.prediction.toLowerCase() === 'typhoid' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {results.prediction ? results.prediction.toUpperCase() : 'NO TYPHOID DETECTED'}
                </div>
                {results.description && (
                  <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto">
                    {results.description}
                  </p>
                )}
              </div>

              {results.matched_symptoms && results.matched_symptoms.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Analyzed Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.matched_symptoms.map((symptom, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {symptom.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {results.model_predictions && Object.keys(results.model_predictions).length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">AI Model Predictions:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(results.model_predictions).map(([model, prediction]) => (
                      <div key={model} className="text-center">
                        <p className="font-medium text-gray-600">{model}</p>
                        <p className={`font-semibold ${prediction.toLowerCase() === 'typhoid' ? 'text-red-600' : 'text-green-600'}`}>
                          {prediction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommended Doctors */}
            {results.specialize && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Recommended Medical Consultation
                </h3>
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {results.specialize}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {getDoctorRecommendations(results.specialize).map((doctor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500 mt-1">{doctor.experience}</p>
                      <p className="text-sm text-blue-600 mt-2">📞 {doctor.phone}</p>
                      <p className="text-sm text-gray-500">{doctor.availability}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Precautions */}
            {results.precautions && results.precautions.length > 0 && (
              <div className={`border rounded-lg p-6 ${
                results.prediction && results.prediction.toLowerCase() === 'typhoid' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
              }`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Recommended Precautions
                </h3>
                <ul className="space-y-2">
                  {results.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-600 font-bold">•</span>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Emergency Warning for Typhoid */}
            {results.prediction && results.prediction.toLowerCase() === 'typhoid' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-xl font-bold text-red-800">⚠️ IMPORTANT MEDICAL NOTICE</h3>
                </div>
                <p className="text-red-800 font-medium">
                  Based on your symptoms, our AI system indicates a potential typhoid infection. 
                  Please consult with a healthcare professional immediately for proper diagnosis and treatment.
                  This is a preliminary assessment and should not replace professional medical advice.
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.print()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
              <button
                onClick={resetAssessment}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TyphoidAssessment;