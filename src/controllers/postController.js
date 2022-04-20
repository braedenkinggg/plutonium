// Import post model and custom error
const BlogPost = require("../models/BlogPost");
const APIError = require("../errors/APIError");

// Get all posts
async function getAllPosts(req, res, next) {
    try {
        const posts = await BlogPost.find().populate("author", "username");

        return res.status(200).render("index", { 
            title: "Home",
            data: posts,
        });
    } catch(err) {
        next(err);
    }
}

// Get one post
async function getOnePost(req, res, next) {
    const { postId } = req.params;

    try {
        // Check if the post exists
        const post = await BlogPost.findById(postId).populate("author", "username");
        if(!post) return next(new APIError(404, "Post not found"));

        return res.status(200).json(post);
    } catch(err) {
        next(err);
    }
}
// Create a post
async function createPost(req, res, next) {
    const { userId } = req.session;
    const { title, content, category } = req.body;

    try {
        const newPost = await BlogPost.create({ 
            author: userId,
            title: title,
            content: content,
            category: category,
        });

        return res.status(200).json(newPost);
    } catch(err) {
        return next(err);
    }
}

// Edit a post
async function editPost(req, res, next) {
    const { postId } = req.params;
    const { userId } = req.session;

    try {
        // Check if the post exists
        const post = await BlogPost.findById(postId).populate("author", "id");
        if(!post) return next(new APIError(404, "Post not found"));

        // Check if user is the post author
        const authorId = post.author.id;
        if(userId !== authorId) return next(new APIError(403, "Cannot edit other users posts"));

        // Update the post
        await post.update({ $set: req.body });
        return res.status(200).redirect("/");
    } catch(err) {
        return next(err);
    }
}

// Delete a post
async function deletePost(req, res, next) {
    const { postId } = req.params;
    const { userId } = req.session;

    try {
        // Check if the post exists
        const post = await BlogPost.findById(postId).populate("author", "id");
        if(!post) return next(new APIError(404, "Post not found"));

        // Check if user is the post author
        const authorId = post.author.id;
        if(userId !== authorId) return next(new APIError(403, "Cannot delete other users posts"));

        // Delete post
        await post.deleteOne();
        return res.status(200).json("The post has been deleted");
    } catch(err) {
        return next(err);
    }
}

module.exports = { 
    getAllPosts, 
    getOnePost,
    createPost, 
    editPost, 
    deletePost 
}