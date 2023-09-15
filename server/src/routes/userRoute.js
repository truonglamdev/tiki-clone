import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/auth/register').post(createUser);
router.route('/auth/login').post(loginUser);

export default router;
