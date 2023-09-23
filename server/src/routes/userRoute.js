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
    updatePassword,
} from '../controllers/userController.js';
import { authMiddleware, authUserMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/auth/register').post(createUser);
router.route('/auth/login').post(loginUser);
router.route('/auth/logout').post(logoutUser);
router.route('/user/:id').put(authUserMiddleware, updateUser);
router.route('/user/:id').delete(authMiddleware, deleteUser);
router.route('/user/:id').get(authUserMiddleware, getDetailUser);
router.route('/users').get(authMiddleware, getAllUsers);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update/:id').put(authUserMiddleware, updatePassword);
router.route('/refresh-token').post(refreshToken);

export default router;
