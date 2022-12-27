const commentLike = require("../models/commentLikes");

// GET request to return all likes of a comment
exports.get_comment_likes = (req, res, next) => {
  commentLike
    .find({ commentID: req.params.Comment_id })
    .exec(function (err, commentlikes) {
      if (err) {
        return next(err);
      }
      res.json(commentlikes);
    });
};

// Post request to like a comment
exports.add_comment_like = (req, res, next) => {
  const newCommentLike = new commentLike({
    commentID: req.params.Comment_id,
    user: req.userId,
  });
  newCommentLike.save((err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.sendStatus(200);
    }
  });
};

//delete request to unlike a comment
exports.delete_comment_like = (req, res) => {
  commentLike.findByIdAndRemove(req.params.Comment_Like_id, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};
