import express from 'express'
import { startAttempt, submitAnswer, completeAttempt, getUserAttempts } from '../controllers/attemptController.js';

const router = express.Router()

router.post('/quiz/:quizId/start', startAttempt);
router.post('/:attemptId/answer', submitAnswer);
router.post('/:attemptId/complete', completeAttempt);
router.get('/user/:userId', getUserAttempts);

export default router;