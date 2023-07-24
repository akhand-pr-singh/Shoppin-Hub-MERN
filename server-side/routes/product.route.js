import express from 'express';
import {getProductController, searchedProductController, categorizedProductController} from '../controllers/product.controller.js';

const productRouter = express.Router();

////ROUTES

//getProducts route
productRouter.get('/', getProductController);

//searchProducts route
productRouter.get('/search', searchedProductController);

//filterByCategory route
productRouter.get('/category/:category', categorizedProductController);


export default productRouter;