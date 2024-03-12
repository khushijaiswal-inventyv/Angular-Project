import {User} from "../models/users.js";
import dbConnect from "../db/index.js";
// import cloudinary from 'cloudinary';
import bcrypt from "bcryptjs";
// import user from "./user.js";
import multer from "multer";
import { cloudinary } from "../helper.js";
import env from "dotenv";
env.config();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads'); // Define the destination directory for uploaded files
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); // Use the original file name for storing
//     }
//   });
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });
// cloudinary();
const storage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  };  

const upload = multer({ storage: storage,fileFilter: fileFilter })
// const userProfile = async (req, res) => {
//   try {
//     await dbConnect();
    
//     // Create a promise to handle the upload stream
//     const uploadPromise = new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
//         if (error) {
//           console.error(error);
//           reject('Error uploading image to Cloudinary');
//         } else {
//           resolve(result.secure_url); // Resolve with the secure URL
//         }
//       }).end(req.file.buffer);
//     });

//     // Wait for the uploadPromise to resolve
//     const imgUrl = await uploadPromise;

//     const email = req.body.email;

//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     user.img = imgUrl;
//     await user.save();

//     return res.status(200).json({ message: 'Profile updated successfully', imgUrl });
//   } catch (err) {
//     console.error('Error updating profile:', err);
//     return res.status(500).json({ error: 'Error updating profile' });
//   }
// };


// const userProfile = async(req,res)=>{
//    try{
//     await dbConnect();
//     // const result=await cloudinary.uploader.upload(req.file.buffer, {folder:'uploads'});
//     const result= cloudinary.uploader.upload_stream({resource_type: "auto" }, (error, result) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
//       }
    
//     const email = req.body.email;
//     const imgUrl = result.secure_url;

//     // console.log(req.file.path)
//     let user = await User.findOne({ email });

//     if(!user){
//         res.send("User not found!")
//     }
//     if(user && img){
//         user.img = img;
//     }
//     user.img=imgUrl;
//     // console.log(user.img)
//     user.save();
//     return res.status(200).json({ message: 'Profile updated successfully',imgUrl });
// }).end(req.file.buffer);
// }
// catch(err){
//     console.error('Error updating profile:', err);
//     res.status(500).json({ error: 'Error updating profile' });
// }
// }

const uploadImageToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) {
        console.error(error);
        reject('Error uploading image to Cloudinary');
      } else {
        resolve(result.secure_url);
      }
    }).end(fileBuffer);
  });
};

const userProfile = async (req, res) => {
  try {
    await dbConnect();
    
    const imgUrl = await uploadImageToCloudinary(req.file.buffer);

    const email = req.body.email;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.img = imgUrl;
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully', imgUrl });
  } catch (err) {
    console.error('Error updating profile:', err);
    return res.status(500).json({ error: 'Error updating profile' });
  }
};

export {upload,userProfile};