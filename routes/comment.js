import { Router } from "express";
const commentRouter = Router();
import * as commentController from "../controllers/comment.js";


commentRouter.put("/:commentId", commentController.updateComment);
commentRouter.delete("/:commentId", commentController.deleteComment);
commentRouter.post("/:commentId/like", commentController.likeComment);

export { commentRouter };
