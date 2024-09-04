import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLayout from '../components/NavLayout';
import TicketInfo from '../components/TicketInfo';
import axios from 'axios';
import UserSatisfaction from '../components/UserSatisfaction';
import { useTranslation } from 'react-i18next';
import MissionVision from '../components/MissionVision';

const Home = () => {
  const navigate = useNavigate();
  const [currentTicketNumber, setCurrentTicketNumber] = useState(null);
  const [lastTicketNumber, setLastTicketNumber] = useState(null);
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAvailable, setIsAvailable] = useState(null);


  useEffect(() => {
    // const eventSource = new EventSource('https://driver-and-vehicle-license.onrender.com/news/ticket-announcement-stream/');

    // eventSource.onmessage = function (e) {
    //   const data = JSON.parse(e.data);
    //   setCurrentTicketNumber(data.current_ticket_number);
    //   setLastTicketNumber(data.last_ticket_number);
    // };
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

    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://driver-and-vehicle-license.onrender.com/news/ticket-announcement-stream/all/');
        setCurrentTicketNumber(response.data[response.data.length - 1].current_ticket_number);
        setLastTicketNumber(response.data[response.data.length - 1].last_ticket_number);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError(error);
        setLoading(false);
      }
    };
    fetchTickets()
    fetchAvailabilityStatus()


    // return () => {
    //   eventSource.close();
    // };


  }, []);
  return (
    <NavLayout>
      <div className=" py-20 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">

        <div className='bg-white rounded flex flex-col items-center justify-center py-14 mx-56'>
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8 w-2/3">
          የ አሽከርካሪ ተሽከርካሪ ፈቃድና ቁጥር ባለስልጣን አራዳ ቅርንጫፍ ጽፈት ቤት
        </h1>
        <p className="text-lg text-gray-700 mb-4 md:mb-10 md:w-2/3 text-center bg-5">
          እንኳን ወደ መንጃ ፍቃድ እና ቁጥር ባለስልጣን አራዳ ቅርንጫፍ ጽ/ቤት ድህረ ገጽ በደህና መጡ። ዋና አላማችን አገልግሎቶቻችንን እና ስራዎችን በተመለከተ ከተጠቃሚዎች አስተያየቶችን እና አስተያየቶችን መቀበል ነው። የእርስዎን ግብአት ዋጋ እንሰጣለን እና ሀሳብዎን እንዲያካፍሉን እናበረታታዎታለን
        </p>
        <button
          onClick={() => navigate("/comment")}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 md:ml-4"
        >
          አስተያየት ይስጡ
        </button>
       </div>
      </div>
      <div className='sm:flex h-full items-center justify-center'>
        <div>
          {
            isAvailable ? <TicketInfo
              isLoading={loading}
              error={error}
              currentTicket={currentTicketNumber}
              awaitingTickets={Number(lastTicketNumber) - Number(currentTicketNumber)}
              totalTickets={lastTicketNumber}
            /> : <div className='text-lg px-2 flex flex-col gap-2 mt-5'>
              <p className='font-bold text-3xl underline'>አገልግሎት የለም </p>
              <p>ውድ ደንበኛችን የአሽከርካሪ ተሽከርካሪ ፍቃድና ቁጥር ባለስልጣን አራዳ ቅርንጫፍ ጽ/ቤት ስለተጠቀማቹ እናመሰግናለን </p>
              <p>የምንሠራው ለተወሰኑ ቀናት ብቻ ስለሆነ አገልግሎታችን በአሁኑ ጊዜ የማይገኝ መሆኑን ለማሳወቅ እንወዳለን። </p>
              <p>እባክዎን የአገልግሎት መርሃ ግብራችንን ይመልከቱ ወይም በሚቀጥለው የአገልግሎት ቀን ላይ ለበለጠ መረጃ ያግኙን። </p>
              <p>የእርስዎን ግንዛቤ እናመሰግናለን እናም በቅርቡ እርስዎን ለማገልገል በጉጉት እንጠባበቃለን።</p>

            </div>
          }
        </div>
        <div>
          <UserSatisfaction isHome={true} />
        </div>
      </div>

      <MissionVision/>

    </NavLayout>
  );
};

export default Home;
