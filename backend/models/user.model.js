import mongoose from "mongoose"

const Schema =  mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    
})

export const User =  mongoose.model("User", userSchema)