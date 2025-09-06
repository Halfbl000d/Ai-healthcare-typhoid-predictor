import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About AI Typhoid Predictor
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Empowering early detection and prevention of typhoid fever through advanced artificial intelligence
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our AI Typhoid Prediction System is designed to bridge the gap between symptom awareness and 
            professional medical care. By leveraging cutting-edge machine learning algorithms, we provide 
            users with intelligent symptom analysis that can help identify potential typhoid fever risks early.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe in democratizing healthcare through technology, making preliminary health assessments 
            accessible to everyone, especially in areas where immediate medical consultation might not be readily available.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="bg-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Symptoms</h3>
              <p className="text-gray-600">
                Enter your symptoms through our user-friendly interface
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes patterns and correlates symptoms with typhoid indicators
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-gray-600">
                Receive risk assessment and personalized recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Intelligent Symptom Analysis</h3>
                <p className="text-gray-600">Advanced AI algorithms trained on medical data for accurate predictions</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                <p className="text-gray-600">Get immediate risk assessment and recommendations</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
                <p className="text-gray-600">Access to comprehensive information about typhoid prevention</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Medical Disclaimer</h3>
                <p className="text-gray-600">Clear guidance on when to seek professional medical help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-xl font-bold text-yellow-800">Important Medical Disclaimer</h3>
          </div>
          <p className="text-yellow-800 leading-relaxed">
            This Typhoid Prediction  system is designed for educational and preliminary assessment purposes only. 
            It does not replace professional medical diagnosis or treatment. Always consult with 
            qualified healthcare professionals for proper medical evaluation and treatment of any health concerns.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;