// controllers/matchController.js
const Project = require('../models/Project');
const Employee = require('../models/Employee');

const levelScore = {
  easy: 1,
  moderate: 2,
  advanced: 3,
};

exports.matchEmployeesToProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const employees = await Employee.find();
    const matches = [];

    for (let emp of employees) {
      let score = 0;
      for (let reqSkill of project.requiredSkills) {
        const match = emp.skills.find(s => s.name === reqSkill.name);
        if (match) {
          const levelDiff = Math.abs(levelScore[match.level] - levelScore[reqSkill.level]);
          const point = 3 - levelDiff; // max 3 points, min 0
          score += point;
        }
      }

      if (score > 0) {
        matches.push({ employee: emp, score });
      }
    }

    // Sort by score descending and pick top 5
    matches.sort((a, b) => b.score - a.score);
    const top5 = matches.slice(0, 5);

    res.json({ topEmployees: top5 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to match employees', details: error.message });
  }
};



