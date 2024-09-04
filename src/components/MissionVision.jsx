import React from "react";

const MissionVision = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-8 space-y-16 sm:space-y-0 sm:space-x-16">
      {/* Vision Card */}
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src="https://img.icons8.com/ios-filled/100/000000/light-on.png"
          alt="Vision"
          className="w-32 h-32 md:w-40 md:h-40 filter"
          style={{ filter: "invert(35%) sepia(10%) saturate(7070%) hue-rotate(177deg) brightness(103%) contrast(104%)" }}
        />
        <h2 className="text-3xl font-bold text-blue-900">
          ራዕይ (Vision)
        </h2>
        <p className="text-3xl text-gray-700 max-w-2xl">
          የእኛ ራዕይ በ2022 እ.ኤ.አ በመጨረሻው እንደ ኢንዱስትሪ አለምአቀፍ መሆን እና ምርጥነት መመስረት እንደ ተፈጥሮ ማምለጥ እና ኢንነትን እንዲያንቁ።
        </p>
      </div>

      {/* Mission Card */}
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src="https://img.icons8.com/ios-filled/100/000000/goal.png"
          alt="Mission"
          className="w-32 h-32 md:w-40 md:h-40"
          style={{ filter: "invert(35%) sepia(10%) saturate(7070%) hue-rotate(177deg) brightness(103%) contrast(104%)" }}
        />
        <h2 className="text-3xl font-bold text-blue-900">
          ተልዕኮ (Mission)
        </h2>
        <p className="text-3xl text-gray-700 max-w-2xl">
          የእኛ ተልዕኮ ምርጥ እንቅስቃሴ እና ማሳርፍ በኢንዱስትሪ ምርጥ ተጠቃሚ እንዲሆኑ እንዲሞላቸው ብቃትን ተሞልቀን እንደ ምርጥ እንዲተረጉም እና ማሳርፍን እንደ እንቅስቃሴ እንድናንቁ።
        </p>
      </div>
    </div>
  );
};

export default MissionVision;
