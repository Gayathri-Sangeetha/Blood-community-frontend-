import React from "react";

const AuthInput = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="text-red-600 font-semibold">{label}</label>
      <input
        type={type}
        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-red-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default AuthInput;
