// routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const { matchEmployeesToProject } = require('../controllers/matchController');

router.post('/project', matchEmployeesToProject);

module.exports = router;
