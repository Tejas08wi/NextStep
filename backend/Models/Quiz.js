const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: Number,
        required: true
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
        enum: ['Aptitude Test', 'Mathematical Reasoning', 'Technical Knowledge', 'Verbal Communication']
    },
    description: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,  // in minutes
        required: true
    },
    questions: [QuestionSchema],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const QuizModel = mongoose.model('quizzes', QuizSchema);
module.exports = QuizModel;
