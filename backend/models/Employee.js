// models/Employee.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['easy', 'moderate', 'advanced'], required: true },
});

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [skillSchema],
});

module.exports = mongoose.model('Employee', employeeSchema);
