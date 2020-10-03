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
    });
});

router.get('/', async (req, res) => {
   const servers = await Server.find();
   
   res.status(200).json({
       servers,
   })
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const server = (await Server.find({_id: id}))[0];
    
    res.status(200).json({
        server,
    })
});

module.exports = router;