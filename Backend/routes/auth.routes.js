import {Register, Login, getUserProfile} from "../controllers/auth.controller.js";
import express from "express";
import { getUserProfile } from './../controller/auth.controller';

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/profile", getUserProfile);

export default router;