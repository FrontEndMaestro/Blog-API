import { Router } from "express";
import * as userController from "../controllers/user.js";

const router = Router();

router.post("/", userController.Signup);

router.get("/:userId", userController.getUser);

export { router as userRouter };
