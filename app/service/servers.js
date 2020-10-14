import Server from '../models/server';
import ProjectsService from './project';

export default class ServersService {
    static async add(newServer) {
        const server = new Server({
            name: newServer.name,
            workspace: newServer.workspace,
        });

        return server.save();
    }

    static async findById(id) {
        return Server.findById(id);
    }

    static async findAll() {
        return Server.find();
    }

    static async findByName(name) {
        return Server.findOne({ name });
    }

    static async find(options){
        return Server.find(options);
    }

    static async update(serverData, updatedProjects) {
        const server = await Server.findOne(serverData);
        if (!server) {
            throw Error('Did not find the server');
        }

        const projects = await ProjectsService.find({server: server._id});

        for (const project of projects) {
            if (updatedProjects.includes(project.name)){
                const i = updatedProjects.indexOf(project.name);
                updatedProjects.splice(i, 1);
                continue;
            }
            
            await ProjectsService.delete({_id: project._id});
        }

        for (const project of updatedProjects) {
            const projectObj = {
                name: project,
                status: 500,
                server: server._id,
            }
            await ProjectsService.add(projectObj);
        }

        return;
    }
}