import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceAvailabilityToggle = () => {
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current availability status when the component mounts
    fetchAvailabilityStatus();
  }, []);

  const fetchAvailabilityStatus = async () => {
    try {
      const response = await axios.get('https://driver-and-vehicle-license.onrender.com/document/service-availability/');
      setIsAvailable(response.data.is_available);
      setLoading(false);
    } catch (err) {
      setError('Error fetching the service availability status');
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      const newStatus = !isAvailable; // Toggle the current status
      await axios.put('https://driver-and-vehicle-license.onrender.com/document/service-availability/', {
        is_available: newStatus,
      });
      setIsAvailable(newStatus); // Update state to reflect the new status
    } catch (err) {
      setError('Error updating the service availability status');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className={`${isAvailable?'text-green-600':'text-red-600'}`}>Service is currently {isAvailable ? 'Available' : 'Unavailable'}</h1>
      <button onClick={toggleAvailability} className={`${isAvailable?"bg-green-600":"bg-red-600"} px-4 py-2 rounded-xl text-white`}>
        {isAvailable ? 'Make Service Unavailable' : 'Make Service Available'}
      </button>
    </div>
  );
};

export default ServiceAvailabilityToggle;
