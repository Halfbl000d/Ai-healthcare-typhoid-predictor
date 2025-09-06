import React, { useState } from 'react';

function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      category: "About Typhoid",
      questions: [
        {
          question: "What is typhoid fever?",
          answer: "Typhoid fever is a bacterial infection caused by Salmonella Typhi. It spreads through contaminated food and water, and is more common in areas with poor sanitation. The bacteria can survive in the environment for extended periods and is highly contagious."
        },
        {
          question: "What are the common symptoms of typhoid?",
          answer: "Common symptoms include: sustained high fever (often reaching 104°F), severe headache, weakness and fatigue, stomach pain, loss of appetite, constipation or diarrhea, rose-colored spots on the chest and abdomen, and enlarged spleen. Symptoms typically develop 1-3 weeks after infection."
        },
        {
          question: "How is typhoid transmitted?",
          answer: "Typhoid spreads through the fecal-oral route, primarily through contaminated water and food. It can also spread through close contact with infected individuals, poor hygiene practices, and in areas with inadequate sewage systems."
        }
      ]
    },
    {
      category: "AI Prediction System",
      questions: [
        {
          question: "How does the AI prediction system work?",
          answer: "Our AI system uses machine learning algorithms trained on medical data to analyze symptom patterns. It compares your reported symptoms against known typhoid symptom profiles and provides a risk assessment based on statistical correlations and medical knowledge."
        },
        {
          question: "How accurate is the AI prediction?",
          answer: "While our AI system is trained on extensive medical data, it should be considered as a screening tool only. The accuracy depends on the quality and completeness of symptoms reported. It's designed to flag potential risks, not provide definitive diagnoses."
        },
        {
          question: "What information does the AI need from me?",
          answer: "The AI will ask about various symptoms including fever patterns, digestive issues, headaches, fatigue levels, skin changes, and other relevant health indicators. The more accurate and complete your responses, the better the assessment."
        },
        {
          question: "Can the AI replace a doctor's diagnosis?",
          answer: "Absolutely not. Our AI system is a preliminary screening tool designed to help you understand potential risks and decide when to seek medical attention. Only qualified healthcare professionals can provide official diagnoses and treatment plans."
        }
      ]
    },
    {
      category: "Using the System",
      questions: [
        {
          question: "Do I need to create an account to use the predictor?",
          answer: "No, our basic prediction service doesn't require account creation. However, creating an account allows you to save your assessment history and receive personalized health tips and reminders."
        },
        {
          question: "Is my health information secure?",
          answer: "Yes, we take data privacy seriously. All health information is encrypted and stored securely. We don't share personal health data with third parties and comply with relevant healthcare privacy regulations."
        },
        {
          question: "How long does the assessment take?",
          answer: "The typical assessment takes 3-5 minutes to complete. The AI processes your responses instantly and provides immediate results with recommendations."
        },
        {
          question: "Can I use this system for my family members?",
          answer: "Yes, you can use the system to assess symptoms for family members, especially children or elderly relatives who might need assistance. However, ensure you have accurate information about their symptoms."
        }
      ]
    },
    {
      category: "Medical Advice",
      questions: [
        {
          question: "When should I see a doctor immediately?",
          answer: "Seek immediate medical attention if you have: sustained fever above 103°F (39.4°C), severe abdominal pain, persistent vomiting, signs of dehydration, confusion or altered mental state, or if the AI assessment indicates high risk."
        },
        {
          question: "What should I do if the AI suggests I might have typhoid?",
          answer: "If our system indicates potential typhoid risk: 1) Don't panic, 2) Contact a healthcare provider immediately, 3) Avoid preparing food for others, 4) Maintain strict hygiene, 5) Stay hydrated, and 6) Follow medical advice for testing and treatment."
        },
        {
          question: "Can typhoid be treated?",
          answer: "Yes, typhoid is treatable with appropriate antibiotics when diagnosed early. Treatment typically involves antibiotics, rest, hydration, and symptomatic care. Early treatment prevents complications and reduces transmission risk."
        },
        {
          question: "How can I prevent typhoid?",
          answer: "Prevention includes: vaccination (especially when traveling), drinking safe water, eating properly cooked food, practicing good hygiene, avoiding street food in high-risk areas, and washing hands frequently with soap."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about typhoid fever and our AI prediction system
          </p>
        </div>

        {/* FAQ Categories */}
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center bg-white py-4 rounded-lg shadow-sm">
              {category.category}
            </h2>
            
            <div className="space-y-4">
              {category.questions.map((faq, faqIndex) => {
                const globalIndex = categoryIndex * 100 + faqIndex; // Unique index
                return (
                  <div key={globalIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => toggleFAQ(globalIndex)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {faq.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                            openFAQ === globalIndex ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {openFAQ === globalIndex && (
                      <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Emergency Contact Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-xl font-bold text-red-800">Medical Emergency</h3>
          </div>
          <p className="text-red-800 mb-4">
            If you're experiencing severe symptoms or a medical emergency, don't rely on this AI system. 
            Contact your local emergency services or visit the nearest emergency room immediately.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-red-700">Emergency:</strong> Call your local emergency number
            </div>
            <div>
              <strong className="text-red-700">Poison Control:</strong> Contact your local poison control center
            </div>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-12 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Feel free to contact our support team.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;