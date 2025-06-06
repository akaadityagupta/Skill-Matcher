// AllEmployees.jsx
import React, { useEffect, useState } from 'react';
import SkillUpdateForm from './SkillUpdateForm';

const AllEmployees = () => {
  // State management for employees data and loading status
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);

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

  // Delete employee function
  const handleDeleteEmployee = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove employee from state after successful deletion
        setEmployees(employees.filter(emp => emp._id !== employeeId));
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

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

  // Update employee skills
  const handleUpdateSkills = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp._id === updatedEmployee._id ? updatedEmployee : emp
    ));
    setShowSkillModal(false);
    setSelectedEmployee(null);
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-xl">
                      {emp.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{emp.name}</h3>
                  </div>
                  <button
                    onClick={() => handleDeleteEmployee(emp._id)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    title="Delete Employee"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Skills section with update button */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                    <button
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setShowSkillModal(true);
                      }}
                      className="px-3 py-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 rounded-md hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200"
                      title="Update Skills"
                    >
                      <span className="flex items-center space-x-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Update Skills</span>
                      </span>
                    </button>
                  </div>
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

      {/* Skill Update Modal */}
      {showSkillModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Update Skills for {selectedEmployee.name}
                </h2>
                <button
                  onClick={() => {
                    setShowSkillModal(false);
                    setSelectedEmployee(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SkillUpdateForm
                type="employees"
                id={selectedEmployee._id}
                currentSkills={selectedEmployee.skills}
                onUpdate={handleUpdateSkills}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;