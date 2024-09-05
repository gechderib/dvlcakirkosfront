import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const YourWork = () => {
  const [fileProcesses, setFileProcesses] = useState([]);
  const [serviceForFilter, setServiceForFilter] = useState('');
  const [fileStatusFilter, setFileStatusFilter] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken'); // Get the token from local storage

      if (!token) {
        console.error('No auth token found');
        return;
      }

      try {
        const response = await axios.get('https://dvlcadigitalkirkos.onrender.com/document/filter/', {
          headers: {
            Authorization: `Token ${token}`, // Set the Authorization header with the token
          },
          params: {
            service_for: serviceForFilter,
            file_status: fileStatusFilter,
          },
        });
        console.log(response)
        setFileProcesses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [serviceForFilter, fileStatusFilter]);

  const handleServiceForChange = (e) => {
    setServiceForFilter(e.target.value);
  };

  const handleFileStatusChange = (e) => {
    setFileStatusFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <select
          onChange={handleServiceForChange}
          className="border border-gray-300 rounded-md p-2"
          value={serviceForFilter}
        >
          <option value="">Filter by Service For</option>
          <option value="driver">Driver</option>
          <option value="vehicle">Vehicle</option>
        </select>

        <select
          onChange={handleFileStatusChange}
          className="border border-gray-300 rounded-md p-2"
          value={fileStatusFilter}
        >
          <option value="">Filter by File Status</option>
          <option value="start">Start</option>
          <option value="checked">Checked</option>
          <option value="uncheck">Unchecked</option>
          <option value="scanned">Scanned</option>
          <option value="recorded">Recorded</option>
          <option value="requested">Requested</option>
          <option value="approved">Approved</option>
          <option value="fileout">File Out</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">File Serial Number</th>
            <th className="py-2 px-4 border-b">File Name</th>
            <th className="py-2 px-4 border-b">File Status</th>
            <th className="py-2 px-4 border-b">Service Type</th>
            <th className="py-2 px-4 border-b">Owner Name</th>
            <th className="py-2 px-4 border-b">Region</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {fileProcesses.map((fileProcess) => (
            <tr key={fileProcess.file_serial_number}>
              <td className="py-2 px-4 border-b">{fileProcess.file_serial_number}</td>
              <td className="py-2 px-4 border-b">{fileProcess.file_name}</td>
              <td className="py-2 px-4 border-b">{fileProcess.file_status}</td>
              <td className="py-2 px-4 border-b">{fileProcess.service_type}</td>
              <td className="py-2 px-4 border-b">{fileProcess.owner_name}</td>
              <td className="py-2 px-4 border-b">{fileProcess.region}</td>
              <td className="py-2 px-4 border-b">{new Date(fileProcess.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(fileProcess.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourWork;

