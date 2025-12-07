import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
const Home = () => {//arrow function
  const navigate = useNavigate();//declared use navigate function inside navigate variable

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center text-white relative px-4 overflow-x-hidden">

      <button
        onClick={() => navigate("/admin-login")}
        className="absolute top-4 right-4 bg-white text-red-600 font-semibold py-2 px-4 rounded-xl shadow-lg
                   hover:bg-red-100 transition-all duration-300 text-sm md:text-base"
      >
        🔐 Admin
      </button>

      
      <div className="flex flex-col items-center justify-center flex-grow">

        
        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg text-center">
          Blood Community Network
        </h1>

        <p className="text-base md:text-xl mt-2 opacity-90 text-center">
          Connecting Donors. Saving Lives. ❤️
        </p>

        <div className="flex flex-wrap gap-8 mt-12 justify-center w-full">

       
          <PrimaryButton 
            title="LOGIN" 
            onClick={() => navigate("/login")} 
          />

          <PrimaryButton 
            title="SIGN-UP" 
            onClick={() => navigate("/sign-up")} 
          />

        </div>
      </div>

    </div>
  );
};

export default Home;
