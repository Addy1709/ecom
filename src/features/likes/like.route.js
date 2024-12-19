import express from 'express'
import { LikeController } from './like.ctlrr.js';

const likectlrr = new LikeController();
const likeRouter = express.Router();

likeRouter.post('/', likectlrr.likeItem);


export default likeRouter; 