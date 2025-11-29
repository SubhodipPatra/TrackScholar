import { useState } from "react";
import axios from "../utils/axiosConfig";

export default function MarkAttendance() {
  const [data, setData] = useState({
    studentId: "",
    subjectId: "",
    status: "P" // "P" or "A"
  });

  const mark = async () => {
    await axios.post("http://localhost:8080/teacher/attendance", data);
    alert("Attendance marked");
  };

  return (
    <div>
      <h3>Mark Attendance</h3>
      <input placeholder="Student ID" value={data.studentId} onChange={(e) => setData({ ...data, studentId: e.target.value })} />
      <input placeholder="Subject ID" value={data.subjectId} onChange={(e) => setData({ ...data, subjectId: e.target.value })} />
      <select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}>
        <option value="P">Present</option>
        <option value="A">Absent</option>
      </select>
      <button onClick={mark}>Mark</button>
    </div>
  );
}
