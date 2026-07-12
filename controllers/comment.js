import * as commentModel from "../models/comment.js";
import passport from "passport";
import { body, matchedData, validationResult } from "express-validator";

const validations = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Comment can not be empty")
    .escape(),
];

const createComment = [
  passport.authenticate("jwt", { session: false }),
  validations,
  async function (req, res) {
    console.log("Current User in Session", req.user);
    const userId = req.user.id;
    const postId = req.params.postId;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }
    const { text } = matchedData(req);

    const comment = await commentModel.createComment(postId, userId, text);
    res.json({ comment });
  },
];

const updateComment = [
  validations,
  async function (req, res) {
    const commentId = req.params.commentId;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }
    const { text } = matchedData(req);

    const comment = await commentModel.updateComment({ id: commentId, text });
    res.json({ comment });
  },
];

async function deleteComment(req, res) {
  await commentModel.deleteComment(req.params.commentId);
  res.json({ message: "Comment deleted successfully" });
}

async function likeComment(req, res) {
  const comment = await commentModel.likeComment(req.params.commentId);
  res.json({ comment });
}

export { createComment, updateComment, deleteComment, likeComment };
