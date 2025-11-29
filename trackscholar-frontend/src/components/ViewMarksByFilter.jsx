import React, { useState } from "react";
import axios from "../utils/axiosConfig";

export default function ViewMarksByFilter() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
 const [examType, setExamType] = useState(""); // not "FIRST_MIDSEM"

  const [marks, setMarks] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mark?")) {
      await axios.delete(`/teacher/marks/${id}`);
      alert(" Deleted successfully");
      fetchMarks();
    }
  };

  const handleEdit = async (mark) => {
    const newMarks = prompt("Enter new marks", mark.marks);
    const newTotal = prompt("Enter new total marks", mark.totalMarks);

    if (newMarks !== null && newTotal !== null) {
      await axios.put(`/teacher/marks/${mark.id}`, {
        marks: newMarks,
        totalMarks: newTotal,
      });
      alert(" Updated successfully");
      fetchMarks();
    }
  };

  const fetchMarks = async () => {
    try {
      const res = await axios.get(`/teacher/marks`, {
        params: {
          classId,
          subjectId,
          examType,
        },
      });
      setMarks(res.data);
    } catch (err) {
      console.error("Error fetching marks:", err);
      alert(" Failed to fetch marks.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3> View Marks by Filter</h3>

      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Classroom ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          placeholder="Subject ID"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />
       <select
  value={examType}
  onChange={(e) => setExamType(e.target.value)}
  style={{ marginRight: "10px", padding: "8px" }}
>
  <option value="" disabled>Select Exam</option>
  <option value="FIRST_MIDSEM">1st Mid-Sem</option>
  <option value="SECOND_MIDSEM">2nd Mid-Sem</option>
  <option value="ENDSEM">End Sem</option>
</select>


        <button onClick={fetchMarks} style={{ padding: "8px 16px" }}>
          Get Marks
        </button>
      </div>

      {marks.length > 0 ? (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Total Marks</th>
              <th>Exam</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.id}>
                <td>{m.student.id}</td>
                <td>{m.student.name}</td>
                <td>{m.subject.name}</td>
                <td>{m.marks}</td>
                <td>{m.totalMarks}</td>
                <td>{m.examName}</td>
                <td>
                  <button onClick={() => handleEdit(m)}>Edit</button>
                  <button onClick={() => handleDelete(m.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No marks data found.</p>
      )}
    </div>
  );
}
