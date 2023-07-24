import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    id: { type: Number },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number },
    brand: { type: String },
    category: { type: String },
    thumbnail: { type: String },
    images: { type: Array }

});

productSchema.index({"$**":"text"});

const productModel = mongoose.model('products', productSchema);

export  default productModel;