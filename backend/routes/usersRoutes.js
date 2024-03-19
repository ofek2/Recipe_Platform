import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

// Routes for user authentication
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', verifyToken, UserController.logoutUser);
router.get('/current-user', verifyToken, UserController.getCurrentUser);

export default router;