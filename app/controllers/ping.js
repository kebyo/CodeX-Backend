import ping from 'ping';
import ServerService from '../service/servers';

export default class PingController{
    static async ping(req, res) {
        const serverId = req.params.serverId;

        const server = await ServerService.findById(serverId);

        const projects = server.projects;
        
        for (const project of projects) {
            const host = project.name;

            const isAlive = (await ping.promise.probe(host)).alive;
            project.status = isAlive ? 200 : 500;
        }

        await ServerService.update({name: server.name}, projects);

        res.json({
            message: "Pinged!",
            server,
        })
    }
}