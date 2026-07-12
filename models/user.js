import { prisma } from "../lib/prisma.js";

async function createUser(userData) {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
  });
  return user;
}

async function findUserByName(name) {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });
  return user;
}

async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

async function getUserById(userId) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return user;
}

async function updateUser(userData) {
  const user = await prisma.user.update({
    where: {
      id: Number(userData.id),
    },
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
  });
  return user;
}

export { createUser, findUserByName, findUserByEmail, getUserById, updateUser };
