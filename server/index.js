import express from "express";
import cors from "cors";
import  LoginRoute  from "./routes/login.js";
import  RegisterRoute from "./routes/register.js";
import bodyParser from "body-parser";
import env from "dotenv";
import { usersRoute, profileRoute, deleteUserRoute } from "./routes/Users.js";

env.config()
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(LoginRoute);
app.use(RegisterRoute);
app.use(usersRoute);
app.use(profileRoute);
app.use(deleteUserRoute);
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});