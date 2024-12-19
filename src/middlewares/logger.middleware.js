import fs from 'fs';//helps us to skip callbacks

const fsPromise=fs.promises;
//fs.promises doesnot need a call back function
async function log(logData){
 try{
    logData=`\n ${new Date().toString()}- ${logData}`;
    await fsPromise.appendFile('log.txt',logData)
 }catch(err){
    console.log(err);
}
}



const loggerMiddleware=async (req,res,next)=>{
    const logData=req.url + " " +JSON.stringify(req.body);//recrd the url and the data in the (log.txt)
    await log(logData);//call the above function 
    next();
}

export default loggerMiddleware;