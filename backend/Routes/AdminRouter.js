const router = require('express').Router();
const { isAdmin } = require('../middleware/auth');
const {
    getAllUsers,
    getAdminStats,
    updateUser,
    deleteUser
} = require('../Controllers/AdminController');

router.use(isAdmin);

router.get('/users', getAllUsers);

router.get('/stats', getAdminStats);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
