// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const { addEmployee, getAllEmployees } = require('../controllers/employeeController');

router.post('/add', addEmployee);
router.get('/all', getAllEmployees);

module.exports = router;
