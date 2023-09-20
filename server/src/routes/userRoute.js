import express from 'express';
import {
    createUser,
    loginUser,
    refreshToken,
    updateUser,
    deleteUser,
    getDetailUser,
    getAllUsers,
    logoutUser,
    forgotPassword,
    resetPassword,
} from '../controllers/userController.js';
import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/auth/register').post(createUser);
router.route('/auth/login').post(loginUser);
router.route('/user/:id').put(authUserMiddleware, updateUser);
router.route('/user/:id').delete(authMiddleware, deleteUser);
router.route('/user/:id').get(authUserMiddleware, getDetailUser);
router.route('/users').get(authMiddleware, getAllUsers);
router.route('/refresh-token').post(refreshToken);
router.route('/auth/logout').post(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

export default router;
