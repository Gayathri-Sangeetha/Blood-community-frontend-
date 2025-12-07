import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import BackButton from "../components/BackButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert("User not found. Please sign up.");
      navigate("/sign-up");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    alert("Login successful!");
    navigate("/button-page");
  };

  return (
    <AuthCard>
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        🩸 User Login
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton title="Login" type="submit" />
      </form>

      <p className="text-center text-red-600 mt-4">
        Don't have an account?{" "}
        <span
          className="font-bold underline cursor-pointer"
          onClick={() => navigate("/sign-up")}
        >
          Signup
        </span>
      </p>

      <BackButton onClick={() => navigate("/")} />
    </AuthCard>
  );
};

export default Login;
