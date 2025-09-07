const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('User',Userschema);
module.exports = User; 