import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    rname: { type: String, required:true, unique:true},
    imgdata: { type: String, required:true},
    address: { type: String, required:true},
    description: { type: String, required:true},
    price: { type: Number, required:true},
    rating: { type: Number, required:false, default:'0'},
    numReviews: {type: Number, required:false, default:'0'},
},
{
    timestamps: true
}
);

const Product = mongoose.model('Product', productSchema);
export default Product;