const { postCourse, getAllCourses } = require('../Controllers/CourseController');
const { isAdmin } = require('../middleware/auth'); // Ensure only admins can post courses
const { courseValidation } = require('../middleware/validation'); // Import course validation

const router = require('express').Router();

router.post('/', isAdmin, courseValidation, postCourse); // Admin can post courses with validation
router.get('/', getAllCourses); // Get all courses

module.exports = router;
