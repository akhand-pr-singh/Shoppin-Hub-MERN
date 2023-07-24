import productModel from "../models/product.model.js";

const getProductController = (req, res, next)=>{

        const limit = Number(req.query.limit) || 30;
        const skip = Number(req.query.skip) || 0;

        productModel.find({}).limit(limit).skip(skip)
        .then((products)=>{
            return res.status(200).send({
                products: products,
                total : 100,
                skip: skip,
                limit: limit
            })
        })
        .catch((error)=>{
            res.status(500).send('Error while fetching', error);
        });
};

const searchedProductController = (req, res, next)=>{

    const {search} = req.query;

    productModel.find({$text:{$search:search}})
    .then((products)=>{
        return res.status(200).send({
            products: products,
            total: products.length,
            skip: 0,
            limit: products.length
        });
    })
    .catch((error)=>{
        res.status(500).send('Error while fetching', error);
    });

};

const categorizedProductController = (req, res, next)=>{
    const {category} = req.params;

    productModel.find({category})
    .then((products)=>{
        return res.status(200).send({
            products: products,
            total: products.length,
            skip: 0,
            limit: products.length
        })
    })
    .catch((error)=>{
        return res.status(500).send('Error while fetching', error);
    })

};

export {getProductController, searchedProductController, categorizedProductController};