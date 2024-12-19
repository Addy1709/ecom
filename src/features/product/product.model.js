import { MyApplicationError } from "../../error-handler/applicationError.js";
import userModel from "../user/user.model.js";
export default class ProductModel {
    constructor(id, name, desc, price, imageUrl, category, sizes) {
        this._id = id;
        this.name = name; 
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes; // This can be an array of available sizes
    }

    static getAll() {
        return products;
    }
    static add(Productobj){
        Productobj.id=products.length+1;
        products.push(Productobj);
        return Productobj;  ///you can  return the updated products array
        //or  return the added product object
    }
//get() in sirs
   static productPicker(id){
        const prodfound=products.find((prod)=>prod.id==id);
        return prodfound;
        //if not found the getOneProduct() wil hande  the error

    }


    static rateProducts(userid,prodid,rating){
        const userfound=userModel.getAll().find((user)=>user.id==userid);

        if(!userfound){
            throw new MyApplicationError("user not found",404);
        }
        const productfound=products.find((prod)=>prod.id==prodid)
        if(!productfound){
            throw new MyApplicationError("product not found",400);

        }

        if(!products.rating){
            products.rating=[];
            products.rating.push({
                userid:userid,
                rating:rating,
            });
        }else{
            products.rating.push({
                userid:userid,
                rating:rating,
            });
        }
        console.log(products);
        
    }
}

// Creating an array of ProductModel instances (products)
const products = [
    new ProductModel(1, 'Product 1', 'Description of Product 1', 99.99, 'https://example.com/img1.jpg', 'Electronics', ['S', 'M', 'L']),
    new ProductModel(2, 'Product 2', 'Description of Product 2', 149.99, 'https://example.com/img2.jpg', 'Clothing', ['M', 'L']),
    new ProductModel(3, 'Product 3', 'Description of Product 3', 199.99, 'https://example.com/img3.jpg', 'Furniture', ['L', 'M'])
];


