

import express from 'express';
import cartItemsController from './cartitems.controller.js';



//crate raouter
const cartRouter=express.Router();//a router is what links everything 
const cartctlrr=new cartItemsController();

cartRouter.delete('/:id',cartctlrr.delete);   //pass id in params to delete
cartRouter.post('/',cartctlrr.add);  //post add
cartRouter.get('/',cartctlrr.get);



export default cartRouter;