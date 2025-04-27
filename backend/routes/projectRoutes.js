// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { addProject, getAllProjects, deleteProject, addNote, deleteNote } = require('../controllers/projectController');

router.post('/add', addProject);
router.get('/all', getAllProjects);
router.delete('/:id', deleteProject);
router.post('/:id/notes', addNote);
router.delete('/:projectId/notes/:noteId', deleteNote);

module.exports = router;
