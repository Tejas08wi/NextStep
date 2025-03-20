const express = require('express');
const router = express.Router();
const { 
    createQuiz, 
    getAllQuizzes, 
    getQuizzesByCategory, 
    getQuiz, 
    getQuizForUser, 
    updateQuiz, 
    deleteQuiz, 
    submitQuiz, 
    takeQuiz 
} = require('../Controllers/QuizController');
const { isAuth, isAdmin } = require('../middleware/auth');
const { quizValidation } = require('../middleware/validation');

router.post('/create', isAdmin, quizValidation, createQuiz);
router.get('/admin/all', isAdmin, getAllQuizzes);
router.put('/:id', isAdmin, quizValidation, updateQuiz);
router.delete('/:id', isAdmin, deleteQuiz);

router.get('/category/:category', isAuth, getQuizzesByCategory);
router.get('/take/:quizId', isAuth, takeQuiz);
router.post('/submit', isAuth, submitQuiz);

module.exports = router;
