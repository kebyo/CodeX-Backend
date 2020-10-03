import Server from '../models/server';

export default class ServerService {
    static async add(newServer) {
        const server = new Server({
            name: newServer.name,
            projects: newServer.projects,
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

    static async update(serverData, updatedProjects) {
        const server =  await Server.findOneAndUpdate(serverData,
            {$set: { projects: updatedProjects }},
            {new: true},
        );
        
        if (!server){
            throw Error('Not found');
        }

        return server;
    }

}