import { User } from "../models/users.js";
import dbConnect from "../db/index.js";
import bcrypt from "bcryptjs";
// var jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"

const userLogin = async (req, res) => {
  await dbConnect();
  try{
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    let token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY
    );
    res.header("Authorization", "Bearer " + token);
    const x = {
      token: token,
      user: user,
    };
    res.json(x);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Invalid credentials." }));
  }
}catch(err){
  throw new Error(err.toString())  
}
};

export default userLogin;
