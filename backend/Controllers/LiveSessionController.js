const LiveSession = require('../Models/LiveSession');

// Post a new live session
const postLiveSession = async (req, res) => {
    try {
        const { title, description, startTime, endTime, status, hostDetails, photo } = req.body;
        const newLiveSession = new LiveSession({ title, description, startTime, endTime, status, hostDetails, photo });
        await newLiveSession.save();
        res.json({ message: 'Live session posted successfully', success: true });
    } catch (error) {
        console.error('Post live session error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Get all live sessions
const getAllLiveSessions = async (req, res) => {
    try {
        const liveSessions = await LiveSession.find();
        res.json({ liveSessions, success: true });
    } catch (error) {
        console.error('Get all live sessions error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = { postLiveSession, getAllLiveSessions }; 