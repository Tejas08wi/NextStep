const jwt = require('jsonwebtoken');
const { User } = require('../Models');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Authentication required', 
                success: false 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ 
                message: 'User not found',
                success: false 
            });
        }

        if (user.status === 'inactive') {
            return res.status(403).json({ 
                message: 'Account is inactive',
                success: false 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token',
                success: false 
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired',
                success: false 
            });
        }
        console.error('Auth middleware error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            success: false 
        });
    }
};

const isAuth = async (req, res, next) => {
    await authenticate(req, res, () => {
        next();
    });
};

const isAdmin = async (req, res, next) => {
    await authenticate(req, res, () => {
        if (!req.user.isAdmin) {
            return res.status(403).json({ 
                message: 'Admin access required',
                success: false 
            });
        }
        next();
    });
};

module.exports = { isAuth, isAdmin };
