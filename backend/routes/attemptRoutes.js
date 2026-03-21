import express from 'express'
import { startAttempt, submitAnswer, completeAttempt, getUserAttempts } from '../controllers/attemptController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/quiz/:quizId/start', authenticateUser, startAttempt);
router.post('/:attemptId/answer', authenticateUser, submitAnswer);
router.post('/:attemptId/complete', authenticateUser, completeAttempt);
router.get('/user/:userId', authenticateUser, getUserAttempts);

export default router;