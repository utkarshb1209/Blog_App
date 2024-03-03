const express = require("express");
const mongoose = require("mongoose");
const authroute = require("./routes/auth");
const userroute = require("./routes/user");
const postroute = require("./routes/post");
const categoryroute = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authroute);
app.use("/api/users", userroute);
app.use("/api/post", postroute);
app.use("/api/categories", categoryroute);
app.listen(5000, () => {
  console.log("server is listening...");
});
