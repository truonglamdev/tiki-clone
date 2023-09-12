import express from 'express';
import { getUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/user').get(getUser);

// module.exports = router;
export default router;
