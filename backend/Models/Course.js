const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in hours
    level: { type: String, required: true }, // e.g., Beginner, Intermediate, Advanced
    instructor: { type: String, required: true }, // Name of the instructor
    status: { type: String, required: true }, // e.g., Active, Inactive
    photo: { type: String, required: false }, // New field for photo URL or path
    price: { type: Number, required: true }, // Price of the course
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
