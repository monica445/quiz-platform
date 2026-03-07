import express from 'express';
import { getAllQuizzes, getQuizByID } from '../controllers/quizController.js';

const router = express.Router();

router.get("/", getAllQuizzes);
router.get("/:id", getQuizByID);

export default router;