import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const UserSatisfaction = ({ isHome = false }) => {
  const [data, setData] = useState({ weekly_user_satisfaction: [], overall_user_satisfaction: [] });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios.get("https://dvlcadigitalkirkos.onrender.com/comments/top_three/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {!isHome && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Weekly User Satisfaction</h2>
          {data.weekly_user_satisfaction.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={item.user.profile_pic}
                alt={`${item.user.first_name} ${item.user.last_name}`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>

                <h3 className="text-lg font-semibold">{item.user.first_name} {item.user.last_name}</h3>
                <p className="text-gray-600">Role: {item.user.role}</p>
                <p className="text-gray-600">Window Number: {item.user.window_number}</p>
                <p className="text-gray-600">Average Satisfaction: {item.average_satisfaction.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Weekly User Satisfaction</h2>
          {data.weekly_user_satisfaction.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={item.user.profile_pic}
                alt={`${item.user.first_name} ${item.user.last_name}`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>

                <h3 className="text-lg font-semibold">{item.user.first_name} {item.user.last_name}</h3>
                <p className="text-gray-600">Role: {item.user.role}</p>
                <p className="text-gray-600">Window Number: {item.user.window_number}</p>
                <p className="text-gray-600">Average Satisfaction: {item.average_satisfaction.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>


      </div>}

      {isHome &&
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-center">የሳምንቱ ምርጥ ፈፃሚወች</h2>
          <div className="md:flex gap-5">
            {data.weekly_user_satisfaction.slice(0, 3).map((item, index) => (
              <div key={index} className=" items-center mb-4">
                <img
                  src={item.user.profile_pic}
                  alt={`${item.user.first_name} ${item.user.last_name}`}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.user.first_name} {item.user.last_name}</h3>
                  <p className="text-gray-600">Role: {item.user.role}</p>
                  <p className="text-gray-600">Window Number: {item.user.window_number}</p>
                  <p className="text-gray-600">Average Satisfaction: {item.average_satisfaction.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>}
    </div>
  );
};

export default UserSatisfaction;
