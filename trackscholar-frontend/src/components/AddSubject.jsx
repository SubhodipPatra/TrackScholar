import { useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminForms.css";
export default function AddSubject() {
  const [subject, setSubject] = useState({
    name: "",
    classId: "",
    teacherId: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/admin/subject", {
        name: subject.name,
        classId: subject.classId,
        teacherId: subject.teacherId,
      });
      alert("Subject added!");
      setSubject({ name: "", classId: "", teacherId: "" });
    } catch (err) {
      alert("Failed to add subject");
      console.error(err);
    }
  };

  return (
    <div className="admin-form">
      <h3>Add Subject</h3>
      <input
        placeholder="Subject Name"
        value={subject.name}
        onChange={(e) => setSubject({ ...subject, name: e.target.value })}
      />
      <input
        placeholder="Classroom ID"
        value={subject.classId}
        onChange={(e) => setSubject({ ...subject, classId: e.target.value })}
      />
      <input
        placeholder="Teacher ID"
        value={subject.teacherId}
        onChange={(e) => setSubject({ ...subject, teacherId: e.target.value })}
      />
      <button onClick={handleSubmit}>Add Subject</button>
    </div>
  );
}
