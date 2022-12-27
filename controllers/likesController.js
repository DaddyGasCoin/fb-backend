const Like = require("../models/likes");

// GET request to return all likes of a post
exports.get_likes = (req, res, next) => {
  Like.find({ postID: req.params.Post_id }).exec(function (err, likes) {
    if (err) {
      return next(err);
    }
    res.json(likes);
  });
};

// Post request to add a new like on a post
exports.add_like = (req, res, next) => {
  const newLike = new Like({
    postID: req.params.Post_id,
    user: req.userId,
  });
  newLike.save((err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.sendStatus(200);
    }
  });
};

//delete request to unlike a post
exports.delete_like = (req, res) => {
  Like.findByIdAndRemove(req.params.Like_id, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};
