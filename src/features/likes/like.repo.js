import mongoose from "mongoose";
import { likeSchema } from "./likes.schema.js";
const likeModel=mongoose.model("like",likeSchema)
export class LikeRrpository{
    static async likeProduct(userid,id){
        const likeProduct=new likeModel({
            userid:userid,
            likable:id,
            type:'products'
        })
        const savedProduct=await likeProduct.save();
        return  savedProduct;

    }
    static async likeCategory(userid,id){
        const likeCategory=new likeModel({
            userid:userid,
            likable:id,
            type:'category'
        })
        const savedCat=await likeCategory.save();
        return  savedCat;

    }
}