// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const { addEmployee, getAllEmployees, deleteEmployee } = require('../controllers/employeeController');
const Employee = require('../models/Employee');

router.post('/add', addEmployee);
router.get('/all', getAllEmployees);
router.delete('/:id', deleteEmployee);

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update employee skills
router.patch('/:id/skills', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.skills = req.body.skills;
    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
