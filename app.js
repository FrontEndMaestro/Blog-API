import express from "express";
import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import { postRouter } from "./routes/post.js";
import { commentRouter } from "./routes/comment.js";
import { PrismaClient, Prisma } from "./generated/prisma/client.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
  console.warn(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.json({ message: "record could not be found" });
    }
    return res.json({ message: "Database unavailable" });
  }

  res.status(500).json({
    message: "Something broke",
  });
});

app.listen(3000, (error) => {
  if (error) {
    console.warn(error);
  } else console.log("server is listening at http://localhost:3000");
});
