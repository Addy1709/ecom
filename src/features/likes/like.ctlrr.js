import { LikeRrpository } from "./like.repo.js";


export class LikeController{
    async likeItem(req,res){
        try{
            const {id,type}=req.body;
            if(type=="products"){
                await LikeRrpository.likeProduct(req.userID,id)
          res.status(200).send("liked product in added")

            }else{
                await LikeRrpository.likeCategory(req.userID,id)
          res.status(200).send("liked category in added")

            }
         
        }catch{
            console.log(err);
            
        }
    }
}