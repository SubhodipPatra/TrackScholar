import AddClassroom from "../components/AddClassroom";
import RegisterTeacher from "../components/RegisterTeacher";
import RegisterStudent from "../components/RegisterStudent";
import AddSubject from "../components/AddSubject";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2> Welcome, Admin</h2>
      <AddClassroom />
      <RegisterTeacher />
      <RegisterStudent />
      <AddSubject />
    </div>
  );
}