// require("dotenv").config();
require("./utils/db");
const express = require("express");
const cors = require("cors");
const router = require("./router/userRouter");
const app = express();
const port = 1200;

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("welcome to new Api....!!!");
});

app.listen(port, () => {
  console.log("server is now listening...!!!!!");
});
