import ServerService from '../service/servers';

export default class ServersController {
    static async add(req, res) {
        const newServer = {
            name: req.body.name,
            projects: req.body.projects,
        };

        const server = await ServerService.add(newServer);

        res.status(200).json({
            message: "New server added",
            server,
        });
    }

    static async getAll(req, res) {
        const servers = await ServerService.findAll();

        res.status(200).json({
            servers,
        })
    }

    static async getByID(req, res) {
        const id = req.params.id;
    
        const server = await ServerService.findById(id);
        
        res.status(200).json({
            server,
        })
    }

}