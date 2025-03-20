const { postJob, getAllJobs } = require('../Controllers/JobController');
const { isAdmin } = require('../middleware/auth'); // Ensure only admins can post jobs
const { jobValidation } = require('../middleware/validation'); // Import job validation

const router = require('express').Router();

router.post('/', isAdmin, jobValidation, postJob); // Admin can post jobs with validation
router.get('/', getAllJobs); // Get all jobs

module.exports = router;
