import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";


import AViewStudents from "./components/AViewStudents";
import AViewClassrooms from "./components/AViewClassrooms";
import AViewSubjects from "./components/AViewSubjects";
import ViewTeachers from "./components/ViewTeachers";


import ViewAttendanceByFilter from "./components/ViewAttendanceByFilter";
import ViewMarksByFilter from "./components/ViewMarksByFilter";
import ClassAttendanceSummary from "./components/ClassAttendanceSummary";
import ViewSubjects from "./components/ViewSubjects";


import AdminProfile from "./components/AdminProfile";
import TeacherProfile from "./components/TeacherProfile";
import StudentProfile from "./components/StudentProfile";


import "./App.css";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate("/");
  };

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="app-container">

      {role && (
        <nav className="navbar">
          <Link to={`/${role.toLowerCase()}/dashboard`}>
            <img
              src="/icon.jpg"
              alt="Logo"
              style={{
                height: "70px",
                width: "70px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Link>

          {role === "ADMIN" && (
            <>
              <Link to="/admin/view-students" className="nav-link">View Students</Link>
              <Link to="/admin/view-teachers" className="nav-link">View Teachers</Link>
              <Link to="/admin/view-subjects" className="nav-link">View Subjects</Link>
              <Link to="/admin/view-classrooms" className="nav-link">View Classrooms</Link>
              <Link to="/admin/profile" className="nav-link">My Profile</Link>
            </>
          )}

          {role === "TEACHER" && (
            <>
              <Link to="/teacher/class-attendance-summary" className="nav-link">Attendance Record</Link>
              <Link to="/teacher/subjects" className="nav-link">Subjects</Link>
              <Link to="/teacher/attendance" className="nav-link">Attendance</Link>
              <Link to="/teacher/marks" className="nav-link">Marks</Link>
              <Link to="/teacher/profile" className="nav-link">My Profile</Link>
            </>
          )}

          {role === "STUDENT" && (
            <>
              <Link to="/student/profile" className="nav-link">My Profile</Link>
            </>
          )}

          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      )}


      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />


          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          <Route path="/admin/view-students" element={<AViewStudents />} />
          <Route path="/admin/view-teachers" element={<ViewTeachers />} />
          <Route path="/admin/view-subjects" element={<AViewSubjects />} />
          <Route path="/admin/view-classrooms" element={<AViewClassrooms />} />
          <Route path="/admin/profile" element={<AdminProfile />} />


          <Route path="/teacher/attendance" element={<ClassAttendanceSummary />} />
          <Route path="/teacher/class-attendance-summary" element={<ViewAttendanceByFilter />} />
          <Route path="/teacher/subjects" element={<ViewSubjects />} />
          <Route path="/teacher/marks" element={<ViewMarksByFilter />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />

 
          <Route path="/student/profile" element={<StudentProfile />} />
        </Routes>
      </div>
    </div>
  );
}
