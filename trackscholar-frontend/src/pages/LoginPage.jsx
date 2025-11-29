import { useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const authHeader = btoa(`${email}:${password}`);

    try {
      const res = await axios.get("/auth/me", {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      });

      const role = res.data.role;
      localStorage.setItem("auth", authHeader);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "TEACHER") navigate("/teacher/dashboard");
      else if (role === "STUDENT") navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Invalid email or password.");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "100px auto",
      padding: "30px",
      backgroundColor: "#FFFFFF", // White
      borderRadius: "12px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
      color: "#1B263B",
      border: "1px solid #D6D6D6",
    }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="icon.jpg"
          alt="Logo"
          style={{
            height: "100px",
            width: "100px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </div>

      <h2 style={{ textAlign: "center", color: "#1B263B" }}>🎓 Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          style={{
            width: "100%",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #D6D6D6", // Grey
            fontSize: "14px",
            backgroundColor: "#FFFFFF", // White
            color: "#1B263B",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={{
            width: "100%",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #D6D6D6",
            fontSize: "14px",
            backgroundColor: "#FFFFFF",
            color: "#1B263B",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4D96FF", // Sky Blue
            color: "#FFFFFF",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
