const { Quiz, User } = require('../Models');

// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const { title, category, description, timeLimit, questions } = req.body;
        const quiz = new Quiz({
            title,
            category,
            description,
            timeLimit,
            questions,
            createdBy: req.user._id
        });
        await quiz.save();
        res.status(201).json({ 
            message: 'Quiz created successfully',
            quiz,
            success: true 
        });
    } catch (error) {
        console.error('Create quiz error:', error);
        res.status(500).json({ 
            message: 'Error creating quiz',
            success: false 
        });
    }
};

// Get all quizzes (admin view)
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find()
            .populate('createdBy', 'name email')
            .sort('-createdAt');
        res.json({ quizzes, success: true });
    } catch (error) {
        console.error('Get all quizzes error:', error);
        res.status(500).json({ 
            message: 'Error fetching quizzes',
            success: false 
        });
    }
};

// Get active quizzes by category (user view)
const getQuizzesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const quizzes = await Quiz.find({ 
            category, 
            isActive: true 
        })
        .select('-questions.correctAnswer -questions.explanation')
        .sort('-createdAt');
        
        res.json({ quizzes, success: true });
    } catch (error) {
        console.error('Get quizzes by category error:', error);
        res.status(500).json({ 
            message: 'Error fetching quizzes',
            success: false 
        });
    }
};

// Get single quiz (admin view)
const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate('createdBy', 'name email');
        
        if (!quiz) {
            return res.status(404).json({ 
                message: 'Quiz not found',
                success: false 
            });
        }
        
        res.json({ quiz, success: true });
    } catch (error) {
        console.error('Get quiz error:', error);
        res.status(500).json({ 
            message: 'Error fetching quiz',
            success: false 
        });
    }
};

// Get quiz for user (without correct answers)
const getQuizForUser = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ 
            _id: req.params.id,
            isActive: true 
        }).select('-questions.correctAnswer -questions.explanation');
        
        if (!quiz) {
            return res.status(404).json({ 
                message: 'Quiz not found or inactive',
                success: false 
            });
        }
        
        res.json({ quiz, success: true });
    } catch (error) {
        console.error('Get quiz for user error:', error);
        res.status(500).json({ 
            message: 'Error fetching quiz',
            success: false 
        });
    }
};

// Update quiz
const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!quiz) {
            return res.status(404).json({ 
                message: 'Quiz not found or unauthorized',
                success: false 
            });
        }
        
        res.json({ quiz, success: true });
    } catch (error) {
        console.error('Update quiz error:', error);
        res.status(500).json({ 
            message: 'Error updating quiz',
            success: false 
        });
    }
};

// Delete quiz
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findOneAndDelete({ 
            _id: req.params.id,
            createdBy: req.user._id 
        });
        
        if (!quiz) {
            return res.status(404).json({ 
                message: 'Quiz not found or unauthorized',
                success: false 
            });
        }
        
        res.json({ 
            message: 'Quiz deleted successfully',
            success: true 
        });
    } catch (error) {
        console.error('Delete quiz error:', error);
        res.status(500).json({ 
            message: 'Error deleting quiz',
            success: false 
        });
    }
};

// Take quiz
const takeQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({
            _id: req.params.quizId,
            isActive: true
        }).select('-questions.correctAnswer -questions.explanation');
        
        if (!quiz) {
            return res.status(404).json({ 
                message: 'Quiz not found or inactive',
                success: false 
            });
        }
        
        // Format quiz for taking
        const formattedQuiz = {
            _id: quiz._id,
            title: quiz.title,
            category: quiz.category,
            description: quiz.description,
            timeLimit: quiz.timeLimit,
            questions: quiz.questions.map(q => ({
                _id: q._id,
                question: q.question,
                options: q.options
            }))
        };
        
        res.json({ quiz: formattedQuiz, success: true });
    } catch (error) {
        console.error('Take quiz error:', error);
        res.status(500).json({ 
            message: 'Error preparing quiz',
            success: false 
        });
    }
};

// Submit quiz answers
const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ 
                message: 'Quiz not found',
                success: false 
            });
        }
        
        if (!quiz.isActive) {
            return res.status(403).json({ 
                message: 'Quiz is no longer active',
                success: false 
            });
        }
        
        // Create a map of questionId to answer
        const answerMap = answers.reduce((map, answer) => {
            map[answer.questionId] = answer.selectedAnswer;
            return map;
        }, {});
        
        // Calculate score
        let score = 0;
        const results = quiz.questions.map((question) => {
            const userAnswer = answerMap[question._id.toString()];
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) score++;
            
            return {
                questionId: question._id,
                question: question.question,
                yourAnswer: userAnswer,
                correctAnswer: question.correctAnswer,
                correct: isCorrect,
                explanation: question.explanation
            };
        });
        
        const total = quiz.questions.length;
        const percentage = Math.round((score / total) * 100);
        
        res.json({
            score,
            total,
            percentage,
            results,
            success: true
        });
    } catch (error) {
        console.error('Submit quiz error:', error);
        res.status(500).json({ 
            message: 'Error submitting quiz',
            success: false 
        });
    }
};

module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizzesByCategory,
    getQuiz,
    getQuizForUser,
    updateQuiz,
    deleteQuiz,
    takeQuiz,
    submitQuiz
};
