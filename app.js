import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, (error) => {
  if (error) {
    console.warn(error);
  } else console.log("server is listening at http://localhost:3000");
});
