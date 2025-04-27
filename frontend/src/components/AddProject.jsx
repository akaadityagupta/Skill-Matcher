// AddProject.jsx
import React, { useState } from 'react';

const AddProject = () => {
  // State management for project form data
  const [projectName, setProjectName] = useState('');
  const [skills, setSkills] = useState([{ name: '', level: 'easy' }]);

  // Handle changes in skill fields (name or level)
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  // Add a new empty skill field to the form
  const addSkillField = () => {
    setSkills([...skills, { name: '', level: 'easy' }]);
  };

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = { projectName, requiredSkills: skills };

    try {
      const response = await fetch('http://localhost:5000/api/projects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();
      alert('Project added successfully!');
      setName('');
      setSkills([{ name: '', level: 'easy' }]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Project form container */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Form header with icon and title */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
            📋
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create New Project</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project name input field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              required
            />
          </div>

          {/* Skills section with dynamic fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Required Skills</label>
              <button
                type="button"
                onClick={addSkillField}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
              >
                <span className="text-xl">+</span>
                <span>Add Skill</span>
              </button>
            </div>

            {/* Dynamic skill input fields */}
            {skills.map((skill, index) => (
              <div key={index} className="flex space-x-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="w-40">
                  <select
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white"
                  >
                    <option value="easy">Beginner</option>
                    <option value="moderate">Intermediate</option>
                    <option value="advanced">Expert</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Submit button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;