import mongoose from 'mongoose';

const serverSchema = mongoose.Schema({
    name: { type: String, required: true },
    projects: [{type: Object, ref: 'Project'}],
});

export default mongoose.model('Server', serverSchema);