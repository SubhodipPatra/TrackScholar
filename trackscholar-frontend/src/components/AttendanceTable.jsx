import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AttendanceTable.css";

export default function AttendanceTable() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/teacher/students/${classId}`);
      setStudents(res.data);
      const defaultStatus = {};
      res.data.forEach((s) => {
        defaultStatus[s.id] = "A"; 
      });
      setAttendanceStatus(defaultStatus);
    } catch (err) {
      alert("Error fetching students");
    }
  };

  const toggleAttendance = async (studentId) => {
    const currentStatus = attendanceStatus[studentId];
    const newStatus = currentStatus === "P" ? "A" : "P";

    try {
      await axios.post("http://localhost:8080/teacher/attendance", {
        studentId,
        subjectId,
        status: newStatus,
      });

      setAttendanceStatus((prev) => ({
        ...prev,
        [studentId]: newStatus,
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance");
    }
  };

  return (
    <div className="attendance-container">
      <h3> Mark Attendance</h3>
      <input
        placeholder="Classroom ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />
      <input
        placeholder="Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      />
      <button onClick={fetchStudents}>Load Students</button>

      {students.length > 0 && (
        <>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
             Present: {
              Object.values(attendanceStatus).filter((s) => s === "P").length
            } / {students.length}
          </p>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const status = attendanceStatus[s.id];
                return (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>
                      <button
                        onClick={() => toggleAttendance(s.id)}
                        className={
                          status === "P"
                            ? "btn-present active"
                            : "btn-absent active"
                        }
                      >
                        {status === "P" ? " Present" : " Absent"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
