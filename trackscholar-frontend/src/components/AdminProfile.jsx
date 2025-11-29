import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/admin/me")
      .then(res => setProfile(res.data))
      .catch(err => console.error("Failed to fetch admin profile", err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Admin Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
}
