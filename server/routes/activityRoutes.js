const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/activities', authenticateToken, activityController.recordActivity);
router.get('/activities', authenticateToken, activityController.getAllActivities);
router.put('/activities/:id', authenticateToken, activityController.editActivity);
router.delete('/activities/:id', authenticateToken, activityController.deleteActivity);

module.exports = router;
