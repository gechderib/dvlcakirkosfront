import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Service = () => {
  const [driverServices, setDriverServices] = useState([]);
  const [vehicleServices, setVehicleServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeServiceId, setActiveServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://driver-and-vehicle-license.onrender.com/services/all/');
        const services = response.data;
        
        // Split services based on their type
        setDriverServices(services.filter(service => service.service_type === 'driver'));
        setVehicleServices(services.filter(service => service.service_type === 'vehicle'));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleAccordion = (id) => {
    setActiveServiceId(activeServiceId === id ? null : id);
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column: Driver Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Vehicle Services</h3>
          <div className="space-y-4">
            {vehicleServices.map(service => (
              <div key={service.id} className="border border-gray-300 rounded-lg shadow-md bg-white">
                <button
                  className="w-full text-left p-4 font-semibold text-lg bg-gray-100 rounded-t-lg hover:bg-gray-200 focus:outline-none"
                  onClick={() => toggleAccordion(service.id)}
                >
                  {service.service_name}
                </button>
                {activeServiceId === service.id && (
                  <div className="p-4">
                    <p className="mb-2"><span className="font-semibold">Service Time:</span> {service.service_time} minutes</p>
                    <p className="mb-2"><span className="font-semibold">Service Quality:</span> {service.service_quality}%</p>
                    {service.prerequisites.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {service.prerequisites.map(prerequisite => (
                          <li key={prerequisite.id} className="text-gray-700">{prerequisite.description}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No prerequisites.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Driver Services</h3>
          <div className="space-y-4">
            {driverServices.map(service => (
              <div key={service.id} className="border border-gray-300 rounded-lg shadow-md bg-white">
                <button
                  className="w-full text-left p-4 font-semibold text-lg bg-gray-100 rounded-t-lg hover:bg-gray-200 focus:outline-none"
                  onClick={() => toggleAccordion(service.id)}
                >
                  {service.service_name}
                </button>
                {activeServiceId === service.id && (
                  <div className="p-4">
                    <p className="mb-2"><span className="font-semibold">Service Time:</span> {service.service_time} minutes</p>
                    <p className="mb-2"><span className="font-semibold">Service Quality:</span> {service.service_quality}%</p>
                    {service.prerequisites.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {service.prerequisites.map(prerequisite => (
                          <li key={prerequisite.id} className="text-gray-700">{prerequisite.description}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No prerequisites.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Vehicle Services */}
     
      </div>
    </div>
  );
};

export default Service;
