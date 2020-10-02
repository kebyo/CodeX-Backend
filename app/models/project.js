const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Number, required: true},
});

module.exports = mongoose.model('Project', projectSchema);