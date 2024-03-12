import mongoose from "mongoose";
const dbConnect = async()=>{
    await mongoose.connect("mongodb://localhost:27017/auth-system");
    console.log("connected");
}
export default dbConnect;