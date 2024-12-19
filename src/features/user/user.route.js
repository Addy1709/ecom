import express from 'express'


import productController from "../product/product.controller.js";
import userController from "./user.controller.js";
import { jwtAuth } from '../../middlewares/jwt.middleware.js';




const uctlr=new userController();
const userRouter=express.Router();



userRouter.post('/signup',uctlr.signUP);
userRouter.post('/signin',uctlr.signIN);
userRouter.put('/resetpassword',jwtAuth,uctlr.resetPassword);



export default userRouter;  