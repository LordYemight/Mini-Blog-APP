const express = require('express');
const register = require('../controllers/register');
const logIn = require('../controllers/logIn');

const Router = express.Router();


Router.post('/register',  register)
Router.post('/login', logIn)




module.exports = Router;