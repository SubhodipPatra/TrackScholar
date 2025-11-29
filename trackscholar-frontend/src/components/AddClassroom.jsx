import { useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminForms.css";
export default function AddClassroom() {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    await axios.post("http://localhost:8080/admin/classroom", { name });
    alert("Classroom added");
    setName("");
  };

  return (
    <div className="admin-form">
      <h3>Add Classroom</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Classroom Name" />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
