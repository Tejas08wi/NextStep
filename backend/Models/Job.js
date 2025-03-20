const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Full-time, Part-time
    location: { type: String, required: true }, // e.g., Remote, On-site
    description: { type: String, required: true },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
