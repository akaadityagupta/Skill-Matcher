// models/Project.js
const mongoose = require('mongoose');

const requiredSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['easy', 'moderate', 'advanced'], required: true },
});

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  requiredSkills: [requiredSkillSchema],
});

module.exports = mongoose.model('Project', projectSchema);
