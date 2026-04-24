import express from "express";
import { handleRegisterUser, handleLoginUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/signup", handleRegisterUser);

router.post("/login", handleLoginUser);

router.get("/check-auth", isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: true, userId: req.user.id });  // req.user = { id : ... }
});

export default router