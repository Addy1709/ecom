import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
 
export default class productController{
    
    async getAllProducts(req, res, next) {
        try {
            const products = await ProductRepository.getAll(); // Call repository to fetch products
            return res.status(200).json(products); // Send the fetched products as a JSON response
        } catch (error) {
            console.error("Error in getAllProducts:", error);
            res.status(500).json({ message: "Internal Server Error" });
            next(error);
        }
    }

    // getAllProducts(req,res){
    //     const products=ProductModel.getAll();//static
    //     res.status(200).send(products); //send as response
    // }


    async addProducts(req,res,next){
        try{
            const {id,name,sizes,price,desc,categories}=req.body;
            const newProd=new ProductModel(id,name,desc,parseFloat(price),"/upload/"+req.file.filename,categories,sizes.split(','))  
            const createdProduct= await ProductRepository.add(newProd);  
            res.status(200).send(createdProduct);
            console.log("log from addproduct controller product added sucessfully");
            
        }catch(errr){

            console.log(errr);
            next(errr);
            
        }
    }

    // addProducts(req,res){
    //     // console.log(req.body);//undefined
    //     // const {name,sizes}=req.body;
    //     // console.log(sizes[0]);
    //   //we create a specxial oj for img file
    //   const {name,sizes,price,desc,category}=req.body;

    //   //create seperate object for image
    //   const prod = {
    //     name,
    //     desc,
    //     price: parseFloat(price),  //// postman unout string hai we convert it to float
    //     sizes: sizes.split(','),    // post man is text we convert to array [ , , , ]
    //     imageUrl: "/uploads/" + req.file.filename, // Handling single file upload, creating image URL
    //     category
    // };
    // // console.log(prod);
      
    //     const createdProduct=ProductModel.add(req.body);
    //     res.status(200).send(createdProduct);
        
    // }

   async getOneProduct(req,res){
        const id=req.params.id;
        const thisporduct=await ProductRepository.getOne(id)
        if(!thisporduct){
            res.status(404).send({message:"product not found"});
        }else{
            res.status(200).send(thisporduct);
        }
    }
 
    async rateProducts(req,res,next){
        try{
        const userid=req.userID; 
        console.log(userid);
        
        const prodid=req.query.prodid;
        const rating=req.query.rating;
        console.log("consoled params from  (prodcontroller.js) "+userid+" "+prodid +" "+rating);
        await ProductRepository.rateProducts(userid,prodid,rating);
        return res.status(200).send("Rating aded sucessfully"); 

        }catch(err){ 
            return res.status(err.code).send(err.message);
            next(err);//go to universal error handler

        }
        

        // const data=ProductModel.rateProducts(userid,prodid,rating);
        // console.log(data);
        
        // if(data){
        //      return res.status(400).send(data); 
        // }else{
        //     res.status(200).send("Rating aded Sucessfully");
            
        // }
    }

    async filterProduct(req,res){
      const minprice=req.query.minprice;
      const category=req.query.category;
      const filtered=await ProductRepository.filter(minprice,category);
    res.status(200).send(filtered);//sent the filtered products as response
    }


    async averagePrice(req,res,next){
        try{
            const result=await ProductRepository.AverageProdPricePerCategory();
          res.status(200).send(result);//sent the filtered products as response

        }catch(err){
            next(err)
        }
    } 
} 