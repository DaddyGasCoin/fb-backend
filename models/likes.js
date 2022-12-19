
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikesSchema = new Schema({
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});


// Export model
module.exports = mongoose.model("Likes", LikesSchema);