import express from 'express';
import passport from 'passport';
import { authGoogle } from '../controllers/authController.js';
const router = express.Router();

// router.post('/auth/google', passport.authenticate('google'), authGoogle);
// router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('api/v1/google', passport.authenticate('google', { failureRedirect: '/error' }), authGoogle);
export default router;
