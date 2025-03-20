const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: [
            array => array.length >= 2,
            'At least 2 options are required'
        ]
    },
    correctAnswer: {
        type: Number,
        required: true,
        min: 0
    },
    explanation: {
        type: String
    }
});

const QuizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Aptitude Test',
            'Mathematical Reasoning',
            'Technical Knowledge',
            'Verbal Communication'
        ]
    },
    description: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,
        required: true,
        min: 1
    },
    questions: {
        type: [QuestionSchema],
        required: true,
        validate: [
            array => array.length >= 1,
            'At least 1 question is required'
        ]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    timestamps: true
});

module.exports = QuizSchema;
