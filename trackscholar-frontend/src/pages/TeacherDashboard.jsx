import ViewSubjects from "../components/ViewSubjects";

import AttendanceTable from "../components/AttendanceTable";
import MarksTable from "../components/MarksTable";
export default function TeacherDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2> Welcome, Teacher</h2>
      
<AttendanceTable />
<MarksTable />
      

    </div>
  );
}
