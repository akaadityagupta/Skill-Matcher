// AllProjects.jsx
import React, { useEffect, useState } from 'react';

const AllProjects = () => {
  // State management for projects data and loading status
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects data from API on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects/all');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper function to determine skill level color based on difficulty
  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'advance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to convert skill level to display text
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
      {/* Header section with title and project count */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
            📊
          </div>
          <h2 className="text-2xl font-bold text-gray-800">All Projects</h2>
        </div>
        <div className="text-gray-500">
          Total: {projects.length} projects
        </div>
      </div>

      {/* Loading state display */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : projects.length === 0 ? (
        // Empty state display when no projects exist
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700">No Projects Found</h3>
          <p className="text-gray-500">Create a new project to get started</p>
        </div>
      ) : (
        // Grid layout for displaying project cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                {/* Project header with name and icon */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                    {project.projectName.charAt(0)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{project.projectName}</h3>
                </div>

                {/* Required skills section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.requiredSkills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillLevelColor(skill.level)}`}
                      >
                        {skill.name} - {getSkillLevelText(skill.level)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project footer with metadata */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Required Skills: {project.requiredSkills.length}</span>
                    <span>ID: {project._id?.slice(-4) || 'N/A'}</span>
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

export default AllProjects;