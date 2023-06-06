import express from 'express';
import { createUser, users } from '../controllers/userController.js';

const router = express.Router();

router.post('/new/user', createUser);
router.get('/users', users);

export default router;
