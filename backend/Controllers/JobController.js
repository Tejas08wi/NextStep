const Job = require('../Models/Job');

// Post a new job
const postJob = async (req, res) => {
    try {
        const { title, company, type, location, description } = req.body;
        const newJob = new Job({ title, company, type, location, description });
        await newJob.save();
        res.json({ message: 'Job posted successfully', success: true });
    } catch (error) {
        console.error('Post job error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json({ jobs, success: true });
    } catch (error) {
        console.error('Get all jobs error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = { postJob, getAllJobs };
