import { useNavigate } from "react-router-dom";

const BackButton = ({ to = "/" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="mt-4 w-full bg-gray-200 text-red-600 py-2 rounded-xl 
                 hover:bg-gray-300 transition-all duration-300"
    >
      ⬅ Back to Home
    </button>
  );
};

export default BackButton;
