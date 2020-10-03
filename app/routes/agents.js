const express = require('express');
const router = express.Router();
const AgentsController = require('../controllers/agents');

router.patch('/', AgentsController.updateInfo);

module.exports = router;