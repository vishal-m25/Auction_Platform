const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path=require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

const db =
  "mongodb+srv://auctionsystem:iO5CRjJJXOkQQJGm@cluster0.2l2bfkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(db)
  .then(() => {
    console.log("connection succcessfull");
  })
  .catch((err) => console.log(err));

const authroutes = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("connected");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authroutes);

app.listen(PORT, () => {
  console.log("Server is runnning");
});
