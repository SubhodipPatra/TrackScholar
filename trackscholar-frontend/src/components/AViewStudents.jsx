import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminView.css";
export default function AViewStudents() {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    axios.get("/admin/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`/admin/student/${id}`);
      fetchStudents();
    } catch (err) {
      alert("Failed to delete student.");
    }
  };

  useEffect(fetchStudents, []);

  return (
    <div className="admin-table-container">
      <h3>All Students</h3>
      <table className="admin-table" border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Classroom</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.name}</td><td>{s.email}</td>
              <td>{s.classroom?.name}</td>
              <td>
                <button onClick={() => deleteStudent(s.id)} >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
