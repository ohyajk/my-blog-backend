import PostModel from "../models/postModel.js";
import Comment from '../models/commentModel.js';
import mongoose from "mongoose";

const createComment = async (req, res) => {
    const { postId, content, user } = req.body;

    try {
        // Create a new comment
        const comment = new Comment({ content, postId, user });

        // Save the comment
        await comment.save();

        // Update the post's comments array with the comment's reference
        await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, {
            new: true
        });

        return res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create comment', error });
    }
};

export default createComment;