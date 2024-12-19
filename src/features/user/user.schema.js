// 


import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    hashedpassword: String, // No validation needed here
    type: { 
        type: String, 
        enum: ["seller", "customer"] 
    }
});
