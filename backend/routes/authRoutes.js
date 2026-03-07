import express from "express";
import authRoute from '../controllers/authController.js'
const router = express.Router();

router.post("/register", authRoute.register);
router.post("/login", authRoute.login);

router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

export default router;