import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './componens/das';
import ResumeForm from './componens/esume';
import Login from './componens/lo';
import SignUp from './componens/si';
import ViewResume from './componens/view';
import A from "./componens/a"
import ProtectedRoute from './componens/ProtectedRoute'; // ✅ import

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <ResumeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/:resumeId"
            element={
              <ProtectedRoute>
                <ViewResume />
              </ProtectedRoute>
            }
          />
          <Route
            path="/i"
            element={
              <ProtectedRoute>
                <A />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
