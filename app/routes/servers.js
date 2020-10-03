const express = require('express');
const router = express.Router();
const ServersController = require('../controllers/servers');

router.post('/', ServersController.addServer);

router.get('/', ServersController.getAllServers);

router.get('/:id', ServersController.getServerByID);

module.exports = router;