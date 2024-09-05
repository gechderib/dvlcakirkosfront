import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingButton = ({isOther=false}) => {
 const navigate = useNavigate()
  return (
    <div className={`fixed  ${isOther?"right-32 bottom-20":"top-32 left-20"}`}>
      <button onClick={()=>{navigate("/")}} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-xl">
        Home {" >>"}
      </button>
    </div>
  );
};

export default FloatingButton;
