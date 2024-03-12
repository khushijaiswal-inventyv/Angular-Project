import {user, deleteUser } from "../controller/user.js";

import {upload, userProfile} from "../controller/userProfile.js";
import express from "express";

const usersRoute = express.Router()
const profileRoute = express.Router()
const deleteUserRoute = express.Router()

usersRoute.get('/getAllUsers',user);
profileRoute.post('/profile',upload.single('img'),userProfile);
deleteUserRoute.delete('/user/:id',deleteUser);

export {usersRoute,profileRoute,deleteUserRoute};
