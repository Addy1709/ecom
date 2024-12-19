import mongoose from "mongoose";
export const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    desc:String,
    stock:Number,
    categories:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
        }
    ]
})