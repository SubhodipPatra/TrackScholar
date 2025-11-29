import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/student/me")
      .then(res => setProfile(res.data))
      .catch(err => console.error("Failed to fetch student profile", err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎓 Student Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Class:</strong> {profile.classroom?.name}</p>
    </div>
  );
}
