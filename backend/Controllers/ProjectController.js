const Project = require('../Models/Project');

// Post a new project
const postProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, status, collaborationDetails } = req.body;
        const newProject = new Project({ name, description, startDate, endDate, status, collaborationDetails });
        await newProject.save();
        res.json({ message: 'Project posted successfully', success: true });
    } catch (error) {
        console.error('Post project error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ projects, success: true });
    } catch (error) {
        console.error('Get all projects error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = { postProject, getAllProjects };
