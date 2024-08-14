const express = require('express');
const auth = require('../middlewares/auth');
const { getUsers, getParticularUser, addUser, updateUser, deleteUser } = require('../controllers/userController');
const login = require('../controllers/accessControl');
const userRouter = express.Router();

userRouter.post('/login', login);

userRouter.get('/', auth, getUsers);

userRouter.get('/:id', auth, getParticularUser);

userRouter.post('/', auth, addUser);

userRouter.put('/:id', auth, updateUser);

userRouter.delete('/:id', auth, deleteUser);

module.exports = userRouter;
