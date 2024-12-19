import { getDB } from "../../config/mongodb.js";
// import ApplicationError from '../err'
export default class userModel{

    constructor(name,email,hashedpassword,type){
        this.name=name;
        this.email=email;
        this.hashedpassword=hashedpassword;
        this.type=type;
        // this.id=id;
    }
/////changes made in DB session
    //this is usermodel sign up (differet )
    static async signUP(name, email, hashedpassword, type) {
        try {
            const db = getDB(); // Get the database connection
            const collection = db.collection('users'); // Get the 'users' collection (singular)
    
            // Create a new user instance using the userModel
            const newUser = new userModel(name, email, hashedpassword, type);
    
            // Insert the new user into the 'users' collection
            await collection.insertOne(newUser);

            //new functnality if the email is already usd
    
            return newUser;
        } catch (err) {
            // Throw an ApplicationError if something goes wrong
            // throw new ApplicationError("Something went wrong", 500);
            console.log(err);
            
        }
    }  
    

    static signIN(email,pass){
        const user=userARR.find((user)=>user.email==email && user.pass==pass)
        return user;
    }
    static getAll(){
        return userARR;
    }
    
}




var userARR=[
    {
        id:1,
        name:"Mr BOB",
        email:"bob@gmail.com",
        pass:"1234",
        type:"seller"
    }
]