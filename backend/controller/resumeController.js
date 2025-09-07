const ResumeModel = require("../model/new");

exports.createResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeData = req.body;

    const newResume = new ResumeModel({
      user: userId,
      ...resumeData,
    });

    const savedResume = await newResume.save();
    console.log(savedResume)

    res.status(201).json(savedResume);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
};
exports.Resume = async (req, res) => {
   try {
    // 💡 Find all resumes that belong to the user ID from the authenticated request
    const resumes = await ResumeModel.find({ user: req.user.id }).sort({ date: -1 });

    // Send the found resumes. If no resumes are found, an empty array is returned.
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.viewResume = async (req, res) => {


   try {
    const resume = await ResumeModel.findOne({
      _id: req.params.resumeId,  // use the ID from the URL
      user: req.user.id,         // ensure the logged-in user owns it
    });

    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

exports.Remove = async (req, res)=>{

  try {
    const resume = await ResumeModel.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    // This is where you would add logic to check if the user owns the resume
    // await resume.remove(); // Mongoose 5.x
     await ResumeModel.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }


  }