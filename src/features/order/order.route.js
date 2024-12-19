import OrderController from "./order.cltr.js";
import express from 'express';

 


const ordrRouter=express.Router();
const orderctlrr=new OrderController();

ordrRouter.post("/",orderctlrr.PlaceOrder);

export default ordrRouter;