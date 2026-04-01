import prisma from '../prismaClient.js';

export const submitAttempt = async (req, res) => {
  const userId = req.user.id; 
  const { quizId, answers } = req.body; 

  try {
    const parsedQuizId = parseInt(quizId);
    
    const questions = await prisma.question.findMany({
      where: { quizId: parsedQuizId },
    });

    let score = 0;
    
    const answerData = answers.map((ans) => {
      const question = questions.find((q) => q.id === ans.questionId);
      
      if (!question) {
        throw new Error(`Question ${ans.questionId} not found in this quiz`);
      }
      
      let selectedOptionLetter = null;
      if (question.optionA === ans.selectedOption) selectedOptionLetter = 'A';
      else if (question.optionB === ans.selectedOption) selectedOptionLetter = 'B';
      else if (question.optionC === ans.selectedOption) selectedOptionLetter = 'C';
      else if (question.optionD === ans.selectedOption) selectedOptionLetter = 'D';
      
      const isCorrect = selectedOptionLetter === question.correctOption;
      
      if (isCorrect) score++;
      
      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption, 
        isCorrect,
      };
    });

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId: parsedQuizId,
        score,
        totalQuestions: questions.length,
        completedAt: new Date(),
        answers: {
          create: answerData,
        },
      },
      include: { answers: true },
    });

    res.status(201).json(attempt);
    
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

// Get user attempts
export const getUserAttempts = async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const attempts = await prisma.quizAttempt.findMany({
            where: { userId },
            include: { quiz: true },
            orderBy: { completedAt: 'desc' } 
        });
        res.json(attempts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch attempts" });
    }
}

export const getAttemptById = async (req, res) => {
  const attemptId = parseInt(req.params.attemptId);

  try {
    const attempt = await prisma.quizAttempt.findUnique({
      where: { id: attemptId },
      include: {
        answers: { 
          include: { question: true },
          orderBy: { questionId: 'asc' }
        },
        quiz: true,
      },
    });

    if (!attempt) return res.status(404).json({ error: "Attempt not found" });

    res.json(attempt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch attempt" });
  }
};