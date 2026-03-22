import prisma from '../prismaClient.js';

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