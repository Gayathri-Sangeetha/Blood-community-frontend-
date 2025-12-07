import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import BackButton from "../components/BackButton";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // Handle input change
  const handleChange = (key, value) =>
    setFormData({ ...formData, [key]: value });

  // Generate OTP
  const sendOTP = () => {
    if (!formData.name || !formData.email) {
      alert("Please enter name and email first");
      return;
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp);

    alert(`Your OTP is: ${otp}`);
  };

  // Verify OTP
  const verifyOTP = () => {
    if (formData.otp === generatedOTP) {
      setOtpVerified(true);
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP");
    }
  };

  // Final Signup
  const handleSignup = (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Verify OTP before creating account");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((u) => u.email === formData.email);
    if (exists) {
      alert("Email already registered. Login instead.");
      navigate("/login");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <AuthCard>
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        🩸 User Signup
      </h2>

      <form onSubmit={handleSignup} className="flex flex-col gap-5">

        <AuthInput
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* OTP Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={sendOTP}
            className="w-1/2 bg-blue-500 text-white py-3 rounded-xl"
          >
            Get OTP
          </button>

          <input
            type="text"
            maxLength={4}
            placeholder="OTP"
            value={formData.otp}
            onChange={(e) => handleChange("otp", e.target.value)}
            className="w-1/2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="button"
          onClick={verifyOTP}
          className="w-full bg-green-600 text-white py-3 rounded-xl"
        >
          Verify OTP
        </button>

        <AuthButton title="Create Account" type="submit" />
      </form>

      <p className="text-center text-red-600 mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="underline font-bold cursor-pointer"
        >
          Login
        </span>
      </p>

      <BackButton onClick={() => navigate("/")} />
    </AuthCard>
  );
};

export default Signup;
