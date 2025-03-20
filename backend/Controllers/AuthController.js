const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../Models');

const ADMIN_CODE = 'admin123'; // In production, this should be in environment variables

const signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin, adminCode } = req.body;
        
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, please login', success: false });
        }

        // Validate admin signup
        if (isAdmin) {
            if (!adminCode || adminCode !== ADMIN_CODE) {
                return res.status(403)
                    .json({ message: 'Invalid admin code', success: false });
            }
        }

        // Create new user
        const userModel = new User({ 
            name, 
            email, 
            password,
            isAdmin: isAdmin || false
        });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201)
            .json({
                message: "Signup successful",
                success: true
            });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMsg = 'Authentication failed: email or password is incorrect';
        
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        // Check if user is active
        if (user.status === 'inactive') {
            return res.status(403)
                .json({ message: 'Account is inactive', success: false });
        }

        const jwtToken = jwt.sign(
            { 
                email: user.email, 
                _id: user._id,
                isAdmin: user.isAdmin 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Update last login date
        user.lastLoginDate = new Date();
        await user.save();

        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email,
                name: user.name,
                isAdmin: user.isAdmin
            });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};

module.exports = {
    signup,
    login
};