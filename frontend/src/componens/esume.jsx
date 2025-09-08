import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ResumeForm = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; 

  const [formData, setFormData] = useState({
    title: '',
    personalDetails: { name: '', email: '', phone: '', linkedin: '', github: '' },
    education: [],
    experience: [],
    projects: [],
    certificate: [],
    achievements: [],
    skills: [],
  });

  const [educationEntry, setEducationEntry] = useState({ school: '', degree: '', description: '', startDate: '', endDate: '' });
  const [experienceEntry, setExperienceEntry] = useState({ company: '', title: '', location: '', startDate: '', endDate: '', description: '' });
  const [projectEntry, setProjectEntry] = useState({ title: '', description: '', link: '' });
  const [skillEntry, setSkillEntry] = useState('');
  const [certificateEntry, setCertificateEntry] = useState({ title: '', issuer: '', date: '', link: '' });
  const [achievementEntry, setAchievementEntry] = useState('');

  // Handle personal details & title
  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'personalDetails') {
      setFormData({ ...formData, personalDetails: { ...formData.personalDetails, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Education
  const handleEducationChange = (e) => setEducationEntry({ ...educationEntry, [e.target.name]: e.target.value });
  const addEducation = () => {
    setFormData({ ...formData, education: [...formData.education, educationEntry] });
    setEducationEntry({ school: '', degree: '', description: '', startDate: '', endDate: '' });
  };

  // Experience
  const handleExperienceChange = (e) => setExperienceEntry({ ...experienceEntry, [e.target.name]: e.target.value });
  const addExperience = () => {
    setFormData({ ...formData, experience: [...formData.experience, experienceEntry] });
    setExperienceEntry({ company: '', title: '', location: '', startDate: '', endDate: '', description: '' });
  };

  // Projects
  const handleProjectChange = (e) => setProjectEntry({ ...projectEntry, [e.target.name]: e.target.value });
  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, projectEntry] });
    setProjectEntry({ title: '', description: '', link: '' });
  };

  // Skills
  const handleSkillChange = (e) => setSkillEntry(e.target.value);
  const addSkill = () => {
    if (skillEntry.trim() !== '') {
      setFormData({ ...formData, skills: [...formData.skills, skillEntry.trim()] });
      setSkillEntry('');
    }
  };

  // Certificates
  const addCertificate = () => {
    setFormData({ ...formData, certificate: [...formData.certificate, certificateEntry] });
    setCertificateEntry({ title: '', issuer: '', date: '', link: '' });
  };

  // Achievements
  const addAchievement = () => {
    if (achievementEntry.trim() !== '') {
      setFormData({ ...formData, achievements: [...formData.achievements, achievementEntry.trim()] });
      setAchievementEntry('');
    }
  };

  // Submit
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
      const res = await axios.post(`${API_URL}/api/data/create`, formData, config);
      alert('Resume saved successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data);
      alert(`Failed to save resume: ${err.response?.data?.msg || 'Server Error'}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5 md:p-10 font-sans text-gray-800">
      <div className="flex items-center mb-6">
        <img className="w-16 h-16 rounded-full" src="/logo.png" alt="Resume Platform Logo" />
        <Link to="/dashboard" className="ml-auto text-blue-600 font-bold hover:underline">Dashboard</Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Create Your Resume</h2>
        <form onSubmit={handleSubmit}>

          {/* Personal Details */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Resume Title" className="p-3 border rounded-md" required />
              <input type="text" name="name" value={formData.personalDetails.name} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="Full Name" className="p-3 border rounded-md" required />
              <input type="email" name="email" value={formData.personalDetails.email} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="Email" className="p-3 border rounded-md" required />
              <input type="text" name="phone" value={formData.personalDetails.phone} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="Phone Number" className="p-3 border rounded-md" />
              <input type="text" name="linkedin" value={formData.personalDetails.linkedin} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="LinkedIn URL" className="p-3 border rounded-md" />
              <input type="text" name="github" value={formData.personalDetails.github} onChange={(e) => handleInputChange(e, 'personalDetails')} placeholder="GitHub URL" className="p-3 border rounded-md" />
            </div>
          </div>

          {/* Education */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-4">Education</h3>
            {formData.education.map((edu, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-md mb-2">
                <p><strong>{edu.degree}</strong> from {edu.school}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input type="text" name="school" value={educationEntry.school} onChange={e => setEducationEntry({...educationEntry, school: e.target.value})} placeholder="Institution" className="p-3 border rounded-md"/>
              <input type="text" name="degree" value={educationEntry.degree} onChange={e => setEducationEntry({...educationEntry, degree: e.target.value})} placeholder="Degree" className="p-3 border rounded-md"/>
              <input type="text" name="description" value={educationEntry.description} onChange={e => setEducationEntry({...educationEntry, description: e.target.value})} placeholder="Description" className="p-3 border rounded-md"/>
              <input type="date" name="startDate" value={educationEntry.startDate} onChange={e => setEducationEntry({...educationEntry, startDate: e.target.value})} className="p-3 border rounded-md"/>
              <input type="date" name="endDate" value={educationEntry.endDate} onChange={e => setEducationEntry({...educationEntry, endDate: e.target.value})} className="p-3 border rounded-md"/>
            </div>
            <button type="button" onClick={addEducation} className="mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition">Add Education</button>
          </div>

          {/* Skills */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map((skill, i) => <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{skill}</span>)}
            </div>
            <div className="flex gap-2">
              <input type="text" value={skillEntry} onChange={handleSkillChange} placeholder="Add skill..." className="flex-grow p-3 border rounded-md"/>
              <button type="button" onClick={addSkill} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition">Add Skill</button>
            </div>
          </div>

          {/* Save Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-md font-bold hover:bg-blue-700 transition">Save Resume</button>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
