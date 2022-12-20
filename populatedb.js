#! /usr/bin/env node

const { faker } = require('@faker-js/faker');
const async = require('async');
require('dotenv').config()

const mongoose = require('mongoose');
var mongoDB = process.env.api_key;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const User = require('./models/user');
const Post = require('./models/post');
const Likes = require('./models/likes');
const CommentLikes = require('./models/commentLikes');
const Comment = require('./models/comment');

// generate fake data for the User model
const arr = ['male', 'female', 'other']
const generateFakeUser = () => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    dateOfBirth: faker.date.past(50, new Date()),
    password: faker.internet.password(),
    email: faker.internet.email(),
    gender: arr[Math.floor(Math.random() * arr.length)]
});

// generate fake data for the Post model
const generateFakePost = (userId) => ({
    date: faker.date.recent(5),
    message: faker.lorem.sentences(3),
    user: userId
});

// generate fake data for the Likes model
const generateFakeLike = (postId, userId) => ({
    postID: postId,
    user: userId
});

// generate fake data for the CommentLikes model
const generateFakeCommentLike = (commentId, userId) => ({
    commentID: commentId,
    user: userId
});

// generate fake data for the Comment model
const generateFakeComment = (postId, userId) => ({
    date: faker.date.recent(5),
    message: faker.lorem.sentences(3),
    postID: postId,
    user: userId
});


// Store Users in db
async function createUsers(users) {
    User.create(users, function (error, createdUsers) {
        if (error) {
            console.error(error);
        } else {
            console.log(`Successfully created ${createdUsers.length} users.`);
            createPosts(createdUsers)
        }
    })

}

// Store posts in db
async function createPosts(users) {
    let posts = []
    for (let i = 0; i < 100; i++) {
        posts.push(generateFakePost(users[Math.floor(Math.random() * users.length)]._id))
    }
    Post.create(posts, function (error, createdPosts) {
        if (error) {
            console.error(error);
        } else {
            console.log(`Successfully created ${createdPosts.length} posts.`);
            createLikes(createdPosts, users)
            createComments(createdPosts, users)
        }
    })

}

// store comments in db
async function createComments(posts, users) {
    console.log('Creating comments')
    let comments = []
    for (let i = 0; i < 200; i++) {
        const id = posts[Math.floor(Math.random() * posts.length)]._id
        const uid = users[Math.floor(Math.random() * users.length)]._id
        comments.push(generateFakeComment(id, uid))
    }
    Comment.create(comments, function (error, createdComments) {
        if (error) {
            console.error(error);
        } else {
            console.log(`Successfully created ${createdComments.length} comments.`);
            console.log('Creating likes for comments')
            createCommentLikes(createdComments, users)
        }
    })
}


async function createLikes(posts, users) {
    console.log('creatng likes for posts')
    let likes = []
    posts.forEach(post => {
        const iterations = Math.floor(Math.random() * ((users.length - 1) - 10)) + 10
        for (let i = 0; i <= iterations; i++) {
            likes.push(generateFakeLike(post._id,
                users[Math.floor(Math.random() * users.length)]._id))
        }
    });
    Likes.create(likes, function (error, createdLikes) {
        if (error) {
            console.error(error);
        } else {
            console.log(`Successfully created ${createdLikes.length} likes for posts.`);
        }
    })

}

async function createCommentLikes(comments, users) {
    let likes = []
    comments.forEach(post => {
        const iterations = Math.floor(Math.random() * ((users.length - 1) - 10)) + 10
        for (let i = 0; i <= iterations; i++) {
            likes.push(generateFakeCommentLike(post._id,
                users[Math.floor(Math.random() * users.length)]._id))
        }
    });

    CommentLikes.create(likes, function (error, createdCommentLikes) {
        if (error) {
            console.error(error);
        } else {
            console.log(`Successfully created ${createdCommentLikes.length} likes for comments.`);
        }
    })
}

const users = [];
for (let i = 0; i < 50; i++) {
    users.push(generateFakeUser());
}

async function generateData() {
    createUsers(users)
}

generateData()

