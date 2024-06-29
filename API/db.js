const mongoose = require("mongoose");

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
