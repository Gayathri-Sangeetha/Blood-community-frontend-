import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ActionCard from "../components/ActionCard";

const ButtonPage = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-rose-800 flex flex-col items-center text-white relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
        
        {/* Header with buttons */}
        <div className="w-full pt-4 sm:pt-6 pb-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="group bg-white/95 backdrop-blur-sm text-red-600 font-semibold py-2.5 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-300 text-sm sm:text-base flex items-center gap-2 hover:scale-105"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Profile Button */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="group bg-white/95 backdrop-blur-sm text-red-600 font-semibold py-2.5 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-300 text-sm sm:text-base flex items-center gap-2 hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Profile</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${openMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile dropdown */}
              {openMenu && (
                <div className="absolute top-full mt-3 right-0 w-72 sm:w-80 bg-white/98 backdrop-blur-xl text-gray-800 rounded-3xl shadow-2xl p-5 sm:p-6 border border-red-100 z-50">
                  
                  {/* User Info Card */}
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-4 mb-4 border border-red-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {(storedUser?.name || "G")[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg text-red-700 mb-0.5 truncate">
                          {storedUser?.name || "Guest User"}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {storedUser?.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5">
                    <button
                      onClick={() => navigate("/donation-details")}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Donation Details
                    </button>

                    <button
                      onClick={() => navigate(`/requester-details/${storedUser?.email}`)}
                      className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3.5 rounded-2xl hover:from-rose-600 hover:to-rose-700 transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Requester Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col items-center justify-center py-8 sm:py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto px-4">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <p className="text-xs sm:text-sm font-semibold text-white/90 tracking-wider">SAVE LIVES TODAY</p>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-50 to-white drop-shadow-2xl">
                Blood Community 
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100">
                Network
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-red-50 font-medium max-w-2xl mx-auto leading-relaxed">
              Together we can make a difference. Donate, request, and support those in need
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-stretch">
              
              {/* Donate Blood Card */}
              <ActionCard
                iconPath="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                title="Donate Blood"
                subtitle="Be a hero, save lives"
                buttonText="DONATE NOW"
                onClick={() => navigate("/donar-dashboard")}
              />

              {/* Request Blood Card */}
              <ActionCard
                iconPath="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                title="Request Blood"
                subtitle="Get help when needed"
                buttonText="REQUEST NOW"
                onClick={() => navigate("/requester-dashboard")}
              />

            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="py-6 text-center">
          <p className="text-xs sm:text-sm text-red-100/80">
            Available 24/7 • Secure • Confidential
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;