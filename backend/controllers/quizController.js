import prisma from "../prismaClient.js";

export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            select: { id: true, title: true, description: true, createdAt: true }
        });
        res.json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
}

export const getQuizByID = async (req, res) => {
    const quizId = parseInt(req.params.id);
    try {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    select: { id: true, questionText: true, optionA: true, optionB: true, optionC: true, optionD: true }
                }
            }
        });
        if (!quiz) return res.status(404).json({ error: "Quiz not found" });
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch quiz" });
    }
}