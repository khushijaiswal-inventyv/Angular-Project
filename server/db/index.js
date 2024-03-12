import mongoose from "mongoose";
const dbConnect = async()=>{
    await mongoose.connect("mongodb+srv://admin:Khushi02@cluster0.qwgntmh.mongodb.net/AngularProject");
    console.log("connected");
}
export default dbConnect;