import ping from 'ping';
import ProjectsService from '../service/project';
import ServersService from '../service/servers';

export default class PingController {
    static async ping(req, res) {
        const id = req.params.serverId;

        const server = await ServersService.findById(id);
        const projects = await ProjectsService.find({ server: id });

        const updatedProjects = [];

        for (const project of projects) {
            const host = project.name;
            
            const result = await ping.promise.probe(host);
            console.log(result);
            const status = result.alive ? 200 : 500;

            const updatedProject = await ProjectsService.update({name: project.name}, status);

            updatedProjects.push(updatedProject);
        }

        res.json({
            message: "Pinged!",
            serverInfo: server,
            projects: updatedProjects,
        })
    }
}