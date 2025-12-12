import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-600 to-red-800 flex flex-col items-center text-white relative px-4 py-6 overflow-x-hidden">

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-40" style={{top: '10%', left: '10%', animation: 'float 6s infinite ease-in-out'}}></div>
        <div className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-30" style={{top: '60%', left: '85%', animation: 'float 8s infinite ease-in-out 1s'}}></div>
        <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-50" style={{top: '40%', left: '5%', animation: 'float 7s infinite ease-in-out 2s'}}></div>
        <div className="absolute w-2.5 h-2.5 sm:w-4 sm:h-4 bg-red-300 rounded-full opacity-20" style={{top: '15%', right: '15%', animation: 'float 9s infinite ease-in-out 0.5s'}}></div>
        <div className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-red-200 rounded-full opacity-25" style={{bottom: '25%', left: '20%', animation: 'float 10s infinite ease-in-out 1.5s'}}></div>
      </div>

      {/* Admin Button */}
      <button
        onClick={() => navigate("/admin-login")}
        className="absolute top-3 right-3 bg-white text-red-600 font-semibold py-1.5 px-3 rounded-lg shadow-md
                   hover:bg-red-100 transition-all duration-300 text-xs sm:text-sm z-20"
      >
        🔐 Admin
      </button>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-grow mt-4 sm:mt-8 relative z-10 w-full max-w-4xl">

        {/* Hero Section with Icon */}
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-red-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative bg-white bg-opacity-10 backdrop-blur-md p-4 sm:p-6 rounded-full border-2 sm:border-4 border-white border-opacity-30 shadow-2xl">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight mb-3 sm:mb-4
                       drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] tracking-tight px-2">
          Blood Community Network
        </h1>

        <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-white rounded-full mb-3 sm:mb-4 opacity-80"></div>

        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light text-center px-4 mb-6 sm:mb-8 drop-shadow-lg">
          Connecting Donors. Saving Lives. ❤️
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10 max-w-xs sm:max-w-lg px-4">
          <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white border-opacity-30 shadow-lg">
            🚀 Instant Connect
          </span>
          <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white border-opacity-30 shadow-lg">
            🩸 Real-Time Updates
          </span>
          <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white border-opacity-30 shadow-lg">
            💪 Community Driven
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full max-w-xs sm:max-w-md justify-center px-4">
          <PrimaryButton 
            title="LOGIN" 
            onClick={() => navigate("/login")}
          />

          <PrimaryButton 
            title="SIGN-UP" 
            onClick={() => navigate("/sign-up")}
          />
        </div>

        {/* Bottom tagline */}
        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-xs sm:text-sm opacity-75 italic">
            "Be someone's hero today"
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>

    </div>
  );
};

export default Home;