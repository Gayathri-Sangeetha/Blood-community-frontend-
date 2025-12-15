import React from "react";
import PrimaryButton from "./PrimaryButton"; // Your existing button component
import { useNavigate } from "react-router-dom";

const ActionCard = ({ iconPath, title, subtitle, buttonText, onClick }) => {
  return (
    <div className="flex-1 max-w-md mx-auto w-full sm:mx-0">
      <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-white to-red-50 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={iconPath} />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-red-50">{subtitle}</p>
        </div>
        <PrimaryButton
          title={buttonText}
          onClick={onClick}
          className="w-full shadow-xl hover:shadow-2xl transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default ActionCard;
