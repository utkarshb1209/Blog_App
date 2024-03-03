const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(401).json({ msg: "you can only change your account" });
    }
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    if (req.params.id === req.body.userId) {
      const user = await User.findById(req.params.id);
      if (user == null)
        return res.status(200).json({ msg: "Account does not exist" });

      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) return res.status(401).json({ msg: "password is incorrect" });

      await Post.deleteMany({ username: req.body.username });
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ msg: "account deleted" });
    } else {
      res.status(401).json("you can only delete your account");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) return res.status(200).json({ msg: "user not found" });
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
