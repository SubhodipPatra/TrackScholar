import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

export default function ViewSubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/teacher/subjects")
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Your Subjects</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Classroom ID</th>
            <th>Classroom Name</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.classroom?.id}</td>
              <td>{sub.classroom?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
