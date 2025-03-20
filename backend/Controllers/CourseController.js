const Course = require('../Models/Course');

// Post a new course
const postCourse = async (req, res) => {
    try {
        const { title, description, duration, level, instructor, status, photo, price } = req.body;
        const newCourse = new Course({ title, description, duration, level, instructor, status, photo, price });
        await newCourse.save();
        res.json({ message: 'Course posted successfully', success: true });
    } catch (error) {
        console.error('Post course error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses, success: true });
    } catch (error) {
        console.error('Get all courses error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = { postCourse, getAllCourses };
