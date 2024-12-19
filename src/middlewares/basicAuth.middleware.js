import userModel from "../features/user/user.model.js";

export const basicAuth=(req,res,next)=>{
    //fetch the input from postman
    const authHeader=req.headers["authorization"]; //object key value pairs
    console.log(req.headers);
    console.log(authHeader);
    //Basic Ym9iQGdtYWlsLmdvbToxMjM0 ---> id pass in encoded format
    if(!authHeader){
        return res.send("heder details not found")
    }
    const base64Creds=authHeader.replace('Basic ','');//////remove the text before encoded text '//Basic(this) Ym9iQGdtYWlsLmdvbToxMjM0 '
    const decodedData=Buffer.from(base64Creds,'base64').toString('utf-8');//convert from base64 to utf8

    console.log(decodedData);
    const creds=decodedData.split(":");

    const user=userModel.signIN(creds[0],creds[1]);
    if(user){
        next();
    }else{
        return res.status(400).send("Incorrect Creds")
    }
    next();

}