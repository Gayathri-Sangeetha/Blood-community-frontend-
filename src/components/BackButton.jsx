import { useNavigate } from "react-router-dom";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      // If a specific path is provided, navigate there
      navigate(to);
    } else {
      // Otherwise, try to go back in history
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 w-full bg-gray-200 text-red-600 py-2 rounded-xl 
                 hover:bg-gray-300 transition-all duration-300"
    >
      ⬅ Back
    </button>
  );
};

export default BackButton;
