const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    name: { type: String, required: true },
    projects: [{type: Object, ref: 'Project'}],
});

module.exports = mongoose.model('Server', serverSchema);