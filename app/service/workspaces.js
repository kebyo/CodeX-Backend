import project from '../models/project';
import Workspace from '../models/workspace';
/**
 * Класс для работы с моделями Workspace
 */
export default class WorkspacesService{
    /**
     * Добавляет новый воркспейс в БД
     * @param {Object} newWorkspace - Новый Воркспейс
     * @returns {Workspace<Promise>} - Документ
     */
    static async add(newWorkspace){
        const workspace = new Workspace ({
            name: newWorkspace.name,
        });

        return workspace.save();
    }

}