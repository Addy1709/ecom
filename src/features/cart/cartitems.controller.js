import CartItemsModel from "./cartitems.model.js";
import CartItemRepository from "./cartitems.repository.js";
export default class cartItemsController{
    async add(req,res,next){
        try{
        const userid=req.userID;//user stored user id
        // console.log(userid,"user id");
        
        const {prodid,quantity}=req.query;
        const item=await CartItemRepository.add(prodid,userid,parseFloat(quantity));//add to model
        console.log(item);//undefined
        
        res.status(200).send("cart is updated");
        }catch(err){
            next(err)
        }
    }
    //get item


    async get(req,res,next){
     try{
        const userid=req.userID;
        // console.log(userid);
        
        const items=await CartItemRepository.get(userid)
        res.status(200).send(items);

     }catch(err){
        next(err);
     }
    }

    async delete(req,res){
        const userid=req.userID;
        const cartitemID=req.params.id;
        console.log("deleting item",cartitemID,"from the cart..")
        const isdeleted=await CartItemRepository.delete(userid,cartitemID);//cal the delet from model

        if(!isdeleted){   
            console.error("delete failed");
            
            return res.status(404).send("Item not found")
        }else{  
            console.log("item deleted sucessfully");
             
            return res.status(404).send("item is deleted from cart")

        }
    }
}