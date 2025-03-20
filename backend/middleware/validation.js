const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        isAdmin: Joi.boolean().default(false),
        adminCode: Joi.when('isAdmin', {
            is: true,
            then: Joi.string().required(),
            otherwise: Joi.optional().allow('', null)
        })
    });
    
    const { error } = schema.validate(req.body, { 
        allowUnknown: false,
        abortEarly: false 
    });
    
    if (error) {
        return res.status(400).json({ 
            message: "Validation error", 
            error: {
                details: error.details.map(err => ({
                    message: err.message,
                    path: err.path,
                    type: err.type
                }))
            },
            success: false 
        });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Validation error", 
            error,
            success: false 
        });
    }
    next();
};

const quizValidation = (req, res, next) => {
    const questionSchema = Joi.object({
        question: Joi.string().required(),
        options: Joi.array().items(Joi.string()).min(2).required(),
        correctAnswer: Joi.number().min(0).required(),
        explanation: Joi.string().optional()
    });

    const schema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().valid(
            'Aptitude Test',
            'Mathematical Reasoning',
            'Technical Knowledge',
            'Verbal Communication'
        ).required(),
        description: Joi.string().required(),
        timeLimit: Joi.number().min(1).required(),
        questions: Joi.array().items(questionSchema).min(1).required()
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Validation error", 
            error,
            success: false 
        });
    }
    next();
};

// New job validation function
const jobValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        company: Joi.string().required(),
        type: Joi.string().valid('Full-time', 'Part-time', 'Contract').required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Validation error", 
            error,
            success: false 
        });
    }
    next();
};

const projectValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.string().valid('Ongoing', 'Completed').required(),
        collaborationDetails: Joi.string().optional()
    });

    const { error } = schema.validate(req.body, { 
        allowUnknown: false,
        abortEarly: false 
    });

    if (error) {
        return res.status(400).json({ 
            message: "Validation error", 
            error: {
                details: error.details.map(err => ({
                    message: err.message,
                    path: err.path,
                    type: err.type
                }))
            },
            success: false 
        });
    }
    next();
};

const liveSessionValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
        status: Joi.string().valid('Scheduled', 'Ongoing', 'Completed').required(),
        hostDetails: Joi.string().optional(),
        photo: Joi.string().uri().optional() // Assuming photo is a URL
    });

    const { error } = schema.validate(req.body, { 
        allowUnknown: false,
        abortEarly: false 
    });

    if (error) {
        return res.status(400).json({ 
            message: "Validation error", 
            error: {
                details: error.details.map(err => ({
                    message: err.message,
                    path: err.path,
                    type: err.type
                }))
            },
            success: false 
        });
    }
    next();
};

const courseValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.number().required(), // Duration in hours
        level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
        instructor: Joi.string().required(),
        status: Joi.string().valid('Active', 'Inactive').required(),
        photo: Joi.string().uri().optional(), // Assuming photo is a URL
        price: Joi.number().required() // Price of the course
    });

    const { error } = schema.validate(req.body, { 
        allowUnknown: false,
        abortEarly: false 
    });

    if (error) {
        return res.status(400).json({ 
            message: "Validation error", 
            error: {
                details: error.details.map(err => ({
                    message: err.message,
                    path: err.path,
                    type: err.type
                }))
            },
            success: false 
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
    quizValidation,
    jobValidation,
    projectValidation,
    liveSessionValidation,
    courseValidation
};
