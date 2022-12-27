const Comment = require("../models/comment");

// GET request to return all comments of a post
exports.get_comments = (req, res, next) => {
  Comment.find({ postID: req.params.Post_id })
    .sort({ date: -1 })
    .exec(function (err, likes) {
      if (err) {
        return next(err);
      }
      res.json(likes);
    });
};

// Post request to add a new comment on a post
exports.add_comment = (req, res, next) => {
  const newComment = new Comment({
    date: new Date(),
    message: req.body.message,
    postID: req.params.Post_id,
    user: req.userId,
  });
  newComment.save((err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.sendStatus(200);
    }
  });
};

//delete request to remove a comment from a post
exports.delete_comment = (req, res) => {
  Comment.findByIdAndRemove(req.params.Comment_id, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};
