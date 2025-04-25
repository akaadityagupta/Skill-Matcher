// AllEmployees.jsx
import React, { useEffect, useState } from 'react';

const AllEmployees = () => {
  // State management for employees data and loading status
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees data from API on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees/all');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Helper function to determine skill level color based on difficulty
  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to convert skill level to display text
  const getSkillLevelText = (level) => {
    switch (level) {
      case 'easy': return 'Beginner';
      case 'moderate': return 'Intermediate';
      case 'advanced': return 'Expert';
      default: return level;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header section with title and employee count */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl">
            👥
          </div>
          <h2 className="text-2xl font-bold text-gray-800">All Employees</h2>
        </div>
        <div className="text-gray-500">
          Total: {employees.length} employees
        </div>
      </div>

      {/* Loading state display */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : employees.length === 0 ? (
        // Empty state display when no employees exist
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👤</div>
          <h3 className="text-xl font-semibold text-gray-700">No Employees Found</h3>
          <p className="text-gray-500">Add some employees to get started</p>
        </div>
      ) : (
        // Grid layout for displaying employee cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                {/* Employee header with name and icon */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                    {emp.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{emp.name}</h3>
                </div>

                {/* Skills section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {emp.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillLevelColor(skill.level)}`}
                      >
                        {skill.name} - {getSkillLevelText(skill.level)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Employee footer with metadata */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Skills: {emp.skills.length}</span>
                    <span>ID: {emp._id?.slice(-4) || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployees;