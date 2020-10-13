import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Number, required: true},
    server: {type: mongoose.Schema.Types.ObjectId, ref: 'Server'},
});

export default mongoose.model('Project', projectSchema);