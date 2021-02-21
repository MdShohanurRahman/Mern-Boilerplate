const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Model
const Post = mongoose.model('Posts', PostSchema)
module.exports = Post
