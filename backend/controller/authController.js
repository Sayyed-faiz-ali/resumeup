const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User_Model');

router.get("/a",async (req,res)=>{
try{

  let user = await User.find();
  console.log(user);
} catch(e){
  console.log(e.message)

}

})
 
exports.register = async (req, res) => {
  const { name ,email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password, 
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Create and sign a JWT payload
    const payload = {
      user: {
        id: user.id,
        name:user.name,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


// exports.login = async (req, res) => {
//   const {email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     console.log('User found:', user); 
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log('Password comparison result:', isMatch);

//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }
    
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// }
// controllers/authController.js

exports.login = async (req, res) => {
  const {name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create and sign a JWT payload
    const payload = {
      user: {
        id: user.id,
        name: user.name,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Replace with a secure secret
    
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // This sends the response that the frontend is waiting for
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ msg: 'Logout successful' });
};