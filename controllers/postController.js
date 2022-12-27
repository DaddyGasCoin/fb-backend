const Post = require("../models/post");

//GET request for all posts of user
exports.post_detail = (req, res, next) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .exec(function (err, details) {
      if (err) {
        return next(err);
      }
      res.json(details);
    });
};

// Post request to add a new post
exports.add_post = (req, res, next) => {
  const newPost = new Post({
    date: new Date(),
    message: req.body.message,
    user: req.userId,
  });
  newPost.save((err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.sendStatus(200);
    }
  });
};
