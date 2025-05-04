// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { addProject, getAllProjects, deleteProject, addNote, deleteNote } = require('../controllers/projectController');
const Project = require('../models/Project');

router.post('/add', addProject);
router.get('/all', getAllProjects);
router.delete('/:id', deleteProject);
router.post('/:id/notes', addNote);
router.delete('/:projectId/notes/:noteId', deleteNote);

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project required skills
router.patch('/:id/skills', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.requiredSkills = req.body.requiredSkills;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle note completion status
router.patch('/:projectId/notes/:noteId/toggle', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const note = project.notes.id(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.completed = !note.completed;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
