import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import bodyParser from 'body-parser'; // Middleware to parse request bodies
import swagger from 'swagger-ui-express';
import cors from 'cors';
import apidocs from './swagger.json' with { type: "json" };

import ordrRouter from './src/features/order/order.route.js';
import productRoute from './src/features/product/product.route.js';
import userRouter from './src/features/user/user.route.js';
import cartRouter from './src/features/cart/cartitems.route.js';
import { jwtAuth } from './src/middlewares/jwt.middleware.js';
import { ConnectToMongoDB } from './src/config/mongodb.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { MyApplicationError } from './src/error-handler/applicationError.js';
import { connectWithMongoose } from './src/config/mongooseconfig.js';
import likeRouter from './src/features/likes/like.route.js';

const server = express();

// CORS configuration
const corsOptions = {
    origin: "http://127.0.0.1:5500", // Allow requests from your frontend origin
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow credentials (if needed)
};

// Use CORS middleware
server.use(cors(corsOptions));

// Middleware setup
server.use(bodyParser.json());
server.use(express.json());
server.use(loggerMiddleware);

// Swagger API documentation
server.use('/api-docs', swagger.serve, swagger.setup(apidocs));

// Routes 
server.use("/api/orders",jwtAuth,ordrRouter);
server.use("/api/products", jwtAuth, productRoute); // Product-related routes
server.use("/api/cartItems", jwtAuth, cartRouter); // Cart-related routes
server.use("/api/users", userRouter); // User-related routes
server.use("/api/like",jwtAuth,likeRouter);

// Root endpoint
server.get('/', (req, res) => {
    res.send("Welcome to Ecom API");
});
//Universal error handler
server.use((err,req,res,next)=>{
    // console.log(err);//how wee figure it out its a know err
    if(err instanceof MyApplicationError){
        res.status(err.code).send(err.message);
    }
  res.status(500).send("Something went wrong please try again!")
})

// Handle 404 errors for non-existent routes
server.use((req, res) => {
    res.status(404).send("API NOT FOUND, please check the API docs");
});

// Start the server and connect to MongoDB
server.listen(3200, () => {
    console.log("RUNNING AT 3200");
    // ConnectToMongoDB(); // Connect to the database
    connectWithMongoose();
});