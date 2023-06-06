import PostModel from '../models/postModel.js';

// Controller Creating a new post
export const createPost = async (req, res) => {
    try {
        const { title, category, description, postText, imageLink, author } = req.body;

        const newPost = new PostModel({
            title,
            category,
            description,
            postText,
            imageLink,
            author
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });

    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Controller function for getting all posts
export const getAllPosts = async (req, res) => {

    try {
        const posts = await PostModel.find();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
};

// Controller function for retrieving a post by ID
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'User'
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post', error: error.message });
    }
};


// Controller function for updating a post by ID
export const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description, postText } = req.body;

        const post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = title;
        post.category = category;
        post.description = description;
        post.postText = postText;

        const updatedPost = await post.save();
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

// Controller function for deleting a post by ID
export const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};
