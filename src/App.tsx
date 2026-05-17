import React from 'react';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agricultural Intelligence Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leverage advanced machine learning models to predict maize crop yields based on 
            environmental conditions and agricultural practices.
          </p>
        </div>
        
        <PredictionForm />
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Agricultural Intelligence Platform. Empowering farmers with data-driven insights.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;