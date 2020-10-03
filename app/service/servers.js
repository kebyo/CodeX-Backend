const Server = require('../models/server');

module.exports = class DBcommunicate{
    static async add(newServer){
        const server = new Server({
            name: newServer.name,
            projects: newServer.projects,
        });

        await server.save();

        return server;
    }

    static async findById(id){
        const server = await Server.findById(id);
        
        return server;
    }

    static async findAll(){
        const servers = await Server.find();

        return servers;
    }

    static async findByName(name){
        const server = await Server.findOne({name});

        return server;
    }

    static async update(server, updatedServer){
        await server.updateOne({$set: {projects: updatedServer.projects}});
        
        return await this.findByName(updatedServer.name);
    }

}