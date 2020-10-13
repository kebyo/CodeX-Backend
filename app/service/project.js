import Project from '../models/project';

export default class ProjectsService {
    static async add(newProject) {
        const project = new Project({
            name: newProject.name,
            status: newProject.status,
            server: newProject.server,
        });

        return project.save();
    }

    static async findByName(name) {
        return Project.find({ name });
    }

    static async find(options){
        return Project.find(options);
    }

    static async update(options, updatedStatus) {
        const project = await Project.findOneAndUpdate(options, {
            $set: { status: updatedStatus },
            new: true,
        });

        return Project.findOne({_id: project._id});
    }

    static async delete(options){
        return Project.deleteOne(options);
    }
}