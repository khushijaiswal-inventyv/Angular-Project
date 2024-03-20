// import mongoose from "mongoose";
import {User} from "../models/users.js";
import dbConnect from "../db/index.js";
import bcrypt from "bcryptjs";

const userRegister = async(req,res)=>{
    try{
     await dbConnect();
     req.body.img="";
     const email= req.body.email;
     const userEmail = await User.findOne({
      email
    });
     if(userEmail){
      return res
      .status(409)
      .json({ message: 'Email already exist' });
     }
     const data = new User(req.body);
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
     data.password = hashedPassword;
      data.img = req.body.img;
     await data.save();
     res.setHeader('Content-Type', 'application/json')
     res.end(JSON.stringify({ message: "Succesfully added user" }));
    }catch (error) {
     console.error("Error adding user:", error);
     res.status(500).json({ error: "Failed to add user" });
   }
}
export default userRegister;