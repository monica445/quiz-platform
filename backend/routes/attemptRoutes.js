import express from 'express'
import { completeAttempt, getUserAttempts } from '../controllers/attemptController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/:attemptId/complete', authenticateUser, completeAttempt);
router.get('/user/:userId', authenticateUser, getUserAttempts);

export default router;