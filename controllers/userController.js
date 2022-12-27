const User = require("../models/user");
const Posts = require("../models/post");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// post request to create user
exports.user_create = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().required().max(100).min(1),
    last_name: Joi.string().required().max(100).min(1),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().required().min(4),
    email: Joi.string().email().required(),
    gender: Joi.string().valid("male", "female", "other").default("other"),
  });

  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    res.status(400).json({ result });
  } else {
    //Validation succesfull
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(arr);
      }
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
      }).save((err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ err: err });
        } else {
          res.sendStatus(200);
        }
      });
    });
  }
};

//POST request to login user
exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ user: user._id }, process.env.secret_key, {
      expiresIn: 86400, // expires in 24 hours
    });
    const options = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    };
    res.cookie("jwt", token, options);
    res.sendStatus(200);
  });
};

// get request for home feed
exports.user_feed = (req, res, next) => {
  User.findById(req.userId, "friends", (err, user) => {
    if (err) {
      return next(err);
    }
    Posts.find({ user: { $in: user.friends } })
      .sort({ date: -1 })
      .exec((err, posts) => {
        if (err) {
          return next(err);
        }
        res.json(posts);
      });
  });
};

// get request to get all posts of user
exports.user_detail = (req, res, next) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};
