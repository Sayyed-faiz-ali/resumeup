const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  linkedin: String,
  github: String,
  
});

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  description: [String],
});

const certificateSchema = new mongoose.Schema(


    {
      title: String,
      issuer: String,
      date: Date,
      link: String, 
    }
  );
  
const  projectSchema = new mongoose.Schema({
  title: String,
  description: [String],
  link: String, 


});

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  personalDetails: personalDetailsSchema,
  education: [educationSchema],
  experience: [experienceSchema],
  certificate:[certificateSchema],
 projects:[projectSchema],
 skills: [String]
  
}, { timestamps: true }); 

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;