
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentLikesSchema = new Schema({
    commentID: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});


// Export model
module.exports = mongoose.model("CommentLikes", CommentLikesSchema);