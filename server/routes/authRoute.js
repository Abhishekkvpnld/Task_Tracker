import express from "express";
import { login, logout, signUp } from "../controllers/auth.js";
import { authToken } from "../middleware/jwtAuth.js";
import { userDetails } from "../controllers/project.js";
const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.post("/logout", authToken, logout);
router.get("/getuser", authToken, userDetails);

export default router;
