import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersTable from '../components/UsersTable'
import CommentsTable from '../components/CommentsTable'
import GeneralCommentTable from '../components/GeneralCommentTable'
import Ticket from '../components/Ticket'
import NavLayout from '../components/NavLayout'
import DocumentManager from '../components/Workflow'
import DocumentTable from '../components/WorkflowTwo'
import ReportComponent from '../components/WorkReport'
const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('user');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user);
 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <NavLayout>
      <div className='flex flex-col sm:flex-row h-screen'>
        {/* Hamburger Menu for Mobile */}
        <div className='sm:hidden p-4'>
          <button onClick={toggleSidebar} className='text-gray-700 focus:outline-none'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${isSidebarOpen ? 'block' : 'hidden'
            } sm:block relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 p-4 shadow-xl shadow-blue-gray-900/5 sm:min-w-[240px]`}
        >
          <div className='mb-2 p-4'>
            <h5 className='block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900'>
            ዳሽቦርድ
            </h5>
          </div>

          <nav className='flex flex-col gap-1 p-2 font-sans text-base font-normal text-gray-700'>
            {user.role === "admin" && <div
              onClick={() => { setSelectedTab('user'); setIsSidebarOpen(false); }}
              role='button'
              className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none ${selectedTab === 'user' ? 'bg-blue-50 text-blue-900' : ''
                }`}
            >
              <div className='grid place-items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                </svg>
              </div>
              ሰራተኞች
            </div>}

            {user.role === "admin" && <div
              onClick={() => { setSelectedTab('comments'); setIsSidebarOpen(false); }}
              role='button'
              className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none ${selectedTab === 'comments' ? 'bg-blue-50 text-blue-900' : ''
                }`}
            >
              <div className='grid place-items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
                </svg>
              </div>
              አስተያየቶች
            </div>}

           {user.role === "admin" && <div
              onClick={() => { setSelectedTab('gcomments'); setIsSidebarOpen(false); }}
              role='button'
              className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none ${selectedTab === 'gcomments' ? 'bg-blue-50 text-blue-900' : ''
                }`}
            >
              <div className='grid place-items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="m600-200-56-57 143-143H300q-75 0-127.5-52.5T120-580q0-75 52.5-127.5T300-760h20v80h-20q-42 0-71 29t-29 71q0 42 29 71t71 29h387L544-624l56-56 240 240-240 240Z" />
                </svg>
              </div>
              ጠቅላላ አስተያየቶች
            </div>}

            <div
              onClick={() => { setSelectedTab('ticket'); setIsSidebarOpen(false); }}
              role='button'
              className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none ${selectedTab === 'ticket' ? 'bg-blue-50 text-blue-900' : ''
                }`}
            >
              <div className='grid place-items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="m600-200-56-57 143-143H300q-75 0-127.5-52.5T120-580q0-75 52.5-127.5T300-760h20v80h-20q-42 0-71 29t-29 71q0 42 29 71t71 29h387L544-624l56-56 240 240-240 240Z" />
                </svg>
              </div>
              ቲኬቶች
            </div>

            <div
              onClick={() => { setSelectedTab('workflow'); setIsSidebarOpen(false); }}
              role='button'
              className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none ${selectedTab === 'workflow' ? 'bg-blue-50 text-blue-900' : ''
                }`}
            >
              <div className='grid place-items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="m600-200-56-57 143-143H300q-75 0-127.5-52.5T120-580q0-75 52.5-127.5T300-760h20v80h-20q-42 0-71 29t-29 71q0 42 29 71t71 29h387L544-624l56-56 240 240-240 240Z" />
                </svg>
              </div>
              የስራ ፍሰት
            </div>
            
            {user.role === "admin" && <div
              onClick={() => { setSelectedTab('report'); setIsSidebarOpen(false); }}
              role='button'
              className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none ${selectedTab === 'report' ? 'bg-blue-50 text-blue-900' : ''
                }`}
            >
              <div className='grid place-items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="m600-200-56-57 143-143H300q-75 0-127.5-52.5T120-580q0-75 52.5-127.5T300-760h20v80h-20q-42 0-71 29t-29 71q0 42 29 71t71 29h387L544-624l56-56 240 240-240 240Z" />
                </svg>
              </div>
              ሪፖርት
            </div>}
            
            <div onClick={()=>{navigate("/")}} role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
              <div className="grid place-items-center mr-4" onClick={() => { navigate("/login") }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clip-rule="evenodd"></path>
                </svg>
              </div>ዉጣ
            </div>
          </nav>

        </div>
        <div className="flex-grow p-10">
          {selectedTab === "user" && <UsersTable />}
          {selectedTab === "comments" && <CommentsTable />}
          {selectedTab === "gcomments" && <GeneralCommentTable />}
          {selectedTab === "ticket" && <Ticket />}

          {selectedTab === "workflow" && user.role === "user1" && <DocumentManager />}
          {selectedTab === "workflow" && user.role === "user2" && <DocumentTable fetchType="start" updateTo="checked" />}
          {selectedTab === "workflow" && user.role === "user3" && <DocumentTable fetchType="checked" updateTo="scanned" />}
          {selectedTab === "workflow" && user.role === "user4" && <DocumentTable fetchType="scanned" updateTo="recorded" />}

          {selectedTab === "workflow" && user.role === "admin" && <DocumentTable fetchType="recorded" updateTo="recorded" />}
          {selectedTab === "report" && user.role === "admin" && <ReportComponent />}
        </div>

      </div>
    </NavLayout>


  )
}

export default Dashboard