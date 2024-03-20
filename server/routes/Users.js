import {user, deleteUser, updateUser } from "../controller/user.js";

import {upload, userProfile} from "../controller/userProfile.js";
import express from "express";

const usersRoute = express.Router()
const profileRoute = express.Router()
const deleteUserRoute = express.Router()
const updateUserRoute = express.Router()

usersRoute.get('/getAllUsers',user);
profileRoute.post('/profile',upload.single('img'),userProfile);
deleteUserRoute.delete('/user/:id',deleteUser);
updateUserRoute.put('/update/:id',updateUser);

export {usersRoute,profileRoute,deleteUserRoute, updateUserRoute};
