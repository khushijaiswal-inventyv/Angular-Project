import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required"]
    },
    email:{
        type: String,
        required: [true,"email is required"]
    },
    password:{
        type: String,
        required: [true,"name is required"]
    },
    img:{
        type: String,
    }
});

export const User = mongoose.model("users",userSchema);