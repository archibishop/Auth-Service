import express from 'express';
import AuthController from '../controllers/authController';
import ValidationMiddleware from '../middleware/validationMiddleware';

const router = express.Router();

// Get users
router.get('/api/v1/users', AuthController.getUsers);

// Create users
router.post('/api/v1/users', ValidationMiddleware, AuthController.createUser);

// Activate user account
router.get('/api/v1/users/activate/:id', AuthController.activateAccount);

// Login user
router.post('/api/v1/users/login', ValidationMiddleware, AuthController.loginUser);

// Reset password
router.post('/api/v1/users/reset-password', ValidationMiddleware, AuthController.resetPassword);

export default router;
