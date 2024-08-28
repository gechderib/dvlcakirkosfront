import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DocumentTable = ({ fetchType, updateTo }) => {
 const [documents, setDocuments] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage] = useState(10);

 const token = localStorage.getItem('authToken');

 const user = JSON.parse(localStorage.getItem('user'))

 useEffect(() => {
  fetchDocuments();
 }, []);

 //  const showToastMessage = () => {
 //   toast.success("File Successfully checked !", {
 //     position: toast.POSITION.TOP_RIGHT,
 //   });
 // };

 const fetchDocuments = async () => {
  try {
   const response = await axios.get(`https://driver-and-vehicle-license.onrender.com/document/all/?file_status=${fetchType}`, {
    headers: {
     Authorization: `Token ${token}`,
    },
   });
   setDocuments(response.data);
  } catch (error) {
   console.error('Error fetching documents:', error);
  }
 };

 const updateDocumentStatus = async (id) => {
  try {
   const response = await axios.patch(`https://driver-and-vehicle-license.onrender.com/document/update/${id}/`, { file_status: `${updateTo}` }, {
    headers: {
     Authorization: `Token ${token}`,
    },
   });
   fetchDocuments();
   // showToastMessage(); 
  } catch (error) {
   console.error('Error updating document status:', error);
  }
 };

 const handleSearch = (e) => {
  setSearchQuery(e.target.value);
 };

 // Pagination logic
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentDocuments = documents.filter(document =>
  document.file_serial_number.includes(searchQuery) ||
  document.created_at.includes(searchQuery) ||
  document.updated_at.includes(searchQuery)
 ).slice(indexOfFirstItem, indexOfLastItem);

 const totalPages = Math.ceil(documents.length / itemsPerPage);

 return (
  <div className="container mx-auto p-4">
   <h1 className="text-2xl font-semibold mb-4">Document List</h1>

   <input
    type="text"
    placeholder="Search by file serial number, created at or updated at"
    value={searchQuery}
    onChange={handleSearch}
    className="mb-4 p-2 border border-gray-300 rounded w-full"
   />


   <table className="min-w-full bg-white text-center">
    <thead>
     <tr>
      <th className="py-2 px-4 border-b">File Serial Number</th>
      <th className="py-2 px-4 border-b">File Name</th>
      <th className="py-2 px-4 border-b">Created By</th>
      <th className="py-2 px-4 border-b">Created At</th>
      <th className="py-2 px-4 border-b">Updated At</th>
      {user.role != "admin" && <th className="py-2 px-4 border-b">Actions</th>}
     </tr>
    </thead>
    <tbody>
     {currentDocuments.map((document) => (
      <tr key={document.id}>
       <td className="py-2 px-4 border-b">{document.file_serial_number}</td>
       <td className="py-2 px-4 border-b">{document.file_name}</td>
       <td className="py-2 px-4 border-b">
        {document.file_created_by.first_name} {document.file_created_by.last_name}
       </td>
       <td className="py-2 px-4 border-b">{new Date(document.created_at).toLocaleString()}</td>
       <td className="py-2 px-4 border-b">{new Date(document.updated_at).toLocaleString()}</td>
       {user.role != "admin" && <td className="py-2 px-4 border-b">
        <button
         onClick={() => updateDocumentStatus(document.id)}
         className="bg-blue-500 text-white px-4 py-2 rounded"
        >
         {fetchType === "start" ? "Check" : fetchType === "checked" ? "Scanned" : fetchType === "scanned" ? "Record" : "Recorded"}
         {/* Check */}
        </button>
       </td>}
      </tr>
     ))}
    </tbody>
   </table>

   {/* Pagination */}
   <div className="flex justify-center mt-4">
    <button
     onClick={() => setCurrentPage(currentPage - 1)}
     disabled={currentPage === 1}
     className="mx-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    >
     Previous
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
     <button
      key={i + 1}
      onClick={() => setCurrentPage(i + 1)}
      className={`mx-2 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
     >
      {i + 1}
     </button>
    ))}
    <button
     onClick={() => setCurrentPage(currentPage + 1)}
     disabled={currentPage === totalPages}
     className="mx-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    >
     Next
    </button>
   </div>
  </div>
 );
};

export default DocumentTable;
