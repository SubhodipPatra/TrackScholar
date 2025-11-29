import { useState } from "react";
import axios from "../utils/axiosConfig";

export default function ClassAttendanceSummary() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAttendanceSummary = async () => {
    if (!classId || !subjectId) {
      setError("Please enter both classroom ID and subject ID.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await axios.get(
        `/teacher/attendance-summary/class/${classId}/subject/${subjectId}`
      );
      setSummary(res.data || []);
    } catch (err) {
      console.error(err);
      setError(" Failed to fetch attendance summary.");
    } finally {
      setLoading(false);
    }
  };

  const calculateAttendanceTotals = (attendance) => {
    const present = attendance?.["P"] || 0;
    const absent = attendance?.["A"] || 0;
    return { present, absent };
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2> Class Attendance Summary</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter Classroom ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          style={{ padding: "8px", width: "180px", marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Enter Subject ID"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ padding: "8px", width: "180px", marginRight: "10px" }}
        />
        <button
          onClick={fetchAttendanceSummary}
          style={{
            padding: "8px 14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Fetch Summary
        </button>
      </div>

      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && summary.length > 0 && (
        <table
          border="1"
          cellPadding="8"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fdfdfd",
            fontSize: "14px",
          }}
        >
          <thead style={{ backgroundColor: "#eee" }}>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Present</th>
              <th>Wrong</th>
              <th>Net Present</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((student) => {
              const { present, absent } = calculateAttendanceTotals(student.attendance);

              return (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td style={{ color: "green" }}>{present}</td>
                  <td style={{ color: "red" }}>{absent}</td>
                  <td>{present - absent}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {!loading && summary.length === 0 && classId && subjectId && !error && (
        <p>No attendance records found for this class and subject.</p>
      )}
    </div>
  );
}
