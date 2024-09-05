import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Ticket = () => {
  const [currentTicketNumber, setCurrentTicketNumber] = useState();
  const [lastTicketNumber, setLastTicketNumber] = useState();
  const [responseMessage, setResponseMessage] = useState('');
  const [previousTickets, setPreviousTickets] = useState([]);
  const { t, i18n } = useTranslation();

  // Fetch previous tickets excluding the current one
  useEffect(() => {
    const fetchPreviousTickets = async () => {
      try {
        const response = await fetch('https://dvlcadigitalkirkos.onrender.com/news/ticket-announcement-stream/all');
        if (response.ok) {
          const tickets = await response.json();
          // Filter out the current ticket
          const filteredTickets = tickets.filter(ticket => ticket.current_ticket_number !== String(currentTicketNumber));
          setPreviousTickets(filteredTickets);
        } else {
          console.error('Failed to fetch previous tickets.');
        }
      } catch (error) {
        console.error('Error fetching previous tickets:', error);
      }
    };

    fetchPreviousTickets();
  }, [currentTicketNumber]);

  const handleSubmit = async () => {
    const data = {
      current_ticket_number: currentTicketNumber,
      last_ticket_number: lastTicketNumber,
    };

    try {
      const response = await fetch('https://dvlcadigitalkirkos.onrender.com/news/ticket-announcement-stream/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage('Ticket announcement successfully sent.');
        console.log(result);
      } else {
        setResponseMessage('Failed to send ticket announcement.');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setResponseMessage('Error occurred while sending the request.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex">
      {/* Previous Tickets List */}
      <div className="w-1/4 h-96 overflow-scroll bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">ቀዳሚ ቲኬቶች</h2>
        <ul className="space-y-2">
          {previousTickets.map((ticket) => (
            <li key={ticket.id} className="p-2 bg-white rounded-md shadow-sm">
              <p className="text-sm">በመጠበቅ ላይ ያሉ ሰውች: {ticket.current_ticket_number}</p>
              <p className="text-sm">የመጨረሻው ትኬት : {ticket.last_ticket_number}</p>
              <p className="text-xs text-gray-500">የዘመነ በ
              : {new Date(ticket.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Ticket Announcement Form */}
      <div className="w-3/4 bg-white shadow-md rounded-lg p-4 ml-4">
        <h2 className="text-xl font-bold mb-4">የቲኬት ማስታወቂያ</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
          በመጠበቅ ላይ ያሉ ሰውች
          </label>
          <input
            type="number"
            value={currentTicketNumber}
            onChange={(e) => setCurrentTicketNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
          የመጨረሻው ትኬት ቁጥር
          </label>
          <input
            type="number"
            value={lastTicketNumber}
            onChange={(e) => setLastTicketNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ትኬት ቁጥር
        </button>

        {responseMessage && (
          <p className="mt-4 text-center text-red-500 font-semibold">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Ticket;
