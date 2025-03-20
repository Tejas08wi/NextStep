const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true }, // e.g., Ongoing, Completed
    collaborationDetails: { type: String, required: false }, // New field for collaboration details
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
