import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { MyApplicationError } from "../../error-handler/applicationError.js";
 
export default class CartItemRepository{
    //add to cart
    static async add(prodid,userid,quantity){
        try {
            const db = getDB(); // Get the database connection
            const collection = db.collection('cartitems'); // Get the 'cartitems' collection (singular)
            //find 
            //either  update or insert
            const counterid =await this.getnextCounter(db);
            const x=await collection.updateOne(
                {prodid:new ObjectId(prodid),userid:new ObjectId(userid)},
                {$setOnInsert:{_id:counterid},$inc:{quantity:quantity}},
                {upsert:true}//if true update if false insert

            )
            return "item added sucessfully";
            
        } catch (err) {
            // Throw an ApplicationError if something goes wrong
            throw new MyApplicationError("Something went wrong", 500);
        }
    }
    // get from cart ALL
    
    static async get(userid){
        try {
            const db = getDB(); // Get the database connection
            const collection = db.collection('cartitems'); // Get the 'cartitems' collection (singular)
            return await collection.find({userid:new ObjectId(userid)}).toArray();
      // 'cartitems' me se wo products lao jaha ye userid hai
            
        } catch (err) {
            // Throw an ApplicationError if something goes wrong
            throw new MyApplicationError("Something went wrong", 500);
        }
    }
    // delete from  
    static async delete(userid,cartitemID){
        try {
            const db = getDB(); // Get the database connection
            const collection = db.collection('cartitems'); // Get the 'cartitems' collection (singular)
            const result=await collection.deleteOne({_id:new ObjectId(cartitemID),userid:new ObjectId(userid)})
            return result.deletedCount>0;//true or false
      
            
        } catch (err) {
            // Throw an ApplicationError if something goes wrong
            throw new MyApplicationError("Something went wrong", 500);
        }
    }
    static async getnextCounter(db){
        const result =await db.collection('counters').findOneAndUpdate({_id:'cartitems'},
            {$inc:{value:1}},
            {returnDocument:"after"}//return after cahanges
            
        )
        console.log("counter log",result);
        return result.value;  
    }
    

}