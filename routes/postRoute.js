import express from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controllers/postController.js'
import authenticate from '../auth.js';

const router = express.Router();

// Routes
router.post('/new/post', createPost);
router.get('/posts', getAllPosts);
router.get('/post/:id', getPostById);
router.put('/put/post/:id', updatePostById);
router.delete('/del/post/:id', deletePostById);

// Export the router
export default router;