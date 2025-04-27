import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-sky-900 mb-6 animate-fade-in">
              Skill Matcher
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              Welcome to the Skill Matcher! This app helps you manage employees and projects
              by tracking their skills and matching them with the right tasks. Add employees and projects,
              view all data, and find the perfect match for your project needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-sky-500 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
              <p className="text-gray-600">Efficiently manage and track employee skills and expertise.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-sky-500 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Project Matching</h3>
              <p className="text-gray-600">Find the perfect match between projects and employee skills.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-sky-500 text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Track and analyze skill development and project progress.</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
