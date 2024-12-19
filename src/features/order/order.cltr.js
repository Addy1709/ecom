import OrderRepositary from "./order.repo.js";

export default class OrderController {
     async PlaceOrder(req,res){
        const userid=req.userID;
        console.log(userid);
        
        await OrderRepositary.placeOrder(userid);
        res.send("user is created")

    }
}