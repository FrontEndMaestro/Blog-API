import { prisma } from "../lib/prisma.js";

async function createComment(postId, userId, text) {
  const comment = await prisma.comment.create({
    data: {
      author: { connect: { id: Number(userId) } },
      post: { connect: { id: Number(postId) } },
      text,
      likes: 0,
    },
  });

  return comment;
}

async function updateComment(commentData) {
  const comment = await prisma.comment.update({
    where: {
      id: Number(commentData.id),
    },
    data: {
      text: commentData.text,
    },
  });
  return comment;
}

async function deleteComment(commentId) {
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
}

async function likeComment(commentId) {
  const comment = await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      likes: { increment: 1 },
    },
  });
  return comment;
}

async function getPostComments(postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
  });
  return comments;
}

export {
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  getPostComments,
};
