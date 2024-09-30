import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ServiceAvailabilityToggle from './ServiceAvailabilityToggle';
import { useTranslation } from 'react-i18next';

const DocumentTable = ({ fetchType, updateTo }) => {
 const [documents, setDocuments] = useState([]);
 const [doneDocuments, setDoneDocuments] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage] = useState(10);
 const { t, i18n } = useTranslation();

 const [isServiceAvailable, setIsServiceAvailable] = useState(true)

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
   const response = await axios.get(`https://dvlcadigitalkirkos.onrender.com/document/all/?file_status=${fetchType}`, {
    headers: {
     Authorization: `Token ${token}`,
    },
   });
   setDocuments(response.data);
  } catch (error) {
   console.error('Error fetching documents:', error);
  }
 };

 const fetchDoneDocuments = async () => {
  try {
   const response = await axios.get(`https://dvlcadigitalkirkos.onrender.com/document/all/?file_status=${updateTo}`, {
    headers: {
     Authorization: `Token ${token}`,
    },
   });
   setDoneDocuments(response.data);
  } catch (error) {
   console.error('Error fetching documents:', error);
  }
 };

 const updateDocumentStatus = async (id) => {
  try {
   const response = await axios.patch(`https://dvlcadigitalkirkos.onrender.com/document/update/${id}/`, { file_status: `${updateTo}` }, {
    headers: {
     Authorization: `Token ${token}`,
    },
   });
   fetchDocuments();
   fetchDoneDocuments();
   // showToastMessage(); 
  } catch (error) {
   console.error('Error updating document status:', error);
  }
 };

 const updateDocumentStatusUser2 = async (id, fileStatus) => {
  try {
   const response = await axios.patch(`https://dvlcadigitalkirkos.onrender.com/document/update/${id}/`, { file_status: `${fileStatus}` }, {
    headers: {
     Authorization: `Token ${token}`,
    },
   });
   fetchDocuments();
   fetchDoneDocuments();
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
   <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-semibold mb-4">
     Document List ({documents.length})
    </h1>
    {user.role === "admin" && <ServiceAvailabilityToggle />}
   </div>

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
      <th className="py-2 px-4 border-b">Actions</th>
     </tr>
    </thead>

    {/* <option value="service1">የተሽከርካሪ ዋጋ ግምት ለማሳወቅ</option>
              <option value="service2">ልዩ ልዩ አገልግሎቶች</option>
              <option value="service3">አመታዊ ምርመራ</option>
              <option value="service4">ቀረጥ ወይም ቀረጥ ነጻ ማንሳት </option>
              <option value="service4">የአገልግሎት ለውጥ </option>
              <option value="service4">መደበኛ ሰሌዳ መስጠት</option>
              <option value="service4">መደበኛ ሰሌዳ መስጠት</option>
              <option value="service4">ፋይል ዝውውር </option>
              <option value="service4">የሰሌዳ መመለስ</option>
              <option value="service4">መረጃ የሌለው</option>
              <option value="service4">የሰሌዳ ለውጥ</option> */}

    <tbody>
     {currentDocuments.map((document) => (
      <tr key={document.id}>
       <td className="py-2 px-4 border-b">{document.file_serial_number}</td>
       <td className="py-2 px-4 border-b">{document.service_type=="service1"?"የተሽከርካሪ ዋጋ ግምት ለማሳወቅ":document.service_type=="service2"?"ልዩ ልዩ አገልግሎቶች":document.service_type=="service3"?"አመታዊ ምርመራ":"ቀረጥ ወይም ቀረጥ ነጻ ማንሳት"}</td>
       <td className="py-2 px-4 border-b">
        {document.file_created_by.first_name} {document.file_created_by.last_name}
       </td>
       <td className="py-2 px-4 border-b">{new Date(document.created_at).toLocaleString()}</td>
       <td className="py-2 px-4 border-b">{new Date(document.updated_at).toLocaleString()}</td>
       <td className="flex py-2 border-b gap-3">
        <button
         onClick={() => updateDocumentStatus(document.id)}
         className="bg-blue-500 text-white px-4 py-2 rounded"
        >
         {fetchType === "start" ? "Check" : fetchType === "checked" ? "Scanned" : fetchType === "scanned" ? "Record" : fetchType === "requested" ? "Approve" : fetchType === "approved" ? "File Out" : "Recorded"}
        </button>

        {user.role === "user2" && fetchType === "start" && <button
         onClick={() => updateDocumentStatusUser2(document.id, 'uncheck')}
         className="bg-red-500 text-white px-4 py-2 rounded"
        >
         Unchek
        </button>}

        {user.role === "admin" && fetchType === "requested" && <button
         onClick={() => updateDocumentStatusUser2(document.id, 'disapproved')}
         className="bg-red-500 text-white px-4 py-2 rounded"
        >
         Disapproved
        </button>}

        {user.role === "user4" && fetchType === "approved" && <button
         onClick={() => updateDocumentStatusUser2(document.id, 'nofile')}
         className="bg-red-500 text-white px-4 py-2 rounded"
        >
         No File
        </button>}

        
       </td>
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
