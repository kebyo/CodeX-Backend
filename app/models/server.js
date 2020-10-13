import mongoose from 'mongoose';

const serverSchema = mongoose.Schema({
    name: { type: String, required: true },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
    },
});

export default mongoose.model('Server', serverSchema);