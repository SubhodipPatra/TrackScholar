import React, { useState } from "react";
import axios from "../utils/axiosConfig";

export default function ViewAttendanceByFilter() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("/teacher/attendance", {
        params: { classId, subjectId, date },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      alert("Failed to fetch attendance.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>View Attendance Records</h3>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Subject ID"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={fetchAttendance} style={{ padding: "8px 12px" }}>
          Fetch
        </button>
      </div>

      {records.length > 0 ? (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.student.id}</td>
                <td>{r.student.name}</td>
                <td>{r.status}</td>
                <td>{r.date}</td>
                <td>{r.subject.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
}
