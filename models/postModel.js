import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        default: 'https://placehold.co/1920x1080/9c3765/e84e89.png?font=montserrat&text=MY-BLOG',
    },
    postText: {
        type: String,
        required: true,
        maxlength: 3000,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;