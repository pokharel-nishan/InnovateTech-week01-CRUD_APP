const express = require('express');
const auth = require('../middlewares/authentication');
const { findAllUsers, findParticularUser, createUser, fullUserUpdate, partialUserUpdate, removeUser } = require('../controllers/userController');
const login = require('../controllers/accessControlController');
const authorize = require('../middlewares/authorization');
const userRouter = express.Router();

userRouter.post('/login', login);

userRouter.get('/', auth, authorize, findAllUsers);

userRouter.get('/:id', auth, authorize, findParticularUser);

userRouter.post('/', auth, createUser);

userRouter.put('/:id', auth, fullUserUpdate);

userRouter.patch('/:id', auth, partialUserUpdate);

userRouter.delete('/:id', auth, removeUser);

module.exports = userRouter;
