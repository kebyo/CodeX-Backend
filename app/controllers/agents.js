import ServersService from '../service/servers';
/**
 * Класс, описывающий логику обработки запроса для Agents
 */
export default class AgentsController {
    /**
     * Обновляет статусы всех проектов, которые хостятся на сервере с name 
     */
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