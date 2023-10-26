import express from 'express';
import passport from 'passport';
import { authGoogle } from '../controllers/authController.js';
const router = express.Router();

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }), authGoogle);

router.get('/google', passport.authenticate('google', { session: false }, { failureRedirect: '/error' }));
export default router;
