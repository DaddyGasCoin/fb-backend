var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const likes_controller = require("../controllers/likesController");
const comment_controller = require("../controllers/commentController");
const comment_like_controller = require("../controllers/commentLikesController");
const verifyJWT = require("../verifytoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//signup route
router.post("/signup", user_controller.user_create);

//Login route
router.post("/login", user_controller.user_login);

//get users home page
router.get("/home/", verifyJWT, user_controller.user_feed);

//user create's a post
router.post("/post/create", verifyJWT, post_controller.add_post);

//get all posts of a user
router.get("/get_posts/:user_id", verifyJWT, user_controller.user_detail);

/* ROUTES FOR LIKES ON A POST*/

// user like a post
router.post("/like_post/:Post_id/", verifyJWT, likes_controller.add_like);

// user unlikes a post
router.delete(
  "/unlike_post/:Like_id/",
  verifyJWT,
  likes_controller.delete_like
);

// get all likes of a post
router.get("/likes/:Post_id/", verifyJWT, likes_controller.get_likes);

/*ROUTES FOR COMMENTS ON A POST*/

// create comment on a post
router.post(
  "/create_comment/:Post_id/",
  verifyJWT,
  comment_controller.add_comment
);

// delete comment on a post
router.delete(
  "/delete_comment/:Comment_id/",
  verifyJWT,
  comment_controller.delete_comment
);

// get all comments of a post
router.get("/comments/:Post_id/", verifyJWT, comment_controller.get_comments);

/* ROUTES FOR COMMENT LIKES  */

// create like on a comment
router.post(
  "/like_comment/:Comment_id/",
  verifyJWT,
  comment_like_controller.add_comment_like
);
// delete like on a comment
router.post(
  "/unlike_comment/:Comment_Like_id/",
  verifyJWT,
  comment_like_controller.delete_comment_like
);
// get all likes of a comment
router.get(
  "/comment_likes/:Comment_id/",
  verifyJWT,
  comment_like_controller.get_comment_likes
);

module.exports = router;
