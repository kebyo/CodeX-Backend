const express = require('express');
const router = express.Router();

const Server = require('../models/server');

router.post('/', async (req, res) => {
    const server = new Server ({
        name: req.body.name,
        projects: req.body.projects,
    });

    await server.save();

    res.status(200).json({
        message: "New server added",
        server,
    })
});

router.get('/', async (req, res) => {

});

router.get('/:id', async (req, res) => {

});

module.exports = router;