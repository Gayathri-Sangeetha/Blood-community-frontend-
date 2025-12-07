import React from "react";

const AuthButton = ({ title, type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl shadow-lg
                 hover:bg-red-700 transition-all"
    >
      {title}
    </button>
  );
};

export default AuthButton;
