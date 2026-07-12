import { prisma } from "../lib/prisma.js";
import * as commentModel from "./comment.js";

async function createPost(postData) {
  const post = await prisma.post.create({
    data: {
      author: { connect: { id: postData.userId } },
      pictureUrl: postData.pictureUrl != "" ? postData.pictureUrl : null,
      title: postData.title,
      text: postData.text,
      likes: 0,
    },
  });
  return post;
}

async function getPost(postId) {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  return post;
}

async function getAllPost() {
  const posts = await prisma.post.findMany();
  return posts;
}

async function likePost(postId) {
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      likes: { increment: 1 },
    },
  });
  if (post == null) {
    return { message: "Post not found" };
  }
  return post;
}

async function publishPost(postId) {
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      published: true,
    },
  });
  if (post == null) {
    return { message: "Post not found" };
  }
  return post;
}

async function updatePost(postData) {
  const post = await prisma.post.update({
    where: { id: Number(postData.id) },
    data: {
      title: postData.title,
      text: postData.text,
      pictureUrl: postData.pictureUrl != "" ? postData.pictureUrl : null,
      published: postData.published,
    },
  });
  if (post == null) {
    return { message: "Post not found" };
  }
  return post;
}

async function deletePost(postId) {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}

async function getPostByUser(userId) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: Number(userId),
    },
  });

  return posts;
}

async function getPostComment(postId) {
  const comments = await commentModel.getPostComments(postId);

  return comments;
}

export {
  createPost,
  getPost,
  getAllPost,
  likePost,
  publishPost,
  updatePost,
  deletePost,
  getPostByUser,
  getPostComment,
};
