// AllProjects.jsx
import React, { useEffect, useState } from 'react';

const AllProjects = () => {
  // State management for projects data and loading status
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [noteDescription, setNoteDescription] = useState('');
  const [expandedNotes, setExpandedNotes] = useState({});

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

  // Toggle notes visibility for a project
  const toggleNotes = (projectId) => {
    setExpandedNotes(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Delete project function
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove project from state after successful deletion
        setProjects(projects.filter(project => project._id !== projectId));
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Delete note function
  const handleDeleteNote = async (projectId, noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(projects.map(project => 
          project._id === projectId ? updatedProject.project : project
        ));
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Add note function
  const handleAddNote = async () => {
    if (!noteDescription.trim() || !selectedProject) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${selectedProject._id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: noteDescription }),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(projects.map(project => 
          project._id === selectedProject._id ? updatedProject.project : project
        ));
        setNoteDescription('');
        setSelectedProject(null);
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                      {project.projectName.charAt(0)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{project.projectName}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        selectedProject && selectedProject._id === project._id
                          ? 'text-purple-600 bg-purple-100'
                          : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                      title="Add Note"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      title="Delete Project"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
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

                {/* Notes section */}
                {project.notes && project.notes.length > 0 && (
                  <div className="mt-4">
                    <button 
                      onClick={() => toggleNotes(project._id)}
                      className="flex items-center space-x-2 text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      <span>{project.notes.length} note{project.notes.length !== 1 ? 's' : ''}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${expandedNotes[project._id] ? 'rotate-180' : ''}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Expanded notes section */}
                    {expandedNotes[project._id] && (
                      <div className="mt-2 space-y-2 pl-6 border-l-2 border-purple-100">
                        {project.notes.map((note, idx) => (
                          <div key={idx} className="text-sm text-gray-600 group relative">
                            <p>{note.description}</p>
                            <div className="flex justify-between items-center mt-1">
                              <div className="text-xs text-gray-400">
                                {new Date(note.createdAt).toLocaleDateString()}
                              </div>
                              <button
                                onClick={() => handleDeleteNote(project._id, note._id)}
                                className="text-gray-400 hover:text-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                title="Delete Note"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

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

      {/* Note Input Form - Fixed to the left side */}
      {selectedProject && (
        <div className="fixed left-0 bottom-0 w-72 bg-white shadow-lg rounded-tr-lg p-4 z-50 border-t border-r border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-800">Add Note to {selectedProject.projectName}</h3>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            <textarea
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              rows="3"
              placeholder="Write your note here..."
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-3 py-1 text-xs text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;