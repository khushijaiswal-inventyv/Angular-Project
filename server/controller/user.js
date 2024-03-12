import { User } from "../models/users.js";
import dbConnect from "../db/index.js";

const user = async (req, res) => {
  await dbConnect();
  const users = await User.find({});
  const usersData = users.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    img: user.img,
  }));
  if (users) {
    res.end(JSON.stringify(usersData));
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    await dbConnect();
    const user = await User.findByIdAndDelete(id);
    console.log(user);
    if (user) {
      console.log(user);  
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "User deleted successfully." }));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "User does not exist" }));
    }
  } catch (err) {
    throw new Error("Error updating user.");
  }
  
};
export { user, deleteUser };
