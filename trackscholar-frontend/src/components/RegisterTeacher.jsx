import { useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminForms.css";
export default function RegisterTeacher() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    await axios.post("http://localhost:8080/admin/teacher", data);
    alert("Teacher registered");
    setData({ name: "", email: "", password: "" });
  };

  return (
    <div className="admin-form">
      <h3>Register Teacher</h3>
      <input placeholder="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
      <input placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
