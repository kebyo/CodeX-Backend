const express = require('express');
const router = express.Router();

const Server = require('../models/server');

router.patch('/', async (req, res) => {
    const updServer = new Server({
        name: req.body.name,
        projects: req.body.projects,
    });

    const server = await Server.findOne({ name: updServer.name });
   
    if (!server) {
        await updServer.save();

        return res.json({
            message: "New server added",
            updServer,
        });
    }

    await server.updateOne({$set: {projects: updServer.projects}});

    res.json({
        message: 'Server updated',
        updServer,
    });
});

module.exports = router;