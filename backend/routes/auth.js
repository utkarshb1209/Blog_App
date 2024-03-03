const app = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    const hashpass = await bcrypt.hash(req.body.password, 10);
    newUser.password = hashpass;
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ msg: "user not found" });
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(404).json({ msg: "password incorrect" });

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = app;
