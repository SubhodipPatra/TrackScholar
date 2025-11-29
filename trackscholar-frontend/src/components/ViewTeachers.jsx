import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminView.css";

export default function ViewTeachers() {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = () => {
    axios.get("/admin/teachers")
      .then(res => setTeachers(res.data))
      .catch(err => console.error("Error fetching teachers:", err));
  };

  const deleteTeacher = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    try {
      await axios.delete(`/admin/teacher/${id}`);
      fetchTeachers();
    } catch (err) {
      alert("Failed to delete teacher.");
    }
  };

  useEffect(fetchTeachers, []);

  return (
    <div className="admin-table-container">
      <h3>All Teachers</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }} className="admin-table"> 
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>
                <button onClick={() => deleteTeacher(t.id)} >
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
