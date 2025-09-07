import React from "react";

const ResumeUI = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans px-8 py-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Faiz Ali</h1>
        <div className="flex justify-center gap-6 mt-2 text-sm text-gray-400 flex-wrap">
          <span>📧 sayyedfaiz336@gmail.com</span>
          <span>📞 9250666171</span>
          <span>🔗 linkedin.com/in/faiz-ali-365861261</span>
          <span>🌐 faiz-portfolio-0786.vercel.app</span>
        </div>
      </div>

      <hr className="border-gray-700 mb-6" />

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold tracking-wide text-white mb-2">SKILLS</h2>
        <div className="pl-2 space-y-1 text-gray-300">
          <p><span className="font-semibold">Front-End:</span> HTML, CSS, JavaScript</p>
          <p><span className="font-semibold">Full-Stack Developer:</span> React, Node.js, Express.js, MongoDB</p>
          <p><span className="font-semibold">Frameworks:</span> TailwindCSS, Bootstrap</p>
          <p><span className="font-semibold">Database:</span> SQL, MongoDB, Firebase</p>
          <p><span className="font-semibold">Tools:</span> VSCode, Git, GitHub</p>
          <p><span className="font-semibold">Languages:</span> Python, C, JavaScript, SQL</p>
        </div>
      </section>

      <hr className="border-gray-700 mb-6" />

      {/* Coursework */}
      <section className="mb-6">
        <h2 className="text-lg font-bold tracking-wide text-white mb-2">RELEVANT COURSEWORK</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Data Structures & Algorithms (DSA)</li>
          <li>Object-Oriented Programming (OOP)</li>
          <li>Operating Systems (OS)</li>
          <li>DBMS</li>
        </ul>
      </section>

      <hr className="border-gray-700 mb-6" />

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-lg font-bold tracking-wide text-white mb-2">PROJECTS</h2>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-100">Shop Zone e-commerce</h3>
          <a href="https://szone.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            szone.onrender.com
          </a>
          <ul className="list-disc list-inside mt-2 text-gray-300 text-sm space-y-1">
            <li>Built a full-stack MERN e-commerce app with authentication, product management, shopping cart, and Stripe payments.</li>
            <li>Implemented JWT authentication, role-based access control, and secure password hashing with bcrypt.</li>
            <li>Styled frontend with TailwindCSS for responsive modern UI/UX.</li>
            <li>Deployed frontend & backend on Render with GitHub CI/CD.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-100">Student Management System</h3>
          <a href="https://github.com/sayyed-faiz-ali" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            github.com/sayyed-faiz-ali
          </a>
          <ul className="list-disc list-inside mt-2 text-gray-300 text-sm space-y-1">
            <li>Desktop app with CRUD functionality using Tkinter & SQLite/MySQL.</li>
            <li>Features: search, form validation, sorting/filtering student records.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-100">PulseCare</h3>
          <a href="https://github.com/Mohd-Farzan/onlineDoctorAppointment" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            github.com/Mohd-Farzan/onlineDoctorAppointment
          </a>
          <ul className="list-disc list-inside mt-2 text-gray-300 text-sm space-y-1">
            <li>Full-stack doctor appointment app with authentication & booking.</li>
            <li>Real-time chat with Socket.IO for secure communication.</li>
            <li>Role-based dashboards for users, doctors, and admins.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ResumeUI;















