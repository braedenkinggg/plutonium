const { model, Schema } = require("mongoose");

const blogPostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        default: "General"
    },
});

const BlogPost = model("blogposts", blogPostSchema);

module.exports = BlogPost;