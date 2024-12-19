import express from 'express';
import productController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middelware.js';
import { jwtAuth } from '../../middlewares/jwt.middleware.js';
// IMPORT jwtAuth// Import jwtAuth middleware

const productRoute = express.Router(); // Create route

const productctlrr = new productController();
productRoute.get('/averageprice', productctlrr.averagePrice); // this must be before all 
// Apply JWT Authentication to routes that require user authentication
productRoute.get('/filter', productctlrr.filterProduct); 
productRoute.get('/', productctlrr.getAllProducts);
productRoute.get('/:id', productctlrr.getOneProduct);

 
// POST routes for adding and rating products need JWT auth
productRoute.post('/', jwtAuth, upload.single('imageUrl'), productctlrr.addProducts); // Add JWT Authentication here

productRoute.post('/rate', jwtAuth, productctlrr.rateProducts); // Add JWT Authentication here

 
export default productRoute;
