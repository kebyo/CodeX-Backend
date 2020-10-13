import mongoose from 'mongoose';

const workspaceSchema = mongoose.Schema({
    name: { type: String, required: true },
});



export default mongoose.model('Workspace', workspaceSchema);