import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingDots from "./loadin";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [resume, setResume] = useState({
    personalDetails: { name: "", email: "", phone: "", linkedin: "", github: "" },
    skills: [],
    education: [],
    experience: [],
    projects: [],
    certificate: [],
    achievements: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      try {
        const res = await axios.get(`${API_URL}/api/data/${resumeId}`, {
          headers: { "x-auth-token": token }
        });
        setResume(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch resume");
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [resumeId, navigate, API_URL]);

  // ------------------- Handlers -------------------
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResume(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [name]: value }
    }));
  };

  const handleStringArrayChange = (field, index, value) => {
    const updated = [...(resume[field] || [])];
    updated[index] = value;
    setResume(prev => ({ ...prev, [field]: updated }));
  };

  const addStringArrayItem = (field) =>
    setResume(prev => ({ ...prev, [field]: [...(prev[field] || []), ""] }));

  const handleObjectArrayChange = (field, index, key, value) => {
    const updated = [...(resume[field] || [])];
    updated[index] = { ...updated[index], [key]: value };
    setResume(prev => ({ ...prev, [field]: updated }));
  };

  const addObjectArrayItem = (field, newItem) =>
    setResume(prev => ({ ...prev, [field]: [...(prev[field] || []), newItem] }));

  const removeArrayItem = (field, index) =>
    setResume(prev => ({
      ...prev,
      [field]: [...prev[field].slice(0, index), ...prev[field].slice(index + 1)]
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${API_URL}/api/data/${resumeId}`, resume, {
        headers: { "x-auth-token": token }
      });
      alert("Resume updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update resume");
    }
  };

  // ------------------- UI -------------------
  if (loading) return <div className="flex justify-center mt-20"><LoadingDots /></div>;
  if (error) return <p className="text-red-600 mt-4 text-center">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white shadow rounded-lg space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Edit Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Personal Details</h2>
          {["name","email","phone","linkedin","github"].map(field => (
            <div key={field}>
              <label className="block capitalize font-medium">{field}:</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={resume.personalDetails[field] || ""}
                onChange={handlePersonalChange}
                className="border p-2 w-full rounded"
              />
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Skills</h2>
          {(resume.skills || []).map((skill, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={skill} onChange={e => handleStringArrayChange("skills", i, e.target.value)} className="border p-2 rounded flex-1"/>
              <button type="button" onClick={() => removeArrayItem("skills", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addStringArrayItem("skills")} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Skill</button>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Education</h2>
          {(resume.education || []).map((edu, i) => (
            <div key={i} className="mb-2 border p-2 rounded space-y-1">
              <input type="text" placeholder="School" value={edu.school || ""} onChange={e => handleObjectArrayChange("education", i, "school", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="text" placeholder="Degree" value={edu.degree || ""} onChange={e => handleObjectArrayChange("education", i, "degree", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" value={edu.startDate?.split("T")[0] || ""} onChange={e => handleObjectArrayChange("education", i, "startDate", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" value={edu.endDate?.split("T")[0] || ""} onChange={e => handleObjectArrayChange("education", i, "endDate", e.target.value)} className="border p-1 w-full rounded"/>
              <textarea placeholder="Description" value={edu.description || ""} onChange={e => handleObjectArrayChange("education", i, "description", e.target.value)} className="border p-1 w-full rounded"/>
              <button type="button" onClick={() => removeArrayItem("education", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addObjectArrayItem("education", { school:"", degree:"", startDate:"", endDate:"", description:"" })} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Education</button>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Experience</h2>
          {(resume.experience || []).map((exp, i) => (
            <div key={i} className="mb-2 border p-2 rounded space-y-1">
              <input type="text" placeholder="Company" value={exp.company || ""} onChange={e => handleObjectArrayChange("experience", i, "company", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="text" placeholder="Role" value={exp.role || ""} onChange={e => handleObjectArrayChange("experience", i, "role", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" value={exp.startDate?.split("T")[0] || ""} onChange={e => handleObjectArrayChange("experience", i, "startDate", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" value={exp.endDate?.split("T")[0] || ""} onChange={e => handleObjectArrayChange("experience", i, "endDate", e.target.value)} className="border p-1 w-full rounded"/>
              <textarea placeholder="Description" value={exp.description || ""} onChange={e => handleObjectArrayChange("experience", i, "description", e.target.value)} className="border p-1 w-full rounded"/>
              <button type="button" onClick={() => removeArrayItem("experience", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addObjectArrayItem("experience", { company:"", role:"", startDate:"", endDate:"", description:"" })} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Experience</button>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Projects</h2>
          {(resume.projects || []).map((proj, i) => (
            <div key={i} className="mb-2 border p-2 rounded space-y-1">
              <input type="text" placeholder="Title" value={proj.title || ""} onChange={e => handleObjectArrayChange("projects", i, "title", e.target.value)} className="border p-1 w-full rounded"/>
              <textarea placeholder="Description" value={proj.description || ""} onChange={e => handleObjectArrayChange("projects", i, "description", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="text" placeholder="Link" value={proj.link || ""} onChange={e => handleObjectArrayChange("projects", i, "link", e.target.value)} className="border p-1 w-full rounded"/>
              <button type="button" onClick={() => removeArrayItem("projects", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addObjectArrayItem("projects", { title:"", description:"", link:"" })} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Project</button>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Certificates</h2>
          {(resume.certificate || []).map((cert, i) => (
            <div key={i} className="mb-2 border p-2 rounded space-y-1">
              <input type="text" placeholder="Title" value={cert.title || ""} onChange={e => handleObjectArrayChange("certificate", i, "title", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="text" placeholder="Issuer" value={cert.issuer || ""} onChange={e => handleObjectArrayChange("certificate", i, "issuer", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" value={cert.date?.split("T")[0] || ""} onChange={e => handleObjectArrayChange("certificate", i, "date", e.target.value)} className="border p-1 w-full rounded"/>
              <button type="button" onClick={() => removeArrayItem("certificate", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addObjectArrayItem("certificate", { title:"", issuer:"", date:"" })} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Certificate</button>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Achievements</h2>
          {(resume.achievements || []).map((ach, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Achievement" value={ach} onChange={e => handleStringArrayChange("achievements", i, e.target.value)} className="border p-2 rounded flex-1"/>
              <button type="button" onClick={() => removeArrayItem("achievements", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addStringArrayItem("achievements")} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Achievement</button>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Changes</button>
          <Link to="/dashboard" className="px-5 py-2 bg-yellow-600 text-white rounded-lg font-medium shadow hover:bg-yellow-700 transition">Back to Dashboard</Link>
        </div>
      </form>
    </div>
  );
};

export default EditResume;
