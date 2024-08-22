import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RegisterModal from './Register';

const UsersTable = () => {

  const [staffUsers, setStaffUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {

    const fetchStaffUsers = async () => {
      try {
        const response = await axios.get('https://driver-and-vehicle-license.onrender.com/users/staff-users/'); // replace with your API endpoint
        setStaffUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchStaffUsers();

  }, []);

  const renderUsers = () => {
    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error: {error.message}</div>
    } else {
      return staffUsers.map(user => (
        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
          <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
            <img className="w-10 h-10 rounded-full" src={user.profile_pic} alt={`${user.first_name} ${user.last_name}`}></img>
            <div className="ps-3">
              <div className="text-base font-semibold">{user.first_name} {user.last_name}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            {user.phone_number}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              {user.role}
            </div>
          </td>
          <td className="px-6 py-4">
            <a href="#" className="font-medium text-blue-600 hover:underline">Edit user</a>
          </td>
        </tr>
      ));
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className='flex justify-end mb-5'>
        <div onClick={()=>{handleOpenModal()}} className='bg-blue-500 cursor-pointer text-white w-40 px-3 py-2 text-center'>ሰራተኞችን ይጨምሩ
        </div>
        <RegisterModal isOpen={isModalOpen} onClose={()=>{handleCloseModal}}/>
      </div>
      <div className="h-96 overflow-y-auto"> {/* Set fixed height and enable vertical scrolling */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
              ሙሉ ስም
              </th>
              <th scope="col" className="px-6 py-3">
              ስልክ ቁጥር
              </th>
              <th scope="col" className="px-6 py-3">
              የስራ ሃላፊነት
              </th>
              <th scope="col" className="px-6 py-3">
              ድርጊት
              </th>
            </tr>
          </thead>
          <tbody>
            {renderUsers()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
