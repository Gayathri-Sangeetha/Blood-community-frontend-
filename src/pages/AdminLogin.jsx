import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import BackButton from "../components/BackButton";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin123") {
      alert("Login Successful");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthCard>
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        🔐 Admin Login
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton title="Login" type="submit" />
      </form>

      <BackButton onClick={() => navigate("/")} />
    </AuthCard>
  );
};

export default AdminLogin;
