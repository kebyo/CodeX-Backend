const DBcommunicate = require('../service/servers');

module.exports = class AgentsController {
    static async updateInfo(req, res) {
        const updatedServer = {
            name: req.body.name,
            projects: req.body.projects,
        };
    
        const server = await DBcommunicate.findByName(updatedServer.name);
       
        if (!server) {
            await DBcommunicate.add(updatedServer);
    
            return res.json({
                message: "New server added",
                server: updatedServer,
            });
        }
    
        const newServer = await DBcommunicate.update(server, updatedServer);
    
        res.json({
            message: 'Server updated',
            server: newServer,
        });
    }
}