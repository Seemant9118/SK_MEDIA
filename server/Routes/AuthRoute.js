import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";
// establishing routing By express.Router()
const router = express.Router();

router.post('/register' , registerUser);

router.post('/login' , loginUser);

export default router