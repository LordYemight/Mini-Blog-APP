const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginSchema  = require('../validators/logInVal'); 
const User = require('../models/user')
require('dotenv').config();


const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate the user
    const { error } = loginSchema.validate({ username, password });
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    // find the user by username from the database
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    // Compare the provided password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

  
    
    if(isPasswordValid) {
      jwt.sign({username, id: user._id}, process.env.SECRET_KEY, {}, (err, token)=>{
        if (err) throw err
        res.cookie('token', token).json({
          id: user._id,
          username, 
        });
      })
    } else {
      res.status(400).json('wrong credentials');
    }


  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = logIn;
 