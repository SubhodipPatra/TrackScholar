import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminView.css";
export default function AViewSubjects() {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = () => {
    axios.get("/admin/subjects")
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  };

  const deleteSubject = async (id) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      await axios.delete(`/admin/subject/${id}`);
      fetchSubjects();
    } catch (err) {
      alert("Failed to delete subject.");
    }
  };

  useEffect(fetchSubjects, []);

  return (
    <div className="admin-table-container">
      <h3>All Subjects</h3>
      <table className="admin-table" border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Class</th><th>Teacher</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(sub => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.classroom?.name}</td>
              <td>{sub.teacher?.name}</td>
              <td>
                <button onClick={() => deleteSubject(sub.id)} >
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
