import express from 'express';
import {registerController, loginController, testController} from '../controllers/authUser.controller.js';
import { isAdmin, requireSignIn } from '../middlewares/authUser.middleware.js';

const userRouter = express.Router();

////ROUTES

//Register route
userRouter.post('/register', registerController);

//Login route
userRouter.post('/login', loginController);

//Test route
userRouter.get('/test', requireSignIn, isAdmin, testController);

export default userRouter;