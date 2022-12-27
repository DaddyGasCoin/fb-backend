#! /usr/bin/env node

const User = require("./models/user");
require("dotenv").config();

// Connect to the database

const mongoose = require("mongoose");
var mongoDB = process.env.api_key;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Find all user documents
User.find({}, (err, users) => {
  if (err) {
    console.error(err);
  } else {
    // Update each user's friends array with a random set of friends
    users.forEach((user) => {
      // Find a random set of friends
      User.aggregate([{ $sample: { size: 12 } }], (error, friends) => {
        if (error) {
          console.error(error);
        } else {
          // Extract the friend IDs
          const friendIds = friends.map((friend) => friend._id);
          // Update the user document
          User.updateOne(
            { _id: user._id },
            { $addToSet: { friends: { $each: friendIds } } },
            (updateError, res) => {
              if (updateError) {
                console.error(updateError);
              } else {
                console.log(res);
              }
            }
          );
        }
      });
    });
  }
});
