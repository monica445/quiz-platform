import express from "express";
import authRoute from '../controllers/authController.js'
const router = express.Router();

router.post("/register", authRoute.register);
router.post("/login", authRoute.login);

export default router;