import React from "react";

const PrimaryButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-xs bg-white text-red-600 font-semibold text-lg md:text-xl py-6
                 rounded-2xl shadow-xl hover:bg-red-100 hover:-translate-y-2 transition-all duration-300"
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
