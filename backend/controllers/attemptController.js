import prisma from '../prismaClient.js';

export const startAttempt = async (req, res) => {
  const quizId = parseInt(req.params.id);
  const userId = req.user.id; 

  try {
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score: 0,
        totalQuestions: 0,
      },
    });

    res.json(attempt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to start quiz" });
  }
}

export const submitAnswer = async (req, res) => {
    const attemptId = parseInt(req.params.attemptId);
    const { questionId, selectedOption } = req.body;

    try {
        const question = await prisma.question.findUnique({ where: { id: questionId } });
        if (!question) return res.status(404).json({ error: "Question not found" });

        const isCorrect = question.correctOption === selectedOption;

        const answer = await prisma.answer.create({
            data: { attemptId, questionId, selectedOption, isCorrect }
        });
        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit answer" });
    }
}

// Complete attempt
export const completeAttempt = async (req, res) => {
    const attemptId = parseInt(req.params.attemptId);

    try {
        const answers = await prisma.answer.findMany({ where: { attemptId } });
        const score = answers.filter(a => a.isCorrect).length;
        const totalQuestions = answers.length;

        const attempt = await prisma.quizAttempt.update({
            where: { id: attemptId },
            data: { score, totalQuestions, completedAt: new Date() }
        });

        res.json(attempt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to complete attempt" });
    }
}

// Get user attempts
export const getUserAttempts = async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const attempts = await prisma.quizAttempt.findMany({
            where: { userId },
            include: { quiz: true }
        });
        res.json(attempts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch attempts" });
    }
}