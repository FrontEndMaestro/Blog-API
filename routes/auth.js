import { Router } from "express";
import * as authController from "../controllers/auth.js";

const router = Router();

router.post("/tokens", authController.logIn);

export { router as authRouter };
