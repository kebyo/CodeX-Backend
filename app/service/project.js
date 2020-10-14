import Project from '../models/project';
/**
 * Класс для работы с моделями Project
 */
export default class ProjectsService {
    /**
     * Добавляет новый проект  
     * @param {Object} newProject - Новый проект
     * @returns {Promise<Project>} - Документ 
     */
    static async add(newProject) {
        const project = new Project({
            name: newProject.name,
            status: newProject.status,
            server: newProject.server,
        });

        return project.save();
    }

    /**
     * Находит проект
     * @param {Object} options - свойства проекта (Например: имя или _id)
     * @returns {Promise<Project>} - Документ 
     */
    static async find(options){
        return Project.find(options);
    }

    /**
     * Обновляет статус проекта
     * @param {Object} options - свойства проекта (Например: имя или _id)
     * @param {Number} updatedStatus - Обновленный статус проекта
     * @returns {Promise<Project} - Документ
     */
    static async update(options, updatedStatus) {
        const project = await Project.findOneAndUpdate(options, {
            $set: { status: updatedStatus },
            new: true,
        });

        return Project.findOne({_id: project._id});
    }

    /**
     * Удаляет проект
     * @param {Object} options - свойства проекта (Например: имя или _id)
     * @returns {Promise<Project} - Документ
     */
    static async delete(options){
        return Project.deleteOne(options);
    }
}