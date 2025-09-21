import { Router } from "express";
import {
	handleRefreshToken,
	loginUser,
	logoutUser,
	registerUser,
} from "../controller/authController.js";

const router = Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/refresh_token", handleRefreshToken);
router.post('/logout', logoutUser)

export default router;
