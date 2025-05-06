import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FindEmployee = () => {
  // State management for projects, selected project, matched employees, loading state, and errors
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [matchedEmployees, setMatchedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  // Fetch all projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/projects/all');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /**
   * Handle the matching process when a project is selected
   * Makes an API call to find employees matching the project's required skills
   */
  const handleMatch = async () => {
    if (!selectedProject) return;
  
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/match/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: selectedProject }),
      });
      const data = await response.json();
  
      if (data && data.topEmployees && Array.isArray(data.topEmployees)) {
        const matchedEmployees = data.topEmployees.map(item => item.employee);
        setMatchedEmployees(matchedEmployees);
        setError('');
      } else {
        setError("No employees found matching the selected project.");
        setMatchedEmployees([]);
      }
    } catch (error) {
      setError('Failed to find matches');
      console.error('Error fetching matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedEmployees.length === 0) {
      setError('Please enter a group name and select at least one employee');
      return;
    }

    try {
      setIsCreatingGroup(true);
      const response = await axios.post('http://localhost:5000/api/groups', {
        name: groupName,
        members: selectedEmployees
      });

      // Reset form
      setGroupName('');
      setSelectedEmployees([]);
      setError('');
      
      // Show success message
      alert('Group created successfully!');
    } catch (err) {
      setError('Failed to create group');
      console.error(err);
    } finally {
      setIsCreatingGroup(false);
    }
  };

  /**
   * Get the appropriate background and text color for skill level badges
   * Tailwind CSS classes for styling
   */
  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'advance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Get the display text for skill levels
   */
  const getSkillLevelText = (level) => {
    switch (level) {
      case 'easy': return 'Beginner';
      case 'moderate': return 'Intermediate';
      case 'advance': return 'Expert';
      default: return level;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl">
            🔍
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Find Perfect Match</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Statistics Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-pink-600">{projects.length}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-pink-600">{matchedEmployees.length}</div>
            <div className="text-sm text-gray-600">Matched Employees</div>
          </div>
        </div>

        {/* Project Selection Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-6">
            {/* Project Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="">Choose a project...</option>
                {projects.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.projectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Find Match Button */}
            <button
              onClick={handleMatch}
              disabled={!selectedProject || isLoading}
              className={`w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 ${
                (!selectedProject || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Finding Matches...</span>
                </div>
              ) : (
                'Find Perfect Match'
              )}
            </button>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Matched Employees Section */}
        {matchedEmployees.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Matched Employees</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedEmployees.map((emp) => (
                <div key={emp._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-xl">
                        {emp.name.charAt(0)}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">{emp.name}</h4>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => handleEmployeeSelect(emp._id)}
                      className="h-5 w-5 text-pink-500 rounded focus:ring-pink-500"
                    />
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
              ))}
            </div>

            {/* Group Creation Form */}
            {selectedEmployees.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Group ({selectedEmployees.length} employees selected)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Enter group name..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={handleCreateGroup}
                    disabled={isCreatingGroup || !groupName.trim()}
                    className={`w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 ${
                      (isCreatingGroup || !groupName.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isCreatingGroup ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Group...</span>
                      </div>
                    ) : (
                      'Create Group'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindEmployee;
