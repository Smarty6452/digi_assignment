import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    packSize: {
        type: String,
        required: true
    },
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category', // Reference to the Category model
    //     required: true
    // },
    category: {
            type: String, 
            required: true
        },
    mrp: {
        type: String,
        required: false
    },
    image: {
        type: String, // URL string for storing image
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
});

export const Product = mongoose.model("Product", productSchema);
