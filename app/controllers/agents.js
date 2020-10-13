import ServersService from '../service/servers';

export default class AgentsController {
    static async updateInfo(req, res) {
        const updatedServer = {
            name: req.body.name,
            projects: req.body.projects,
        };

        try {
            await ServersService.update({ name: updatedServer.name }, updatedServer.projects);
        } catch (error) {
            return res.json({
                message: error.message,
            })
        }

        res.json({
            message: 'Server updated',
        });
    }
}