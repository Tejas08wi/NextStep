const mongoose = require('mongoose');
const UserSchema = require('./schemas/user');
const QuizSchema = require('./schemas/quiz');

// Create models
const User = mongoose.model('users', UserSchema);
const Quiz = mongoose.model('quizzes', QuizSchema);

// Export models
module.exports = {
    User,
    Quiz
};
