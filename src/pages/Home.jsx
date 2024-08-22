import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavLayout from '../components/NavLayout';

const Home = () => {
  const navigate = useNavigate();

  return (
    <NavLayout>
      <div className="flex flex-col items-center justify-center py-32 bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          የ አሽከርካሪ ተሽከርካሪ ፈቃድና ቁጥር ባለስልጣን አራዳ ቅርንጫፍ ጽፈት ቤት
        </h1>
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-4xl mb-8">
          <p className="text-lg text-gray-700 mb-4 md:mb-0 md:w-2/3">
            እንኳን ወደ መንጃ ፍቃድ እና ቁጥር ባለስልጣን አራዳ ቅርንጫፍ ጽ/ቤት ድህረ ገጽ በደህና መጡ። ዋና አላማችን አገልግሎቶቻችንን እና ስራዎችን በተመለከተ ከተጠቃሚዎች አስተያየቶችን እና አስተያየቶችን መቀበል ነው። የእርስዎን ግብአት ዋጋ እንሰጣለን እና ሀሳብዎን እንዲያካፍሉን እናበረታታዎታለን
          </p>
          <button
            onClick={() => navigate("/comment")}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 md:ml-4"
          >
            አስተያየት ይስጡ
          </button>
        </div>
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
          ዳይሬክተር: <span className="font-bold text-blue-900">ይታወስ ተሾመ</span>
          </h2>
          <h2 className="text-2xl font-semibold text-blue-700">
          አስተዳዳሪ: <span className="font-bold text-blue-900">ደረጀ መነምሻ</span>
          </h2>
        </div>
      </div>
    </NavLayout>
  );
};

export default Home;
