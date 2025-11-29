import { useState } from "react";
import axios from "../utils/axiosConfig";

export default function ViewStudents() {
  const [classId, setClassId] = useState("");
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get(`http://localhost:8080/teacher/students/${classId}`);
    setStudents(res.data);
  };

  return (
    <div>
      <h3>View Students</h3>
      <input
        placeholder="Classroom ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />
      <button onClick={fetchStudents}>Fetch Students</button>

      <ul>
        {students.map(s => (
          <li key={s.id}>{s.id}:{s.name} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
}
