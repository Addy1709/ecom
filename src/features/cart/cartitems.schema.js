import mongoose from "mongoose";

export const cartSchema=mongoose.Schema({
    prodid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    quantity:Number
})