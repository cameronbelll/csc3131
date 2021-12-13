import express from 'express';

import { signIn, signUp } from '../controllers/user.js';

const router = express.Router();

router.post('/signIn', signIn); //this is a post route as it is sending data (details from form) to the backend
router.post('/signup', signUp);

export default router;