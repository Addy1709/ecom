import mongoose from "mongoose";

export const likeSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,    // The ID of the user who liked something
        ref: 'users'    // References the 'users' collection for user details
    },
    likable: {
        type: mongoose.Schema.Types.ObjectId,    // The ID of the item being liked
        ref: 'types'    // References the appropriate collection (e.g., products or categories)
        //other ta tat will not be accpted
    },
    types: {
        type: String,
            // Specifies what is being liked: either 'products' or 'category'
        // When making a POST request, choose either 'products' or 'category' to indicate the type of item being liked
    }
    ///here are pre and post 'mongoose' middleware
}).pre('save',()=>{
    console.log("before save action");
    next();//move on to schema process
}).post('save',()=>{
    console.log("after save action");
    ///no next here the process in done already
    //me to bad me aya hu

});
//not only save 