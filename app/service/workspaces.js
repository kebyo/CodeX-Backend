import project from '../models/project';
import Workspace from '../models/workspace';

export default class WorkspacesService{
    static async add(newWorkspace){
        const workspace = new Workspace ({
            name: newWorkspace.name,
        });

        return workspace.save();
    }

    static async update(workspace, updatedServers){
        const newWorkspace =  await Workspace.findOneAndUpdate({name: workspace.name}, {$set: {servers: updatedServers}}, {new: true});

        if (!newWorkspace){
            throw new Error('Did not find the workspace');
        }

        return Workspace.findOne({_id: newWorkspace._id}).populate({
            path: 'servers',
            populate: {
                path: 'projects',
            }
        });
    }

    static async findById(id){
        return Workspace.findOne({_id: id}).populate({
            path: 'servers',
            populate: {
                path: 'projects',
            }
        });
    }

}