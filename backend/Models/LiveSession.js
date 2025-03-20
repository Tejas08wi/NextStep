const mongoose = require('mongoose');

const liveSessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, required: true }, // e.g., Scheduled, Ongoing, Completed
    hostDetails: { type: String, required: false }, // New field for host details
    photo: { type: String, required: false }, // New field for photo URL or path
});

const LiveSession = mongoose.model('LiveSession', liveSessionSchema);
module.exports = LiveSession; 