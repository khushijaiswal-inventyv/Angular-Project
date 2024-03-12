import userLogin from "../controller/userLogin.js";
import express from "express";
const LoginRoute = express.Router()
LoginRoute.post('/login',userLogin);

export default LoginRoute