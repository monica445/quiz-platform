
import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js"


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/attemps", attemptRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});