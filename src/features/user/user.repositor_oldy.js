

//we handle all the user database things here 
//aall model functions which interaact with external DB

import { getDB } from "../../config/mongodb.js";


export default class UserRepository{

//newUser is object 
    static async signUP(newUser) {
        try {
            const db = getDB(); // Get the database connection
            const collection = db.collection('users'); // Get the 'users' collection (singular)
    
            // Create a new user instance using the userModel
            // const newUser = new userModel(name, email, pass, type);
    
            // Insert the new user into the 'users' collection
            await collection.insertOne(newUser);
    
            return newUser;
        } catch (err) {
            // Throw an ApplicationError if something goes wrong
            throw new ApplicationError("Something went wrong", 500);
        }
    }


///DB
    static async signIN(email,pass){
        try{
            const db=getDB();
            const collection=db.collection('users');
            return await collection.findOne({email,pass}) //find in DB
        }catch(err){
            console.log(err);
        }
    }

    static async findByEmail(email){
        try{
            const db=getDB();
            const collection=db.collection('users');
            const user= await collection.findOne({email})
            
            return user;
             //find in DB
        }catch(err){
            console.log(err);
        }
    } 
}