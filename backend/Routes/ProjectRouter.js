const { postProject, getAllProjects } = require('../Controllers/ProjectController');
const { isAdmin } = require('../middleware/auth'); // Ensure only admins can post projects
const { projectValidation } = require('../middleware/validation'); // Import project validation

const router = require('express').Router();

router.post('/', isAdmin, projectValidation, postProject); // Admin can post projects with validation
router.get('/', getAllProjects); // Get all projects

module.exports = router;
