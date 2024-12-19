import mongoose from "mongoose";
export const reviewSchema=mongoose.Schema({
    prodid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    rating:Number
})