
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100, minLenth: 1 },
    last_name: { type: String, required: true, maxLength: 100, minLenth: 1 },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true, minLength: 4 },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', }],
    friend_requests: [{ type: Schema.Types.ObjectId, ref: 'User', }],
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        collation: {
            locale: 'en',
            strength: 2
        },
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    }

})


// Export model
module.exports = mongoose.model("User", UserSchema);