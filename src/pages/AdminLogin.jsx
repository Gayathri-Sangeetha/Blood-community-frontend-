import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    //temporary checking 
    if (email === "admin@gmail.com" && password === "admin123") {
      alert("Login Successful!");
      navigate("/admin-dashboard"); 
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          🔐 Admin Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-red-600 font-semibold">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none
                         focus:ring-2 focus:ring-red-400"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

         
          <div>
            <label className="text-red-600 font-semibold">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none
                         focus:ring-2 focus:ring-red-400"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl shadow-lg
                       hover:bg-red-700 transition-all"
          >
            Login
          </button>

        </form>

      
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-200 text-red-600 py-2 rounded-xl hover:bg-gray-300 transition-all"
        >
          ⬅ Back to Home
        </button>

      </div>
    </div>
  );
};

export default AdminLogin;
