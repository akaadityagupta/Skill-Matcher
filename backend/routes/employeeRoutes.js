// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const { addEmployee, getAllEmployees, deleteEmployee  } = require('../controllers/employeeController');

router.post('/add', addEmployee);
router.get('/all', getAllEmployees);
router.delete('/:id', deleteEmployee);

module.exports = router;
