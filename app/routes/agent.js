const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const server = new Server ({
        name: req.body.name,
        status: req.body.status,
    });

    await server.save();

    res.status(200).json({
        message: "New server added",
        server,
    })
});

module.exports = router;