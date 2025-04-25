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
