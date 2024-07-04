const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
app.use(express.json());
app.use(morgan("dev"));

const JWT_SECRET = "secretkey1234";

require("./db");
require("./UserDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = await User.findOne({ email: email });
  if (newUser) {
    return res.send({ data: "User already exists" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
    });
   
    await newUser.save()
    res.send({ status: 200, data: "User Created" });
  } catch (error) {
    res.send({ status: 304, data: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const newUser = await User.findOne({ email: email });
  if (!newUser) {
    return res.send({ data: "User not exists" });
  }
  if (await bcrypt.compare(password, newUser.password)) {
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.send({ status: "Ok", data: token });
    } else {
      return res.send({ error: "error" });
    }
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});

// app.get("/", (req, res) => {
//   res.send({ status: "Started" });
// });

app.listen(3000, () => {
  console.log("Server is Run", 3000);
});
