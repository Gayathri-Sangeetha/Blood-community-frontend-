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
    <div className="min-h-screen bg-gradient-to-br from-rose-600 via-red-600 to-red-700 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 relative overflow-hidden">
      
      {/* Dynamic animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse top-0 -left-20" style={{animationDuration: '4s'}}></div>
        <div className="absolute w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-red-400 to-orange-400 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse bottom-0 -right-20" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse top-1/3 right-1/4" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full opacity-60 animate-float" style={{top: '15%', left: '10%', animationDelay: '0s'}}></div>
        <div className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full opacity-50 animate-float" style={{top: '25%', right: '15%', animationDelay: '1s'}}></div>
        <div className="absolute w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full opacity-40 animate-float" style={{bottom: '20%', left: '20%', animationDelay: '2s'}}></div>
        <div className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full opacity-70 animate-float" style={{top: '60%', right: '10%', animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <AuthCard>
        
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative inline-block mb-3 sm:mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 via-red-600 to-rose-600 rounded-full shadow-2xl">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 mb-1 sm:mb-2 px-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-medium px-2">Join our life-saving community 💝</p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4 sm:gap-5">

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

          
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-lg">
              <div className="absolute -top-2.5 sm:-top-3 left-3 sm:left-4 bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                <span className="text-xs sm:text-sm font-bold text-blue-600">📱 OTP Verification</span>
              </div>
              
              {/* OTP Input Section */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4 mt-2">
                <button
                  type="button"
                  onClick={sendOTP}
                  className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base
                           hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  🚀 Get OTP
                </button>

                <input
                  type="text"
                  maxLength={4}
                  placeholder="••••"
                  value={formData.otp}
                  onChange={(e) => handleChange("otp", e.target.value)}
                  className="w-full sm:flex-1 px-3 sm:px-4 py-3 sm:py-3.5 border-2 border-blue-300 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all text-center font-bold text-xl sm:text-2xl tracking-widest bg-white shadow-inner"
                />
              </div>

              <button
                type="button"
                onClick={verifyOTP}
                className={`w-full py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg transform hover:scale-105
                  ${otpVerified 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-300' 
                    : 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white hover:from-green-600 hover:via-green-700 hover:to-emerald-700 hover:shadow-xl'
                  }`}
                disabled={otpVerified}
              >
                {otpVerified ? '✓ Verified Successfully' : '🔐 Verify OTP'}
              </button>
            </div>

            <AuthButton title="Create Account" type="submit" />
          </form>

        
          <div className="flex items-center gap-3 sm:gap-4 my-5 sm:my-6">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 px-1 sm:px-2">OR</span>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <p className="text-center text-gray-700 text-sm sm:text-base px-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 cursor-pointer transition-all underline decoration-2 underline-offset-2"
            >
              Login here
            </span>
          </p>

          <BackButton onClick={() => navigate("/")} />
        </AuthCard>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Signup;