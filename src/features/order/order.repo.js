import { ObjectId } from "mongodb";
import OredrModel from "./order.mdl.js";
import { getDB } from "../../config/mongodb.js";

export default class OrderRepositary{
    static async placeOrder(userId){
        //get items from cart and calculate the total price
       const items= await this.getTotalAmount(userId);
       const TotalFInalPrice=items.reduce((sum,item)=>sum+item.totalPrice,0);
       const db=getDB(); 
       
        //create the order record 
        const newOrder=new OredrModel(new ObjectId(userId),TotalFInalPrice,new Date());
        await db.collection("orders").insertOne(newOrder);
        //reduce the stock
        for(let item of items){
            await db.collection('products').updateOne(
                {_id:item.prodid},
                {$inc:{stock:-item.quantity}}
            )
        }
        //clear the cart
        //  await db.collection('cartitems').deleteMany(
        //     {userId:new ObjectId(userId)}
        //  )
         return;
    }

    static async getTotalAmount(userId){
        // ProductRepository.price.totalamount 
        const db=getDB(); 
        const items=await db.collection('cartitems').aggregate([
            { 
                $match:{userid:new ObjectId(userId)}
            },
            //get the matched products from collections
            {
                //we link two tables here 
                $lookup:{
                    from:"products",
                    localField:"prodid",   //primry key same and in below 
                    foreignField:"_id",   // foreign key
                    as:"ProductInfo"   //outputs as an array
                }   //prodid as in products _id in cart items (same)
            },
            {
                $unwind:"$ProductInfo"   //we unwind it here
            },
            {
                $addFields:{
                    "totalPrice":{
                        $multiply:["$ProductInfo.price","$quantity"]
                    }
                }
            }
        ]).toArray();
        // console.log(items);
        

        const TotalFInalPrice=items.reduce((sum,item)=>sum+item.totalPrice,0);
        // console.log(TotalFInalPrice);
        return items;
        

    }
}