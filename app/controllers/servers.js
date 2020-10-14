import ProjectsService from '../service/project';
import ServersService from '../service/servers';
/**
 * Класс, описывающий логику обработки запроса для Серверов 
 */
export default class ServersController {
    /**
     * Добавляет новый Сервер 
     */
    static async add(req, res) {
        const newServer = {
            name: req.body.name,
            projects: req.body.projects,
        };

        const server = await ServersService.add(newServer);

        res.status(200).json({
            message: 'New server added',
            server,
        });
    }
    /**
     * Возвращает все серверы
    */
    static async getAll(req, res) {
        const servers = await ServersService.find({});

        console.log(servers);

        let serversObj = [];

        for (const server of servers) {
            const projects = await ProjectsService.find({ server: server._id });

            serversObj.push({
                serverInfo: server,
                projects,
            });
        }

        res.status(200).json({
            servers: serversObj,
        });
    }
    /**
     * Возвращает информацию о сервере с id 
     */
    static async getByID(req, res) {
        const id = req.params.id;

        const server = await ServersService.find({ _id: id });

        const projects = await ProjectsService.find({ server: server._id });

        res.status(200).json({
            serverInfo: server,
            projects,
        })
    }

}