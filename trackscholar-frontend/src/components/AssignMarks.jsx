import { useState } from "react";
import axios from "../utils/axiosConfig";

export default function AssignMarks() {
  const [data, setData] = useState({
    studentId: "",
    subjectId: "",
    marks: "",
    totalMarks: ""
  });

  const assign = async () => {
    await axios.post("http://localhost:8080/teacher/marks", data);
    alert("Marks assigned");
  };

  return (
    <div>
      <h3>Assign Marks</h3>
      <input placeholder="Student ID" value={data.studentId} onChange={(e) => setData({ ...data, studentId: e.target.value })} />
      <input placeholder="Subject ID" value={data.subjectId} onChange={(e) => setData({ ...data, subjectId: e.target.value })} />
      <input placeholder="Marks" value={data.marks} onChange={(e) => setData({ ...data, marks: e.target.value })} />
      <input placeholder="Total Marks" value={data.totalMarks} onChange={(e) => setData({ ...data, totalMarks: e.target.value })} />
      <button onClick={assign}>Assign</button>
    </div>
  );
}
