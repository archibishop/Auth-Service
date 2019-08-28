import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();

// Get users
router.get('/api/v1/users', AuthController.getUsers);

// Create users
router.post('/api/v1/users', AuthController.createUser);

// Activate user account
router.get('/api/v1/users/activate/:id', AuthController.activateAccount);

// login user
router.post('/api/v1/users/login', AuthController.loginUser);

export default router;
