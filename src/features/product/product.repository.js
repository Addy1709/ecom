import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { MyApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const productModel=mongoose.model("products",productSchema)
const reviewModel=mongoose.model("review",reviewSchema)
const categoryModel=mongoose.model("category",categorySchema)
export default class ProductRepository{

    //add new product
 
    static async add(newProd){
        try {
            //add prod into the collection 'products'
            // console.log(newProd);
            newProd.categories=newProd.category.split(',');//arr ret
            const product=new productModel(newProd);
            const result=await product.save();   
            //update category
            await categoryModel.updateMany(
                {_id:{$in:newProd.categories}},
                {$push:{products:result._id}}//array in record push in that array
            )
            
        } catch (err) {
            // Throw an ApplicationError if something goes wrong
            throw new MyApplicationError("Something went wrong", 500);
        }
    }
    //fetch all product

   // Fetch all products from the database
static async getAll() {
    try { 
        const db = getDB();
        const collection = db.collection('products');
        const products = await collection.find().toArray(); // Fetch products and convert json to array
        console.log(products); // Log the fetched products
        return products;
    } catch (err) {
        console.error("Error fetching products:", err);
        throw new Error("Failed to fetch products"); // Handle errors appropriately
    } 
}

    // fetch spercific product 
    static async getOne(id){
        try {
            const db = getDB();
            const collection = db.collection('products');
            const prod = await collection.findOne({_id:new ObjectId(id)});
            // console.log(prod); //log found product
            
           return prod;
        } catch (err) {
            
            throw new MyApplicationError("Failed to fetch products",500); // Handle errors appropriately
        }
    }

 
    //filter fun
    static async filter(minprice,category){
       try{
        const db = getDB();
        const collection = db.collection('products');
        //this is a condition we pas to DB finder
        let filterExpression={}
        if(minprice){
            filterExpression.price={$gte:parseFloat(minprice)}//add
            //creates price in side first
        }
        // if(maxprice){
        //     filterExpression.price={...filterExpression.price,$lte:parseFloat(maxprice)}
        //     // dont overwrite pass to next 
        // }
        if(category){
            filterExpression={$and:[{category:category},filterExpression]};//add
            //creates price in side first
        }
        return  await collection.find(filterExpression).project({name:1,price:1,category:1,_id:0}).toArray()    

       }catch(err){
        console.error("Error fetching products:", err);
       }
    }

    //Rate products
    static async rateProducts(userid,prodid,rating){
        
        try {
            const product=await productModel.findById(prodid)
                if(!product){
                    throw new Error("Product not found");
                    
                }
                const userreview=await reviewModel.findOne({prodid:prodid,userid:userid})
            
            if(userreview){
                userreview.rating=rating;
                userreview.save();
            }else{
                const newReview=new reviewModel({
                    prodid: prodid,
                    userid: userid,
                    rating:rating
                });
                newReview.save();
            }
            // const db = getDB();
            // const collection = db.collection('products');
            
            // await collection.updateOne({_id:new ObjectId(prodid)},
            // {$pull:{ratings:{userid:new ObjectId(userid)}}});
            // //pull out rating array from product object where userid matches input userid
            // //this will ensure that user can only rate once
            // await collection.updateOne({_id:new ObjectId(prodid)},
            // {$push:{ratings:{userid:new ObjectId(userid),rating}}})

           
        }catch(err) {
            
            throw new MyApplicationError("Failed to fetch products",500); // Handle errors appropriately
        }
        
    }
//sir told to implement this in all adders
    static async getnextCounter(db){
        const result =await db.collection('counters').findOneAndUpdate({_id:'products'},
            {$inc:{value:1}},
            {returnDocument:"after"}//return after cahanges
            
        )
        console.log("counter log",result);
        return result.value;  
    }


    static async AverageProdPricePerCategory(){
        try {
            const db = getDB();
            //AGGREGATE -  group by category and average price
            //we mark  the category as id  so we can group by it
            //and we 
            const prod = await db.collection('products').aggregate([
                {
                    $unwind:"$ratings",
                }, 
                {
                    $group:{
                        _id:"$name",
                        averageRating:{$avg:"$ratings.rating"}//rating in ratings aray
                    }
                }
            ]).toArray();
           return prod;
        } catch(err) {
            // console.log("hi from avg fun")
            throw new MyApplicationError("Failed to fetch products",500); // Handle errors appropriately
        }
    }

}