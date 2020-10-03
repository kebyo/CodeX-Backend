import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Number, required: true},
});

export default mongoose.model('Project', projectSchema);