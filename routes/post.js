import { Router } from "express";
import * as postController from "../controllers/post.js";
import * as commentController from "../controllers/comment.js";

const router = Router();

router.post("/", postController.createPost);
router.get("/:postId", postController.getPost);
router.get("/", postController.getAllPosts);
router.post("/:postId/like", postController.likePost);
router.post("/:postId/publish", postController.publishPost);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);
router.get(":userId/posts", postController.getAllUserPosts);
router.get("/:postId/comments", postController.getPostComment);
router.post("/:postId/comments", commentController.createComment);

export { router as postRouter };
