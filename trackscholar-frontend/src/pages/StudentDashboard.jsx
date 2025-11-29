import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchProfile();
    fetchAttendance();
    fetchMarks();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("/student/me");
    setProfile(res.data);
  };

  const fetchAttendance = async () => {
    const res = await axios.get("/student/attendance-summary");
    setAttendance(res.data);
  };

  const fetchMarks = async () => {
    const res = await axios.get("/student/marks-summary");
    setMarks(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2> Student Dashboard</h2>
      <hr />

      {/* Attendance Table */}
      <div style={{ marginTop: "20px" }}>
        <h3>Attendance Summary</h3>
        {Object.keys(attendance).length === 0 ? (
          <p>No attendance data available.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Present</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendance).map(([subject, summary]) => {
                const present = summary.P || 0;
                return (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>{present}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <hr />

      {/* Marks Table */}
      <div style={{ marginTop: "20px" }}>
        <h3>Marks Summary</h3>
        {Object.keys(marks).length === 0 ? (
          <p>No marks data available.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Exam</th>
                <th>Scored</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(marks).map(([subject, examMap]) =>
                Object.entries(examMap).map(([examType, summary], idx) => {
                  const scored = summary?.scored ?? 0;
                  const total = summary?.total ?? 0;
                  const percentage = total === 0 ? 0 : (scored / total) * 100;
                  return (
                    <tr key={`${subject}-${examType}`}>
                      <td>{idx === 0 ? subject : ""}</td>
                      <td>{examType}</td>
                      <td>{scored}</td>
                      <td>{total}</td>
                      <td>{percentage.toFixed(2)}%</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
