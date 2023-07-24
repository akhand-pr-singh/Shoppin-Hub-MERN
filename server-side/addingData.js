import fetch from 'node-fetch';
import productModel from './models/product.model.js';
import connectDB from './config/db.js';

connectDB();

const getData = async () => {
    const myProducts = await fetch('https://dummyjson.com/products?skip=90');
    const response = await myProducts.json();

    for (let i = 0; i <response.products.length; i++) {
        const myProduct = new productModel({
            id: response.products[i]['id'],
            title: response.products[i]['title'],
            description: response.products[i]['description'],
            price: response.products[i]['price'],
            discountPercentage: response.products[i]['discountPercentage'],
            rating: response.products[i]['rating'],
            stock: response.products[i]['stock'],
            brand: response.products[i]['brand'],
            category: response.products[i]['category'],
            thumbnail: response.products[i]['thumbnail'],
            images: response.products[i]['images']
        });

        myProduct.save();
    }
    console.log('loop ended');
};


getData();

