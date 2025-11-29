import { useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminForms.css";
export default function RegisterStudent() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classId, setClassId] = useState("");

  const handleRegister = async () => {
    try {
      const student = { id, name, email, password, role: "STUDENT" };
      await axios.post(`/admin/student/${classId}`, student);
      alert("Student registered successfully");
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setClassId("");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }} className="admin-form">
      <h3>Register Student</h3>
      <input
        type="number"
        placeholder="Student ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="Classroom ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleRegister}>Register Student</button>
    </div>
  );
}
