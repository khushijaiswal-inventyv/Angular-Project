import userRegister from "../controller/userRegister.js";
import express from "express";
const RegisterRoute = express.Router()

RegisterRoute.post('/register',userRegister);

export default RegisterRoute