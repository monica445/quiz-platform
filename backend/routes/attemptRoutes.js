import express from 'express'
import { submitAttempt, getUserAttempts, getAttemptById } from '../controllers/attemptController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/', authenticateUser, submitAttempt);
router.get('/user/:userId', authenticateUser, getUserAttempts);
router.get('/:attemptId', authenticateUser, getAttemptById);

export default router;