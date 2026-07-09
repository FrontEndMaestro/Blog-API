const express = require("express");
const app = express();

app.listen(3000, (error) => {
  if (error) {
    console.warn(error);
  } else console.log("server is listening at http://localhost:3000");
});
