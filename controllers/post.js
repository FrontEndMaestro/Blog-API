import { body, matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import * as postModel from "..//models/post.js";
import * as userModel from "..//models/user.js";
import { CustomAuthorizationError } from "../errors/CustomAuthorizationError.js";
import { json } from "express";

const validations = [
  body("title").trim().notEmpty().withMessage("Title can not be empty"),
  body("text").trim().notEmpty().withMessage("Post text can not be empty"),
];

const createPost = [
  passport.authenticate("jwt", { session: false }),
  validations,
  async (req, res) => {
    let postData = {
      userId: req.user.id,
      pictureUrl: req.body.pictureUrl,
      title: req.body.title,
      text: req.body.text,
    };

    const post = await postModel.createPost(postData);
    res.status(200).json({ post });
  },
];

async function getPost(req, res) {
  const postId = req.params.postId;

  const post = await postModel.getPost(postId);
  if (!post) {
    return res.json({ message: "Post not found" });
  }
  res.json(post);
}

async function getAllPosts(req, res) {
  const posts = await postModel.getAllPost();
  res.json(posts);
}

async function likePost(req, res) {
  const postId = req.params.postId;
  console.log(postId);
  const post = await postModel.likePost(postId);
  res.json(post);
}

const publishPost = [
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const postId = req.params.postId;
    const getPost = await postModel.getPost(postId);
    if (getPost.authorId == req.user.id) {
      const post = await postModel.publishPost(postId);
      res.json(post);
    } else {
      throw new CustomAuthorizationError("Access denied");
    }
  },
];

const updatePost = [
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const postId = req.params.postId;
    const getPost = await postModel.getPost(postId);
    if (getPost.authorId == req.user.id) {
      const postData = {
        id: req.params.postId,
        title: req.body.title,
        text: req.body.text,
        pictureUrl: req.body.pictureUrl,
        published: req.body.published,
      };

      const post = await postModel.updatePost(postData);
      res.json({ message: "Post updated Sucessfully" });
    } else {
      throw new CustomAuthorizationError("Access denied");
    }
  },
];

const deletePost = [
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const postId = req.params.postId;
    const getPost = await postModel.getPost(postId);
    if (getPost.authorId == req.user.id) {
      const postId = req.params.postId;
      await postModel.deletePost(postId);
      res.json({ message: "post delete successfully" });
    } else {
      throw new CustomAuthorizationError("Access denied");
    }
  },
];

async function getAllUserPosts(req, res) {
  const userId = req.params.userId;
  const posts = await postModel.getPostByUser(userId);
  res.json({ posts });
}

async function getPostComment(req, res) {
  const comments = await postModel.getPostComment(req.params.postId);
  res.json( comments );
}

export {
  createPost,
  getPost,
  getAllPosts,
  likePost,
  publishPost,
  updatePost,
  deletePost,
  getAllUserPosts,
  getPostComment,
};
