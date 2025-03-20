const { postLiveSession, getAllLiveSessions } = require('../Controllers/LiveSessionController');
const { isAdmin } = require('../middleware/auth'); // Ensure only admins can post live sessions
const { liveSessionValidation } = require('../middleware/validation'); // Import live session validation

const router = require('express').Router();

router.post('/', isAdmin, liveSessionValidation, postLiveSession); // Admin can post live sessions with validation
router.get('/', getAllLiveSessions); // Get all live sessions

module.exports = router;
