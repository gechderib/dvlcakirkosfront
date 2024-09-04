import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const DocumentForm = () => {
  const [fileSerialNumber, setFileSerialNumber] = useState('');
  const [fileName, setFileName] = useState('aaa');
  const [fileContent, setFileContent] = useState('');
  const [serviceFor, setServiceFor] = useState('vehicle');
  const [serviceType, setServiceType] = useState('')
  const [plateCode, setPlateCode] = useState('');
  const [region, setRegion] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [licenseType, setLicenseType] = useState('');

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [selected, setSelected] = useState('existingFile');
  const { t, i18n } = useTranslation();

  // Handle checkbox change


  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        if (!token) {
          throw new Error('No authentication token found.');
        }
        const response = await axios.get('https://driver-and-vehicle-license.onrender.com/document/all/?file_status=start', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error('There was an error fetching the documents!', error);
      }
    };

    fetchDocuments();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const newFile = {
      file_serial_number: fileSerialNumber,
      file_name: fileName,
      file_content: fileContent,
      service_for: serviceFor,
      plate_code: plateCode,
      region: region,
      owner_name: ownerName,
      driver_license_number: driverLicenseNumber,
      license_type: licenseType,
      service_type: serviceType,
    };

    console.log(newFile)

    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from local storage
      if (!token) {
        throw new Error('No authentication token found.');
      }
      const file_data = await axios.get(`https://driver-and-vehicle-license.onrender.com/document/fileprocess/${fileSerialNumber}/`);
      if (!file_data.data.exists && selected === "newFile") {
        const response = await axios.post('https://driver-and-vehicle-license.onrender.com/document/create/', newFile, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setDocuments([...documents, response.data]);
        setFileSerialNumber('');
        setFileName('');
        setFileContent('');
        setServiceFor('');
        setPlateCode('');
        setRegion('');
        setOwnerName('');
        setDriverLicenseNumber('');
        setLicenseType('');
        setServiceType('');
        setSuccess('File created successfully!');
      }

      if (file_data.data.exists && selected === "newFile") {
        const fileId = file_data.data.file.id;

        const updateResponse = await axios.patch(`https://driver-and-vehicle-license.onrender.com/document/update/${fileId}/`, {
          ...newFile,
          file_status: "start",
        }, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const filteredData = documents.filter(doc => doc.id != fileId)
        setDocuments([...filteredData, updateResponse.data]);

        setFileSerialNumber('');
        setFileName('');
        setFileContent('');
        setServiceFor();
        setPlateCode('');
        setRegion('');
        setOwnerName('');
        setDriverLicenseNumber('');
        setLicenseType('');
        setSuccess('File successfully requested');
      }

      if (file_data.data.exists && selected === "existingFile") {
        const fileId = file_data.data.file.id;
        const updateResponse = await axios.patch(`https://driver-and-vehicle-license.onrender.com/document/update/${fileId}/`, {
          file_status: file_data.data.file.file_status === "fileout"?"start":"requested",
        }, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        // const filteredData = documents.filter(doc => doc.id != fileId)
        // setDocuments(...filteredData);

        setFileSerialNumber('');
        setFileName('');
        setFileContent('');
        setServiceFor();
        setPlateCode('');
        setRegion('');
        setOwnerName('');
        setDriverLicenseNumber('');
        setLicenseType('');
        setSuccess('File successfully requested');
      }

      if (!file_data.data.exists && selected === "existingFile") {
        const response = await axios.post('https://driver-and-vehicle-license.onrender.com/document/create/', { ...newFile, file_status: "requested" }, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        // const filteredData = documents.filter(doc => doc.id != fileId)
        // setDocuments(...filteredData);

        setFileSerialNumber('');
        setFileName('');
        setFileContent('');
        setServiceFor();
        setPlateCode('');
        setRegion('');
        setOwnerName('');
        setDriverLicenseNumber('');
        setLicenseType('');
        setSuccess('File successfully requested');
      }

    } catch (error) {
      console.error('There was an error creating the file!', error);
      if (error.response) {
        setError(`Error: ${error.response.data.detail || 'Failed to create file. Please try again later.'}`);
      } else if (error.request) {
        setError('No response from server. Please check your connection and try again.');
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex">
      {/* Form for adding a new document */}
      <div className="md:w-full p-4">
        {/* <h2 className="text-xl mb-4">Add Document</h2> */}

        <label className="block text-gray-700 mb-3">Document Type</label>
        <ul class="mx-auto grid max-w-full w-full grid-cols-2 gap-x-5 px-8 mb-5">
        <li class="" onClick={() => { setSelected("existingFile") }}>
            <label class={`flex justify-center cursor-pointer rounded-full border py-2 px-4 focus:outline-none transition-all duration-500 ease-in-out ${selected == "existingFile" ? "border-blue-500 font-bold bg-blue-600 text-white" : "border-gray-300 bg-white"}  `}>Existing File</label>
          </li>
          <li class="" onClick={() => { setSelected("newFile") }}>
            <label class={`flex justify-center cursor-pointer rounded-full border py-2 px-4 focus:outline-none transition-all duration-500 ease-in-out ${selected == "newFile" ? "border-blue-500 font-bold bg-blue-600 text-white" : "border-gray-300 bg-white"}  `}>New File</label>
          </li>        
        </ul>

        <label className="block text-gray-700 mb-3">Service For</label>
        <ul class="mx-auto grid max-w-full w-full grid-cols-2 gap-x-5 px-8 mb-5">
          <li class="" onClick={() => { setServiceFor("vehicle") }}>
            <label class={`flex justify-center cursor-pointer rounded-full border  py-2 px-4  focus:outline-none transition-all duration-500 ease-in-out ${serviceFor == "vehicle" ? "border-blue-500 font-bold bg-blue-600 text-white" : "border-gray-300 bg-white"}  `}>Vehicle</label>
          </li>
          <li class="" onClick={() => { setServiceFor("driver") }}>
            <label class={`flex justify-center cursor-pointer rounded-full border py-2 px-4  focus:outline-none transition-all duration-500 ease-in-out ${serviceFor == "driver" ? "border-blue-500 font-bold bg-blue-600 text-white" : "border-gray-300 bg-white"}  `}>Driver</label>
          </li>
        </ul>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Plate Number</label>
            <input
              type="text"
              value={fileSerialNumber}
              onChange={(e) => setFileSerialNumber(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div> */}


         {serviceFor === "vehicle" && <div className="mb-4">
            <label className="block text-gray-700">Owner Name</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required={serviceFor === "vehicle"}

            />
          </div>}
          { serviceFor === "driver" && <div className="mb-4">
            <label className="block text-gray-700">Driver License Number</label>
            <input
              type="text"
              value={driverLicenseNumber}
              onChange={(e) => setDriverLicenseNumber(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required={serviceFor === "driver"}

            />
          </div>}
          {serviceFor === "vehicle" && <div className="mb-4">
            <label className="block text-gray-700">Plate Code</label>
            <select
              value={plateCode}
              onChange={(e) => setPlateCode(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required={serviceFor === "vehicle"}
            >
              <option value="">Select Plate Code</option>
              <option value="plate1">1</option>
              <option value="plate2">2</option>
              <option value="plate3">3</option>
              <option value="plate4">4</option>
              <option value="plate4">5</option>
              <option value="plate4">EU</option>
              <option value="plate4">CD</option>
              <option value="plate4">UN</option>

            </select>
          </div>}
          {serviceFor === "vehicle" && <div className="mb-4">
            <label className="block text-gray-700">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required={serviceFor === "vehicle"}

            >
              <option value="">Select Region</option>
              <option value="aa">Addis Ababa</option>
              <option value="et">Ethiopia</option>
            </select>
          </div>}

          {serviceFor === "vehicle" && <div className="mb-4">
            <label className="block text-gray-700">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required={serviceFor === "vehicle"}
            >
              <option value="">Select License Type</option>
              <option value="service1">Service One</option>
              <option value="service2">Service Two</option>
              <option value="service3">Service Three</option>
              <option value="service4">Service Four</option>
            </select>
          </div>}

          {serviceFor === "driver" && <div className="mb-4">
            <label className="block text-gray-700">License Type</label>
            <select
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required={serviceFor === "driver"}

            >
              <option value="">Select License Type</option>
              <option value="level1">License One</option>
              <option value="level2">License Two</option>
              <option value="level3">License Three</option>
              <option value="level4">License Four</option>
            </select>
          </div>}
          {/* <div className="mb-4">
            <label className="block text-gray-700">File Content</label>
            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"

            ></textarea>
          </div> */}
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : !loading && selected == "newFile"? "Add New File": "Request Approval"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>

      {/* Documents List */}
      {/* <div className="md:w-1/2 p-4">
        <h2 className="text-xl mb-4">Documents List</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">File Serial Number</th>
              <th className="border p-2">File Name</th>
              <th className="border p-2">File Status</th>
              <th className="border p-2">Service For</th>
              <th className="border p-2">Plate Code</th>
              <th className="border p-2">Region</th>
              <th className="border p-2">Owner Name</th>
              <th className="border p-2">Driver License Number</th>
              <th className="border p-2">License Type</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="border p-2">{doc.file_serial_number}</td>
                <td className="border p-2">{doc.file_name}</td>
                <td className="border p-2">{doc.file_status}</td>
                <td className="border p-2">{doc.service_for}</td>
                <td className="border p-2">{doc.plate_code}</td>
                <td className="border p-2">{doc.region}</td>
                <td className="border p-2">{doc.owner_name}</td>
                <td className="border p-2">{doc.driver_license_number}</td>
                <td className="border p-2">{doc.license_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default DocumentForm;
