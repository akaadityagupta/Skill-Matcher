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

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee', details: error.message });
  }
};
