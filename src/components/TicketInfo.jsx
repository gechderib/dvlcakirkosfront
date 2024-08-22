import React from 'react';
import { format } from 'date-fns';

const TicketInfo = ({ currentTicket, awaitingTickets, totalTickets }) => {
  const currentDate = format(new Date(), 'PPPP'); // Format the date using date-fns

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg h-full">
      <div className="mb-4 text-xl font-semibold text-gray-600 underline">የቲኬት መረጃ</div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
        <div className="p-4 bg-gray-100 rounded-md text-center">
          <div className="text-sm sm:text-xl text-gray-500">የአሁኑ ቀን</div>
          <div className="text-xl lg:text-2xl md:text-xl font-bold text-gray-900">{currentDate}</div>
        </div>

        <div className="p-4 bg-gray-100 rounded-md text-center">
          <div className="text-sm sm:text-xl text-gray-500">የአሁኑ የቲኬት ቁጥር</div>
          <div className="text-xl lg:text-2xl md:text-xl font-bold text-gray-900">{currentTicket}</div>
        </div>

        <div className="p-4 bg-gray-100 rounded-md text-center">
          <div className="text-sm sm:text-xl text-gray-500">ትኬቶችን በመጠባበቅ ላይ</div>
          <div className="text-xl lg:text-2xl md:text-xl font-bold text-gray-900">{awaitingTickets}</div>
        </div>

        <div className="p-4 bg-gray-100 rounded-md text-center">
          <div className="text-sm sm:text-xl text-gray-500">ጠቅላላ ትኬቶች</div>
          <div className="text-xl lg:text-2xl md:text-xl font-bold text-gray-900">{totalTickets}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
