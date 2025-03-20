const { User } = require('../Models');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ users, success: true });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Get admin dashboard stats
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });
        const adminUsers = await User.countDocuments({ isAdmin: true });

        const stats = {
            totalUsers,
            activeUsers,
            adminUsers,
            inactiveUsers: totalUsers - activeUsers
        };

        res.json({ stats, success: true });
    } catch (error) {
        console.error('Get admin stats error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Don't allow changing admin status through this endpoint
        delete req.body.isAdmin;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        ).select('-password');

        res.json({ user: updatedUser, success: true });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (user.isAdmin) {
            return res.status(403).json({ message: 'Cannot delete admin users', success: false });
        }

        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully', success: true });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    getAllUsers,
    getAdminStats,
    updateUser,
    deleteUser
};
