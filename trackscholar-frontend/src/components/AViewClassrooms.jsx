import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminView.css";

export default function AViewClassrooms() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("/admin/classrooms");
      setClasses(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching classrooms:", err);
      setError("Failed to load classrooms.");
    } finally {
      setLoading(false);
    }
  };

  const deleteClassroom = async (id) => {
    if (!window.confirm("Delete this classroom?")) return;
    try {
      await axios.delete(`/admin/classroom/${id}`);
      fetchClasses();
    } catch (err) {
      console.error("Error deleting classroom:", err);
      alert("Failed to delete classroom.");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  if (loading) return <p>Loading classrooms...</p>;

  return (
    <div className="admin-table-container">
      <h3>All Classrooms</h3>

      {error && <div className="error">{error}</div>}

      {classes.length === 0 ? (
        <p>No classrooms found.</p>
      ) : (
        <table className="admin-table" border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <tr key={cls.id}>
                <td>{cls.id}</td>
                <td>{cls.name}</td>
                <td>
                  <button onClick={() => deleteClassroom(cls.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
