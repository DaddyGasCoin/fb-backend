
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    date: { type: Date, required: true },
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

});


// Export model
module.exports = mongoose.model("Post", PostSchema);