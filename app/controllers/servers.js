const express = require('express');
const Server = require('../models/server');
const DBcommunicate = require('../service/servers');

module.exports = class ServersController {
    static async addServer(req, res) {
        const newServer = {
            name: req.body.name,
            projects: req.body.projects,
        };

        const server = await DBcommunicate.add(newServer);

        res.status(200).json({
            message: "New server added",
            server,
        });
    }

    static async getAllServers(req, res) {
        const servers = await DBcommunicate.findAll();

        res.status(200).json({
            servers,
        })
    }

    static async getServerByID(req, res) {
        const id = req.params.id;
    
        const server = await DBcommunicate.findById(id);
        
        res.status(200).json({
            server,
        })
    }

}