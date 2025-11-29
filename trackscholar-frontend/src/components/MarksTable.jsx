import { useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/MarksTable.css";

export default function MarksTable() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [examType, setExamType] = useState("FIRST_MIDSEM");
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/teacher/students/${classId}`);
      setStudents(res.data);
    } catch (err) {
      alert("Error fetching students");
    }
  };

  const handleInputChange = (studentId, field, value) => {
    setMarksData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (studentId) => {
    const data = marksData[studentId];
    if (!data?.marks || !data?.totalMarks) {
      return alert("Please enter both marks and total");
    }

    try {
      await axios.post("http://localhost:8080/teacher/marks", {
        studentId,
        subjectId,
        marks: data.marks,
        totalMarks: data.totalMarks,
        examType,
      });
      alert(`Marks uploaded for student ${studentId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to upload marks");
    }
  };

  return (
    <div className="marks-container">
      <h3>Upload Marks</h3>

      <input
        placeholder="Classroom ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />
      <input
        placeholder="Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      />
      <select value={examType} onChange={(e) => setExamType(e.target.value)}>
        <option value="FIRST_MIDSEM">1st Mid-Sem</option>
        <option value="SECOND_MIDSEM">2nd Mid-Sem</option>
        <option value="ENDSEM">End Sem</option>
      </select>

      <button onClick={fetchStudents}> Load Students</button>

      {students.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }} className="marks-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Total</th>
              <th>Upload</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>
                  <input
                    type="number"
                    value={marksData[s.id]?.marks || ""}
                    onChange={(e) => handleInputChange(s.id, "marks", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={marksData[s.id]?.totalMarks || ""}
                    onChange={(e) => handleInputChange(s.id, "totalMarks", e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleSubmit(s.id)}>📤 Submit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
