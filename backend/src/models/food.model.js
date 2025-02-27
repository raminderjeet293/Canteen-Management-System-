import {model, Schema} from 'mongoose';

export const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String]   
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    stars: {
        type: Number,
        default: 3,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    cookTime: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    },
});

export const FoodModel = model('food', foodSchema);