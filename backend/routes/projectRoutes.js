// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { addProject, getAllProjects } = require('../controllers/projectController');

router.post('/add', addProject);
router.get('/all', getAllProjects);

module.exports = router;
