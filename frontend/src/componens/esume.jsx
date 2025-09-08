import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ResumeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    personalDetails: {
      name: '',
      email: '',    
      phone: '',
      linkedin: '',
      github : ''
    },
    education: [],
    experience: [],
    projects: [],   
    certificate: [],
    achievements: [],
    skills: [],
  });

  const [educationEntry, setEducationEntry] = useState({ school: '', degree: '', description:'', startDate: '', endDate: '' });
  const [experienceEntry, setExperienceEntry] = useState({ company: '', title: '', location: '', startDate: '', endDate: '', description: '' });
  const [projectEntry, setProjectEntry] = useState({ title: '', description: '', link: ''});
  const [skillEntry, setSkillEntry] = useState('');
  const [certificateEntry, setCertificateEntry] = useState({ title: "", issuer: "", date: "", link: "" });
  const [achievementEntry, setAchievementEntry] = useState('');

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'personalDetails') {
      setFormData({
        ...formData,
        personalDetails: { ...formData.personalDetails, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEducationChange = (e) => setEducationEntry({ ...educationEntry, [e.target.name]: e.target.value });
  const addEducation = () => {
    setFormData({ ...formData, education: [...formData.education, educationEntry] });
    setEducationEntry({ school: '', degree: '', description:'', startDate: '', endDate: '' });
  };

  const handleExperienceChange = (e) => setExperienceEntry({ ...experienceEntry, [e.target.name]: e.target.value });
  const addExperience = () => {
    setFormData({ ...formData, experience: [...formData.experience, experienceEntry] });
    setExperienceEntry({ company: '', title: '', location: '', startDate: '', endDate: '', description: '' });
  };

  const handleProjectChange = (e) => setProjectEntry({ ...projectEntry, [e.target.name]: e.target.value });
  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, projectEntry] });
    setProjectEntry({ title: '', description: '',link: "" });
  };

  const handleSkillChange = (e) => setSkillEntry(e.target.value);
  const addSkill = () => {
    if (skillEntry.trim() !== '') {
      setFormData({ ...formData, skills: [...formData.skills, skillEntry.trim()] });
      setSkillEntry('');
    }
  };

  const addCertificate = () => {
    setFormData({ ...formData, certificate: [...formData.certificate, certificateEntry] });
    setCertificateEntry({ title: "", issuer: "", date: "", link: "" });
  };

  const addAchievement = () => {
    if (achievementEntry.trim() !== '') {
      setFormData({ ...formData, achievements: [...formData.achievements, achievementEntry.trim()] });
      setAchievementEntry('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to save a resume.');
      navigate('/login');
      return;
    }
    try {
      const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
      const res = await axios.post('http://localhost:5000/api/data/create', formData, config);
      alert('Resume saved successfully!');
      console.log('Saved:', res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save resume:', err.response?.data);
      alert(`Failed to save resume: ${err.response?.data?.msg || 'Server Error'}`);
    }
  };

  return (
    <>
    <div className="flex items-center mb-4">
  <img
    className="w-20 h-20 rounded-full"
    src="/logo.png"
    alt="Resume Platform Logo"
  />

  <Link
    to="/dashboard"
    className="ml-auto text-blue-600 font-bold hover:underline"
  >
    Dashboard
  </Link>
</div>



      <div className="bg-gray-100 min-h-screen p-10 font-sans text-gray-800">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6">Create Your Resume</h2>
          
          <form onSubmit={handleSubmit}>
            
            {/* ------------------ Personal Details ------------------ */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="title" value={formData.title} onChange={(e) => handleInputChange(e)} placeholder="Resume Title" required className="p-3 border rounded-md"/>
                <input type="text" name="name" value={formData.personalDetails.name} onChange={(e) => handleInputChange(e, "personalDetails")} placeholder="Full Name" required className="p-3 border rounded-md"/>
                <input type="email" name="email" value={formData.personalDetails.email} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="Email" required className="p-3 border rounded-md"/>
                <input type="text" name="phone" value={formData.personalDetails.phone} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="Phone Number" className="p-3 border rounded-md"/>
                <input type="text" name="linkedin" value={formData.personalDetails.linkedin} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="LinkedIn Profile URL" className="p-3 border rounded-md"/>
                <input type="text" name="github" value={formData.personalDetails.github} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="GitHub Profile URL" className="p-3 border rounded-md"/>
              </div>
            </div>

            {/* ------------------ Education ------------------ */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium mb-4">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
                  <p><strong>{edu.degree}</strong> from {edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input type="text" name="school" value={educationEntry.school} onChange={handleEducationChange} placeholder="Institution" className="p-3 border rounded-md"/>
                <input type="text" name="degree" value={educationEntry.degree} onChange={handleEducationChange} placeholder="Degree" className="p-3 border rounded-md"/>
                <input type="text" name="description" value={educationEntry.description} onChange={handleEducationChange} placeholder="Description" className="p-3 border rounded-md"/>
                <input type="date" name="startDate" value={educationEntry.startDate} onChange={handleEducationChange} className="p-3 border rounded-md"/>
                <input type="date" name="endDate" value={educationEntry.endDate} onChange={handleEducationChange} className="p-3 border rounded-md"/>
              </div>
              <button type="button" onClick={addEducation} className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Add Education</button>
            </div>

            {/* ------------------ Work Experience ------------------ */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium mb-4">Work Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
                  <p><strong>{exp.title}</strong> at {exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input type="text" name="company" value={experienceEntry.company} onChange={handleExperienceChange} placeholder="Company" className="p-3 border rounded-md"/>
                <input type="text" name="title" value={experienceEntry.title} onChange={handleExperienceChange} placeholder="Job Title" className="p-3 border rounded-md"/>
                <input type="text" name="location" value={experienceEntry.location} onChange={handleExperienceChange} placeholder="Location" className="p-3 border rounded-md"/>
                <input type="date" name="startDate" value={experienceEntry.startDate} onChange={handleExperienceChange} className="p-3 border rounded-md"/>
                <input type="date" name="endDate" value={experienceEntry.endDate} onChange={handleExperienceChange} className="p-3 border rounded-md"/>
              </div>
              <textarea name="description" value={experienceEntry.description} onChange={handleExperienceChange} placeholder="Job Description" className="mt-4 w-full p-3 border rounded-md"></textarea>
              <button type="button" onClick={addExperience} className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Add Experience</button>
            </div>
            
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium mb-4">Projects</h3>
              {formData.projects.map((proj, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded-lg mb-2">
                  <p className="font-semibold">{proj.title}</p>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                  <p className="text-sm text-gray-600">{proj.link}</p>

                </div>
              ))}
              <input type="text" name="title" value={projectEntry.title} onChange={handleProjectChange} placeholder="Project Title" className="p-3 border rounded-md w-full mb-2"/>
<input
  type="text"
  placeholder="Link (optional)"
  value={projectEntry.link}
  onChange={(e) =>
    setProjectEntry({ ...projectEntry, link: e.target.value })
  }
  className="p-2 border rounded-md w-full mb-2"
/>

              <textarea name="description" value={projectEntry.description} onChange={handleProjectChange} placeholder="Project Description" className="p-3 border rounded-md w-full"></textarea>
              <button type="button" onClick={addProject} className="mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Add Project</button>
            </div>

            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  name="skill" 
                  value={skillEntry} 
                  onChange={handleSkillChange} 
                  placeholder="Add a skill..." 
                  className="flex-grow p-3 border rounded-md"
                />
                <button 
                  type="button" 
                  onClick={addSkill} 
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Add Skill
                </button>
              </div>
            </div>

            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-700 border-b pb-1 mb-2">Certificates</h3>
              {formData.certificate.map((cert, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded-md mb-2">
                  <p><strong>{cert.title}</strong> by {cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                  {cert.link && <a href={cert.link} className="text-blue-600 text-sm">View Certificate</a>}
                </div>
              ))}
              <input type="text" placeholder="Certificate Title" value={certificateEntry.title} onChange={(e) => setCertificateEntry({ ...certificateEntry, title: e.target.value })} className="p-2 border rounded-md w-full mb-2"/>
              <input type="text" placeholder="Issuer" value={certificateEntry.issuer} onChange={(e) => setCertificateEntry({ ...certificateEntry, issuer: e.target.value })} className="p-2 border rounded-md w-full mb-2"/>
              <input type="date" value={certificateEntry.date} onChange={(e) => setCertificateEntry({ ...certificateEntry, date: e.target.value })} className="p-2 border rounded-md w-full mb-2"/>
              <input type="text" placeholder="Link (optional)" value={certificateEntry.link} onChange={(e) => setCertificateEntry({ ...certificateEntry, link: e.target.value })} className="p-2 border rounded-md w-full mb-2"/>
              <button type="button" onClick={addCertificate} className="px-2 py-2 bg-blue-600 text-white rounded-md">Add Certificate</button>
            </div>

            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium mb-4">Achievements</h3>
              {formData.achievements.map((ach, i) => (
                <p key={i} className="bg-green-100 text-green-800 p-2 rounded-md mb-2">{ach}</p>
              ))}
              <div className="flex space-x-2">
                <input type="text" value={achievementEntry} onChange={(e) => setAchievementEntry(e.target.value)} placeholder="Add achievement..." className="flex-grow p-3 border rounded-md"/>
                <button type="button" onClick={addAchievement} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Add</button>
              </div>
            </div>

            <button type="submit" className="w-full mt-2 bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Save Resume
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default ResumeForm;
