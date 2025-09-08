import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingDots from "./loadin";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

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

  // Fetch resume
  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get(`http://localhost:5000/api/data/${resumeId}`, {
          headers: { "x-auth-token": token }
        });
        setResume(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.msg || "Failed to fetch resume");
        setLoading(false);
      }
    };
    fetchResume();
  }, [resumeId, navigate]);

  // Personal details
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResume(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [name]: value }
    }));
  };

  // Arrays of strings: skills, achievements
  const handleStringArrayChange = (field, index, value) => {
    const updated = [...(resume[field] || [])];
    updated[index] = value;
    setResume(prev => ({ ...prev, [field]: updated }));
  };

  const addStringArrayItem = (field) => {
    setResume(prev => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  // Arrays of objects: education, experience, projects, certificate
  const handleObjectArrayChange = (field, index, key, value) => {
    const updated = [...(resume[field] || [])];
    updated[index] = { ...updated[index], [key]: value };
    setResume(prev => ({ ...prev, [field]: updated }));
  };

  const addObjectArrayItem = (field, newItem) => {
    setResume(prev => ({ ...prev, [field]: [...(prev[field] || []), newItem] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = [...(resume[field] || [])];
    updated.splice(index, 1);
    setResume(prev => ({ ...prev, [field]: updated }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/data/${resumeId}`, resume, {
        headers: { "x-auth-token": token }
      });
      alert("Resume updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update resume");
    }
  };

  if (loading) return <p><LoadingDots/></p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow rounded-lg space-y-6">
      <h1 className="text-2xl font-bold mb-6">Edit Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Details */}
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Personal Details</h2>
          {["name", "email", "phone", "linkedin", "github"].map(field => (
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

        {/* Skills */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Skills</h2>
          {(resume.skills || []).map((skill, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={e => handleStringArrayChange("skills", i, e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <button type="button" onClick={() => removeArrayItem("skills", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addStringArrayItem("skills")} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Skill</button>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Education</h2>
          {(resume.education || []).map((edu, i) => (
            <div key={i} className="mb-2 border p-2 rounded space-y-1">
              <input type="text" placeholder="School" value={edu.school || ""} onChange={e => handleObjectArrayChange("education", i, "school", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="text" placeholder="Degree" value={edu.degree || ""} onChange={e => handleObjectArrayChange("education", i, "degree", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" placeholder="Start Date" value={edu.startDate ? edu.startDate.split("T")[0] : ""} onChange={e => handleObjectArrayChange("education", i, "startDate", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" placeholder="End Date" value={edu.endDate ? edu.endDate.split("T")[0] : ""} onChange={e => handleObjectArrayChange("education", i, "endDate", e.target.value)} className="border p-1 w-full rounded"/>
              <textarea placeholder="Description" value={edu.description || ""} onChange={e => handleObjectArrayChange("education", i, "description", e.target.value)} className="border p-1 w-full rounded"/>
              <button type="button" onClick={() => removeArrayItem("education", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addObjectArrayItem("education", { school:"", degree:"", startDate:"", endDate:"", description:"" })} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Education</button>
        </div>
        

        {/* Experience */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Experience</h2>
          {(resume.experience || []).map((exp, i) => (
            <div key={i} className="mb-2 border p-2 rounded space-y-1">
              <input type="text" placeholder="Company" value={exp.company || ""} onChange={e => handleObjectArrayChange("experience", i, "company", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="text" placeholder="Title" value={exp.title || ""} onChange={e => handleObjectArrayChange("experience", i, "title", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" placeholder="Start Date" value={exp.startDate ? exp.startDate.split("T")[0] : ""} onChange={e => handleObjectArrayChange("experience", i, "startDate", e.target.value)} className="border p-1 w-full rounded"/>
              <input type="date" placeholder="End Date" value={exp.endDate ? exp.endDate.split("T")[0] : ""} onChange={e => handleObjectArrayChange("experience", i, "endDate", e.target.value)} className="border p-1 w-full rounded"/>
              <textarea placeholder="Description" value={exp.description || ""} onChange={e => handleObjectArrayChange("experience", i, "description", e.target.value)} className="border p-1 w-full rounded"/>
              <button type="button" onClick={() => removeArrayItem("experience", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addObjectArrayItem("experience", { company:"", title:"", startDate:"", endDate:"", description:"" })} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Experience</button>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Achievements</h2>
          {(resume.achievements || []).map((ach, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={ach} onChange={e => handleStringArrayChange("achievements", i, e.target.value)} className="border p-1 rounded flex-1"/>
              <button type="button" onClick={() => removeArrayItem("achievements", i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addStringArrayItem("achievements")} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Achievement</button>
        </div>

        {/* Submit */}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Changes</button>
      
      
       <Link
            to="/dashboard"
            className="ml-2 px-5 py-2 bg-yellow-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </Link>
      </form>
    </div>
  );
};

export default EditResume;
