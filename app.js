import express from "express";
import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something broke",
  });
});

app.listen(3000, (error) => {
  if (error) {
    console.warn(error);
  } else console.log("server is listening at http://localhost:3000");
});
