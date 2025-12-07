import React from "react";

const AuthCard = ({ children }) => {
  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
