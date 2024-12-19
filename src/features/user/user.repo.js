import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

///we are gonna convert model to mongose schema
const userModel=mongoose.model('users',userSchema)//pass collectin ans structure

export default class UserRepository{

    //newUser is object 
        static async signUP(newUser) {
            try{
                const user =new userModel(newUser);//create the structure using  the schema

                await user.save();
                return user;
            }catch(err){
                console.log(err);
                
            }
        }
        static async findByEmail(email) {
            try{
               
                return await userModel.findOne({email});
            }catch(err){
                console.log(err);
                
            }
        }

        static async resetPassword(userId, hashedPassword) {
            try {
                let userFound = await userModel.findById(userId);
                if (userFound) {
                    userFound.hashedpassword = hashedPassword; // You might want to make sure this matches the field in your schema.
                    await userFound.save(); // Ensure this is awaited.
                    // console.log("Password updated successfully");
                } else {
                    throw new Error("User not found");
                }
            } catch (err) {
                console.log(err);
                throw err; // Throwing the error so the controller can handle it
            }
        }
        
        

    }










///new user is a object we passs to  the function