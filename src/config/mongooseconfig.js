import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";

export const  connectWithMongoose = async () => {
    try{
        await mongoose.connect(process.env.DB_URL2);
        console.log("Mongo DB  Connected Using Mongoose");
        // addCategories();        
}catch(err){
    console.log(err);
}
}

// async function addCategories(){
//     const categoryModel=mongoose.model("category",categorySchema);
//     const categories=await categoryModel.find();
//     if(categories || (categories).length==0){
//         await categoryModel.insertMany([
//             {name:"books"},
//             {name:"clothing"},
//             {name:"electronics"}
//         ])
//     } 
// }