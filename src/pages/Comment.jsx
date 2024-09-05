import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketInfo from '../components/TicketInfo';
import NavLayout from '../components/NavLayout';
import { useTranslation } from 'react-i18next';
import FloatingButton from '../components/FloatingButton';

const Comment = () => {
 const [selectedUser, setSelectedUser] = useState({
  id: 1,
  profile_pic: 'https://via.placeholder.com/150',
  first_name: 'አበበ',
  last_name: 'በቅለ',
  role: "user1",
  phone_number: '0966778899',
  window_number: '456'
 });
 const [levelOfSatisfaction, setLevelOfSatisfaction] = useState("");
 const [content, setContent] = useState('');
 const [ticket, setTicket] = useState('');
 const [windowNumber, setWindowNumber] = useState("");

 const [isOpen, setIsOpen] = useState(false);
 const [commentType, setCommentType] = useState("touser");

 const [staffUsers, setStaffUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const [isCommenting, setIsCommenting] = useState(false)
 const { t, i18n } = useTranslation();

 const satisfactionLevels = [
  { value: 1, emoji: '😡', description: 'በጣም አልረካም' },
  { value: 2, emoji: '😟', description: 'አልረካም' },
  { value: 3, emoji: '😐', description: 'መካከለኛ' },
  { value: 4, emoji: '🙂', description: 'ረክቻለሁ' },
  { value: 5, emoji: '😁', description: 'በጣም ረክቻለሁ' },
 ];

 const toggleDropdown = () => {
  setIsOpen(!isOpen);
 };

 const handleSatisfactionClick = (value) => {
  setLevelOfSatisfaction(value);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsCommenting(true);
  const data = {
   to_user: selectedUser['id'],
   level_of_satisfaction: levelOfSatisfaction,
   ticket: ticket,
   content: content,
   window_number: selectedUser.window_number,
  };

  try {
   const url = commentType === 'touser' ? 'https://dvlcadigitalkirkos.onrender.com/comments/create/' : "https://dvlcadigitalkirkos.onrender.com/comments/general/create/";
   const response = await axios.post(url, data);
   if (response.status === 201) {
    setIsCommenting(false);
    alert('Comment submitted successfully');
   } else {
    setIsCommenting(false);
    alert('Failed to submit comment');
   }
  } catch (error) {
   setIsCommenting(false);
   alert('Failed to submit comment');
   console.error('Error submitting comment:', error);
  }
 };

 useEffect(() => {
  const eventSource = new EventSource('https://dvlcadigitalkirkos.onrender.com/news/ticket-announcement-stream/');

  eventSource.onmessage = function (e) {
   const data = JSON.parse(e.data);
   setCurrentTicketNumber(data.current_ticket_number);
   setLastTicketNumber(data.last_ticket_number);
  };

  const fetchStaffUsers = async () => {
   try {
    const response = await axios.get('https://dvlcadigitalkirkos.onrender.com/users/staff-users/');
    setStaffUsers(response.data);
    setLoading(false);
   } catch (error) {
    setError(error);
    setLoading(false);
   }
  };

  const fetchTickets = async () => {
   try {
    const response = await axios.get('https://dvlcadigitalkirkos.onrender.com/news/ticket-announcement-stream/all/');
    setCurrentTicketNumber(response.data[response.data.length - 1].current_ticket_number);
    setLastTicketNumber(response.data[response.data.length - 1].last_ticket_number);
    setLoading(false);
   } catch (error) {
    setError(error);
    setLoading(false);
   }
  };

  fetchTickets();
  fetchStaffUsers();

  return () => {
   eventSource.close();
  };
 }, []);

 return (
  <NavLayout>
   {/* <FloatingButton/> */}
   <FloatingButton isOther={true}/>
   <div className='sm:flex gap-10 mb-5 mt-10 md:px-20'>
    <div className='sm:w-full p-6 bg-white rounded-md shadow-md'>
     <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-10">
      <ul className="flex flex-wrap -mb-px">
       <li className="me-2 cursor-pointer" onClick={() => setCommentType("general")}>
        <a className={`inline-block p-4 ${commentType === 'general' ? "text-blue-600 border-b-2 border-blue-600" : ""} rounded-t-lg active`}>ጠቅላላ አስተያየት</a>
       </li>
       <li className="me-2 cursor-pointer" onClick={() => setCommentType("touser")}>
        <a className={`inline-block p-4 ${commentType === 'touser' ? "text-blue-600 border-b-2 border-blue-600" : ""} rounded-t-lg active`}>አገልግሎት ለሰጦት ሰው አስተያየት ይስጡ</a>
       </li>
      </ul>
     </div>

     {commentType === 'touser' && (
      <>
       <label htmlFor="user" className="block text-sm font-medium text-gray-700">አገልግሎት የሰጦት ሰው</label>
       <div className="relative mb-4">
        <button
         onClick={toggleDropdown}
         className="flex justify-between items-center py-2 bg-gray-200 px-3 text-gray-500 w-full mb-3 rounded-md focus:outline-none"
        >
         <span>{selectedUser ? selectedUser.first_name + " " + selectedUser.last_name : "Select a User"}</span>
         <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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
          <div className="py-1 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
           {staffUsers.map((user) => (
            <div
             key={user.id}
             onClick={() => { toggleDropdown(); setSelectedUser(user); }}
             className="flex flex-col items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2 justify-between mb-5"
            >
             <img
              src={user.profile_pic}
              alt="User"
              className="w-44 h-44 object-cover"
             />
             <p className="text-xl font-bold">
              {user.first_name} {user.last_name}
             </p>
             <p className="text-sm">
              መስኮት ቁጥር:{user.window_number}
             </p>
            </div>
           ))}
          </div>
         </div>
        )}
       </div>
      </>
     )}

     <form onSubmit={handleSubmit} className="">
      {commentType === 'touser' && (
       <div className="mb-4">
        <label htmlFor="window_number" className="block text-sm font-medium text-gray-700">የመስኮት ቁጥር</label>
        <input
         type="text"
         disabled
         id="window_number"
         value={selectedUser.window_number}
         onChange={(e) => setWindowNumber(selectedUser.window_number)}
         className="bg-gray-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
         placeholder="የመስኮት ቁጥር ያስገቡ"
        />
       </div>
      )}

      <div className="mb-4">
       <label htmlFor="level_of_satisfaction" className="block text-sm font-medium text-gray-700">የ እርካታ መጠን</label>
       <div className="flex gap-2">
        {satisfactionLevels.map(({ value, emoji, description }) => (
         <button
          key={value}
          type="button"
          onClick={() => handleSatisfactionClick(value)}
          className={`p-2 text-2xl ${levelOfSatisfaction === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg focus:outline-none`}
          aria-label={description}
          title={description}
         >
          {emoji} {description}
         </button>
        ))}
       </div>
      </div>

      {commentType === 'touser' && <div className="mb-4">
       <label htmlFor="ticket" className="block text-sm font-medium text-gray-700">የትኬት ቁጥር</label>
       <input
        type="text"
        id="ticket"
        value={ticket}
        onChange={(e) => setTicket(e.target.value)}
        className="bg-gray-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        placeholder="የትኬት ቁጥር ያስገቡ"
       />
      </div>}

      <div className="mb-4">
       <label htmlFor="content" className="block text-sm font-medium text-gray-700">አስተያየት</label>
       <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-gray-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        rows="4"
        placeholder="አስተያየት ያስገቡ"
       />
      </div>

      <button
       type="submit"
       className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-700"
      >

       {!isCommenting ? "አስተያየት ላክ" : <div>
        አስተያየት በመላክ ላይ 
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
       </div>
       }
      </button>
     </form>
    </div>

   </div>
  </NavLayout>
 );
};

export default Comment;
