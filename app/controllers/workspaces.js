import WorkspacesService from '../service/workspaces';
import ProjectsService from '../service/project';
import ServersService from '../service/servers';
import project from '../models/project';

export default class WorkspaceController {
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

    static async getById(req, res) {
        const id = req.params.id;

        const workspace = await WorkspacesService.findById(id);

        res.json({
            workspace,
        })
    }

    static async getServers(req, res) {
        const servers = (await WorkspacesService.findById(req.params.id)).servers;

        res.json({
            servers,
        })
    }

    static async getServerById(req, res) {
        const workspace = await WorkspacesService.findById(req.params.id).populate({
            path: 'servers',
            populate: {
                path: 'projects',
            }
        });

        const servers = workspace.servers;

        for (const server of servers) {
            if (server._id == req.params.serverId) {
                return res.json({
                    server,
                });
            }
        }

        res.json({
            message: 'Not found',
        })
    }
}

