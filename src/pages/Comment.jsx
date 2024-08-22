import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketInfo from '../components/TicketInfo';
import NavLayout from '../components/NavLayout';

const Comment = () => {

 const [selectedUser, setSelectedUser] = useState({
  id: 1,
  profile_pic: 'https://via.placeholder.com/150',
  first_name: 'አበበ ',
  last_name: 'በቅለ',
 },);
 const [levelOfSatisfaction, setLevelOfSatisfaction] = useState("");
 const [content, setContent] = useState('');
 const [ticket, setTicket] = useState('');
 const [windowNumber, setWindowNumber] = useState("");

 const [isOpen, setIsOpen] = useState(false);
 const [commentType, setCommentType] = useState("touser");

 const [currentTicketNumber, setCurrentTicketNumber] = useState(null);
 const [lastTicketNumber, setLastTicketNumber] = useState(null);

 const [staffUsers, setStaffUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);




 const toggleDropdown = () => {
  setIsOpen(!isOpen);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(selectedUser)
  const data = {
   to_user: selectedUser['id'],
   level_of_satisfaction: levelOfSatisfaction,
   ticket: ticket,
   content: content,
   window_number: windowNumber,
  };

  console.log(data);

  try {
   const url = commentType == 'touser' ? 'https://driver-and-vehicle-license.onrender.com/comments/create/' : "https://driver-and-vehicle-license.onrender.com/comments/general/create/";
   await axios.post(url, data);
   alert('Comment submitted successfully');
  } catch (error) {
   console.error('Error submitting comment:', error);
  }
 };

 useEffect(() => {
  const eventSource = new EventSource('https://driver-and-vehicle-license.onrender.com/news/ticket-announcement-stream/');

  eventSource.onmessage = function (e) {
   const data = JSON.parse(e.data);
   setCurrentTicketNumber(data.current_ticket_number);
   setLastTicketNumber(data.last_ticket_number);
  };

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

  const fetchTickets = async () => {
   try {
    const response = await axios.get('https://driver-and-vehicle-license.onrender.com/news/ticket-announcement-stream/all/'); // replace with your API endpoint
    setCurrentTicketNumber(response.data[response.data.length-1].current_ticket_number);
    setLastTicketNumber(response.data[response.data.length-1].last_ticket_number);
    setLoading(false);
   } catch (error) {
    setError(error);
    setLoading(false);
   }
  };
  fetchTickets()
  fetchStaffUsers();

  return () => {
   eventSource.close();
  };


 }, []);

 return (
  <NavLayout>
   <div className='sm:flex gap-10 mb-5 mt-10 md:px-20'>

    <div className='sm:w-1/2 p-6 bg-white rounded-md shadow-md'>

     <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-10">
      <ul class="flex flex-wrap -mb-px">
       <li class="me-2 cursor-pointer" onClick={() => setCommentType("general")}>
        <a class={`inline-block p-4 ${commentType == 'general' ? "text-blue-600 border-b-2 border-blue-600" : ""} rounded-t-lg active `}>ጠቅላላ አስተያየት</a>
       </li>
       <li class="me-2 cursor-pointer" onClick={() => setCommentType("touser")}>
        <a class={`inline-block p-4 ${commentType == 'touser' ? "text-blue-600 border-b-2 border-blue-600" : ""} rounded-t-lg active `}>አገልግሎት ለሰጦት ሰው አስተያየት ይስጡ</a>
       </li>
      </ul>
     </div>

     {commentType == 'touser' && <label htmlFor="user" className="block text-sm font-medium text-gray-700">አገልግሎት የሰጦት ሰው</label>}
     {commentType == 'touser' && <div className="relative ">
      <button
       onClick={toggleDropdown}
       className="flex justify-between items-center py-2 bg-gray-200 px-3 text-gray-500 w-full mb-3 rounded-md focus:outline-none"
      >
       <span>{selectedUser ? selectedUser.first_name + " " + selectedUser.last_name : "Select a User"}</span>
       <svg
        className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'
         }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
       >
        <path
         fillRule="evenodd"
         d="M5.23 7.21a.75.75 0 011.06 0L10 10.878l3.71-3.67a.75.75 0 011.06 1.06l-4 3.96a.75.75 0 01-1.06 0l-4-3.96a.75.75 0 010-1.06z"
         clipRule="evenodd"
        />
       </svg>
      </button>

      {isOpen && (
       <div className="absolute right-0 mt-2 w-full origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1">
         {staffUsers.map((user) => (
          <div
           key={user.id}
           onClick={() => { toggleDropdown(); setSelectedUser(user) }}
           className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
           <img
            src={user.profile_pic}
            alt="User"
            className="w-20 h-20 "
           />
           <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
             {user.first_name}
            </p>
            <p className="text-sm text-gray-500">{user.last_name}</p>
           </div>
          </div>
         ))}
        </div>
       </div>
      )}
     </div>}


     <form onSubmit={handleSubmit} className="">
      {<div className="mb-4">
       <label htmlFor="level_of_satisfaction" className="block text-sm font-medium text-gray-700">የ እርካታ መጠን ከ ፭</label>

       <input
        type="number"
        id="level_of_satisfaction"
        value={levelOfSatisfaction}
        onChange={(e) => setLevelOfSatisfaction(e.target.value)}
        class="bg-gray-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" placeholder="አገልግሎቶን ክ ፭ ይመዝኑ"
        min="1"
        max="5"
       ></input>

      </div>}

      {commentType == 'touser' && <div className="mb-4">
       <label htmlFor="ticket" className="block text-sm font-medium text-gray-700">የቲኬት ቁጥር</label>

       <input
        type="number"
        id="ticket"
        value={ticket}
        onChange={(e) => setTicket(e.target.value)}
        class="bg-gray-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" placeholder="የቲኬት ቁጥር ያስገቡ"
       ></input>
      </div>}

      {commentType == 'touser' && <div className="mb-4">
       <label htmlFor="window_number" className="block text-sm font-medium text-gray-700">የመስኮት ቁጥር</label>
       <input
        type="text"
        id="window_number"
        value={windowNumber}
        onChange={(e) => setWindowNumber(e.target.value)}
        class="bg-gray-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" placeholder="የመስኮት ቁጥር ያስገቡ"
       ></input>
      </div>}


      <div className="mb-4">
       <label htmlFor="level_of_satisfaction" className="block text-sm font-medium text-gray-700">አስተያየት</label>
       <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        class="bg-gray-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" placeholder="አስተያየት"
        rows={4}
       ></textarea>


      </div>
      <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      አስተያየት ይላኩ
      </button>
     </form>

    </div>

    <div className='sm:w-1/2'>
     <TicketInfo
      currentTicket={currentTicketNumber}
      awaitingTickets={Number(lastTicketNumber) - Number(currentTicketNumber)}
      totalTickets={lastTicketNumber}
     />
    </div>

   </div>
  </NavLayout>
 );
};

export default Comment;
