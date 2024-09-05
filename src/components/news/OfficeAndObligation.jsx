import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfficeAndObligation = () => {
  const [obligations, setObligations] = useState([]);
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObligations = async () => {
      try {
        const obligationsResponse = await axios.get('https://dvlcadigitalkirkos.onrender.com/news/obligations');
        setObligations(obligationsResponse.data);
      } catch (err) {
        setError('Failed to fetch obligations');
      }
    };

    const fetchOffices = async () => {
      try {
        const officesResponse = await axios.get('https://dvlcadigitalkirkos.onrender.com/news/office');
        setOffices(officesResponse.data);
      } catch (err) {
        setError('Failed to fetch offices');
      }
    };

    Promise.all([fetchObligations(), fetchOffices()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Obligations</h2>
        <ul className="space-y-4">
          {obligations.map(obligation => (
            <li key={obligation.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50">
              {obligation.content}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Offices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {offices.map(office => (
            <div key={office.id} className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold mb-2">{office.name}</h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Rooms:</span> {office.start_room} - {office.end_room}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Description:</span> {office.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficeAndObligation;


