const express = require('express');
const userRoutes = express.Router();
const {verifyToken} = require('../helpers/verifyToken');

const {
      registerUser,
      loginUser,
      getAllUser,
      getUser,
      updateUser,
      deleteUser,
      updatePassword
      
} = require('../controller/user.controller');

userRoutes.post('/register-user', registerUser);
userRoutes.post('/login-user', loginUser);
userRoutes.get('/get-all-user',verifyToken, getAllUser);
userRoutes.get('/get-user',verifyToken, getUser);
userRoutes.put('/update-user',verifyToken, updateUser);
userRoutes.delete('/delete-user',verifyToken, deleteUser);

module.exports = userRoutes;

