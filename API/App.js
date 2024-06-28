const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcryptjs")
app.use(express.json())
const mongoUrl =
  "mongodb+srv://moricua10:admin9210@cluster0.evvah8i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("database Connected");
  })
  .catch((e) => {
    console.log(e);
  });
require("./UserDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: "User already exists" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10)

  try {
    await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
    });
    res.send({ status: 200, data: "User Created" });
  } catch (error) {
    res.send({ status: 304, data: "error" });
  }
});

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.listen(3000, () => {
  console.log("Server is Run");
});
