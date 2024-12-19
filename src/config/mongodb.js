import { MongoClient } from "mongodb";  //imprt mongoDB
import dotenv from "dotenv";
dotenv.config();
//////We link node project with mongoserver
//in POV of MONGODB serevr is the client

// (MongoClient) <------->  (mongoserver)
//MongoClient is a class of mongo db
//coppy connection string from MONGODB  Compasss
// const url="mongodb://localhost:27017/ecomdb";  ///we dont need this we use (dotenv)
let clientdb;  //  ("....../ecomdb") will create the DB
export const ConnectToMongoDB=()=>{
    //connect() return a promise 
    MongoClient.connect(process.env.DB_URL2)//////use url provided by the environment 
    .then(client=>{
        clientdb=client;
        console.log("Connected to DB yeeeee");
        createCounter(clientdb.db());
        createIndex(clientdb.db())
    }).catch(err=>{
        console.log(err);      //handling erors is mandatory
        
    });
                  
} 


export const getDB=()=>{
return clientdb.db();
}

const createCounter=async(db)=>{
    const existingCartCounter=await db.collection('counters').findOne({_id:'cartitems'});//false for first call
    if(!existingCartCounter){
        await db.collection('counters').insertOne({_id:'cartitems',value:0})
    }

    const existingProdCounter=await db.collection('counters').findOne({_id:'products'});
    if(!existingProdCounter){
        await db.collection('counters').insertOne({_id:'products',value:0})
    }
}


const createIndex=async(db)=>{
    try{
        await db.collection('products').createIndex({price:1})//increasing order
        await db.collection('products').createIndex({name:1,category:-1})//-1 descrease order
        await db.collection('products').createIndex({desc:"text"})//increasing order


    }catch(err){
        console.log(err);
        
    }
}