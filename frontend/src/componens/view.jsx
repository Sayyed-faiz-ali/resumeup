import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const SingleResume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { resumeId } = useParams(); // get resume ID from URL

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const config = {
          headers: { "x-auth-token": token },
        };

        const res = await axios.get(
          `http://localhost:5000/api/data/${resumeId}`,
          config
        );

        setResume(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch resume:", err.response?.data);
        setError(err.response?.data?.msg || "Server Error");
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-red-600">Error: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );

  if (!resume) return null;

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen p-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold text-gray-800">View Resume</h1>
        <Link
          to="/dashboard"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Resume Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-10">
        {/* Name + Contact */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {resume.personalDetails?.name || "Your Name"}
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          {resume.personalDetails?.email} | {resume.personalDetails?.phone} |{" "}
          <Link
           to={resume.personalDetails?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >

            LinkedIn
          </Link> {" "}
          |{" "}
          <Link
            href={resume.personalDetails?.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </Link>
        </p>

        <hr className="border-gray-300 my-6" />

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(resume.skills)
                ? resume.skills
                : resume.skills.split(",")
              ).map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        )}
<hr className="border-gray-700 my-4" />
        {/* Education */}
        {resume.education?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString()} –{" "}
                    {new Date(edu.endDate).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700 text-sm">{edu.school}</p>
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
<hr className="border-gray-700 my-4" />
        {/* Experience */}
        {resume.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
              Experience
            </h2>
            {resume.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} –{" "}
                    {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700 text-sm">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
<hr className="border-gray-700 my-4" />
        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
              Projects
            </h2>
            {resume.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-gray-800">{proj.title}</h3>
                <p className="text-gray-600 text-sm">{proj.description}</p>
                <a href={proj.link}></a>
              </div>
            ))}
          </section>
        )}
<hr className="border-gray-700 my-4" />
        {/* Certificates */}
        {resume.certificate?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
              Certificates
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {resume.certificate.map((cert, i) => (
                <li key={i} className="text-gray-700 text-sm">
                  <span className="font-semibold">{cert.title}</span> —{" "}
                  {cert.issuer} ({new Date(cert.date).toLocaleDateString()})
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 underline"
                    >
                      Verify
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
<hr className="border-gray-700 my-4" />
        {/* Achievements */}
        {resume.achievements?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
              Achievements
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
              {resume.achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default SingleResume;
