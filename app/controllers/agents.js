import ServerService from '../service/servers';

export default class AgentsController {
    static async updateInfo(req, res) {
        const updatedServer = {
            name: req.body.name,
            projects: req.body.projects,
        };

        try {
            const newServer = await ServerService.update({ name: updatedServer.name }, updatedServer.projects);
            
            res.json({
                message: 'Server updated',
                server: newServer,
            });    
        } catch (error) {
            await ServerService.add(updatedServer);
    
            return res.json({
                message: 'New server added',
                server: updatedServer,
            });
        }
    }
}