// controllers/employeeController.js
const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
  try {
    const { name, skills } = req.body;
    const newEmployee = new Employee({ name, skills });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employee', details: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};
