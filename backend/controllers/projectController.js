// controllers/projectController.js
const Project = require('../models/Project');

exports.addProject = async (req, res) => {
  try {
    const { projectName, requiredSkills } = req.body;
    const newProject = new Project({ projectName, requiredSkills });
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add project', details: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully', project: deletedProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.notes.push({ description });
    await project.save();

    res.status(201).json({ message: 'Note added successfully', project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add note', details: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { projectId, noteId } = req.params;
    
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Find the note index
    const noteIndex = project.notes.findIndex(note => note._id.toString() === noteId);
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Remove the note
    project.notes.splice(noteIndex, 1);
    await project.save();
    
    res.json({ message: 'Note deleted successfully', project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note', details: error.message });
  }
};
