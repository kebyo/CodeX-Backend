import WorkspacesService from '../service/workspaces';
import ProjectsService from '../service/project';
import ServersService from '../service/servers';
/**
 * Класс, описывающий логику обработки запроса для Воркспейсов 
 */
export default class WorkspaceController {
    /**
     * Добавляет новый Воркспейс 
     */
    static async add(req, res) {
        const workspace = {
            name: req.body.name,
            servers: req.body.servers,
        }

        const workspaceDocument = await WorkspacesService.add({ name: workspace.name });

        let servers = [];

        for (const server of workspace.servers) {
            const serverDocument = await ServersService.add({name: server.name, workspace: workspaceDocument._id});

            let projects = [];

            for (const project of server.projects) {
                const projectDocument = await ProjectsService.add({name: project.name, status: project.status, server: serverDocument._id});

                projects.push(projectDocument);
            }   


            servers.push({
                serverInfo: serverDocument,
                projects,
            });
        }
    

        res.json({
            message: 'New workspace added',
            workspaceInfo: workspaceDocument,
            servers: servers,
        });
    }

    /**
     * Возвращает Воркспейс с id 
     */
    static async getById(req, res) {
        const id = req.params.id;

        const workspaceDocument = await WorkspacesService.find({_id: id});

        const serversDocuments = await ServersService.find({workspace: workspaceDocument._id});

        let servers = [];

        for (const server of serversDocuments) {
            const projects = await ProjectsService.find({server: server._id});
            
            servers.push({
                serverInfo: server,
                projects,
            });
        }

        res.json({
            workspaceInfo: workspaceDocument,
            servers,
        })
    }
    /**
     * Возвращает информацию о серверах в Воркспейсе с id 
     */
    static async getServers(req, res) {
        const id = req.params.id;

        const serversDocuments = await ServersService.find({workspace: id});

        let servers = [];

        for (const server of serversDocuments) {
            const projects = await ProjectsService.find({server: server._id});
            
            servers.push({
                serverInfo: server,
                projects,
            });
        }

        res.json({
            servers,
        })
    }

}

