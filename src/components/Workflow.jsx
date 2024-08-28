import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentForm = () => {
  const [fileSerialNumber, setFileSerialNumber] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    };

    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from local storage
      if (!token) {
        throw new Error('No authentication token found.');
      }

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
      setSuccess('File created successfully!');
    } catch (error) {
      console.error('There was an error creating the file!', error);
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(`Error: ${error.response.data.detail || 'Failed to create file. Please try again later.'}`);
      } else if (error.request) {
        // Request was made but no response was received
        setError('No response from server. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex">
      {/* Form for adding a new document */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-xl mb-4">Add Document</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">File Serial Number</label>
            <input
              type="text"
              value={fileSerialNumber}
              onChange={(e) => setFileSerialNumber(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">File Content</label>
            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </div>

      {/* Table displaying documents */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-xl mb-4">Documents</h2>
        <div className="overflow-y-auto h-3/4"> {/* Make the table scrollable */}
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-4">ID</th>
                <th className="border border-gray-300 p-4">Serial Number</th>
                <th className="border border-gray-300 p-4">Name</th>
                <th className="border border-gray-300 p-4">Content</th>
                <th className="border border-gray-300 p-4">Created At</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="border border-gray-300 p-4">{doc.id}</td>
                  <td className="border border-gray-300 p-4">{doc.file_serial_number}</td>
                  <td className="border border-gray-300 p-4">{doc.file_name}</td>
                  <td className="border border-gray-300 p-4">{doc.file_content}</td>
                  <td className="border border-gray-300 p-4">{new Date(doc.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
