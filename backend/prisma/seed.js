import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "General Knowledge Quiz",
      description: "Test your general knowledge!",
      questions: {
        create: [
          {
            questionText: "What is the capital of France?",
            optionA: "Paris",
            optionB: "Berlin",
            optionC: "Rome",
            optionD: "Madrid",
            correctOption: "A",
          },
          {
            questionText: "Who wrote 'Hamlet'?",
            optionA: "Charles Dickens",
            optionB: "William Shakespeare",
            optionC: "Jane Austen",
            optionD: "Mark Twain",
            correctOption: "B",
          },
        ],
      },
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Math Quiz",
      description: "Simple math questions",
      questions: {
        create: [
          {
            questionText: "What is 5 + 7?",
            optionA: "12",
            optionB: "10",
            optionC: "14",
            optionD: "13",
            correctOption: "A",
          },
        ],
      },
    },
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });