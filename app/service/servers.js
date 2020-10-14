import Server from '../models/server';
import ProjectsService from './project';
/**
 * Класс для работы с моделями Server
 */
export default class ServersService {
    /**
     * Добавляет новый сервер
     * @param {Object} newServer - Новый сервер
     * @returns {Server<Promise>} - Документ
     */
    static async add(newServer) {
        const server = new Server({
            name: newServer.name,
            workspace: newServer.workspace,
        });

        return server.save();
    }

    /**
     * Находит сервер
     * @param {Object} options - Свойства сервера (Например: имя или _id) 
     * @returns {Server<Promise>} - Докумени
     */
    static async find(options) {
        return Server.find(options);
    }

    /**
     * Обновляет сервер
     * @param {Object} options - Свойства сервера (Например: имя или _id)
     * @param {Array} updatedProjects - Названия проектов 
     */
    static async update(options, updatedProjects) {
        const server = await Server.findOne(options);
        if (!server) {
            throw Error('Did not find the server');
        }

        const projects = await ProjectsService.find({ server: server._id });

        for (const project of projects) {
            if (updatedProjects.includes(project.name)) {
                const index = updatedProjects.indexOf(project.name);
                updatedProjects.splice(index, 1);
                continue;
            }

            await ProjectsService.delete({ _id: project._id });
        }

        for (const project of updatedProjects) {
            const projectObj = {
                name: project,
                status: 500,
                server: server._id,
            }

            await ProjectsService.add(projectObj);
        }

    }
}