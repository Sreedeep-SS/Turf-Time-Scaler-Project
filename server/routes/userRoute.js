const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken')
// const authMiddleware = require('../middlewares/authMiddleware');


// Route for Register


router.post('/register', async(req, res) => {

    try {
        const userExists = await User.findOne({ email: req.body.email });
    
        if (userExists) {
          res.send({
            success:false,
            message: "user already Exists",
          });
        }
    
        // Hash The password
    
        const salt = await bcrypt.genSalt(10);
    
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
    
        console.log(salt);
    
        const newUser = await User(req.body);
    
        await newUser.save(); // saves the data in the database
    
        res.send({
          success: true,
          message: "User Registered Successfully",
        });
      } catch (error) {
        console.log(error);
      }
    });
    

module.exports = router;