// import React, { useEffect, useState } from 'react'
// import logo from '../assets/logo.jpg'
// import { useNavigate } from 'react-router-dom'
// import Footer from './Footer'
// import axios from 'axios'

// const NavLayout = ({ children }) => {
//  const navigate = useNavigate()
//  const [user, setUser] = useState({});

//  useEffect(() => {
//   const fetchUserProfile = async () => {
//    try {
//     const token = localStorage.getItem('authToken'); // Retrieve token from local storage
//     if (!token) {
//      throw new Error('No authentication token found.');
//     }
//     const response = await axios.get('https://driver-and-vehicle-license.onrender.com/users/profile', {
//      headers: {
//       Authorization: `Token ${token}`,
//      },
//     });
//     setUser(response.data);
//     localStorage.setItem("user", JSON.stringify(response.data));
//    } catch (error) {
//     console.error('There was an error fetching the documents!', error);
//    }
//   };

//   fetchUserProfile();
//  }, []);



//  return <div>
//   <nav class="bg-blue-500">
//    <div class=" px-2 sm:px-6 lg:px-8">
//     <div class="relative flex h-16 items-center justify-between">
//      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
//       <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
//        <span class="absolute -inset-0.5"></span>
//        <span class="sr-only">Open main menu</span>

//        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//        </svg>

//        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//        </svg>
//       </button>
//      </div>
//      <div class="flex  items-center justify-between sm:items-stretch sm:justify-start">
//       <div onClick={() => { navigate("/") }} class="flex flex-shrink-0 items-end sm:items-center cursor-pointer">
//        <img class="h-12 rounded-full w-auto" src={logo} alt="Your Company"></img>
//       </div>
//       <div class="hidden sm:ml-6 sm:block">
//        <div class="flex space-x-4">
//         <a onClick={() => { window.open("https://aadvlca.com/") }} class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black">አሽከርካሪና ተሽከርካሪ ፍቃድ ቁጥጥር</a>
//         <a onClick={() => { window.open("https://me-qr.com/mobile/pdf/22929263") }} class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black">የ ተሽከርካሪ አሽከርካሪ ቅድመ ሁኔታ</a>
//         <a onClick={() => { navigate("/comment") }} class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black">አስተያየት</a>
//         {!localStorage.getItem('authToken') && <a onClick={() => { navigate("/login") }} class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black">ግባ</a>}

//         {localStorage.getItem('authToken') && <div className='flex'>
//          <p className='text-right text-white'>{user.first_name} {user.last_name}</p>
//          <img src={user.profile_pic} alt=''></img>
//         </div>}
//         {localStorage.getItem('authToken') && <a onClick={() => {
//          localStorage.setItem("authToken", "");
//          navigate("/")
//         }} class="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black">ውጣ</a>}
//        </div>
//       </div>
//      </div>
//     </div>
//    </div>

//    <div class="sm:hidden" id="mobile-menu">
//     <div class="space-y-1 px-2 pb-3 pt-2">
//      <a onClick={() => { window.open("https://aadvlca.com/") }} class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black">አሽከርካሪና ተሽከርካሪ ፍቃድ ቁጥጥር</a>
//      <a onClick={() => { window.onabort("https://me-qr.com/mobile/pdf/22929263") }} class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black">የ ተሽከርካሪ አሽከርካሪ ቅድመ ሁኔታ</a>
//      <a onClick={() => navigate("/comment")} class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black">አስተያየት</a>
//      {!localStorage.getItem('authToken') && <a onClick={() => navigate("/login")} class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black">ግባ</a>}
//     </div>
//    </div>

//   </nav>
//   {children}
//   <div class="flex items-end w-full bg-white">
//    <Footer />
//   </div>
//  </div>


// }

// export default NavLayout


import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

const NavLayout = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        if (!token) {
          throw new Error('No authentication token found.');
        }
        const response = await axios.get('https://driver-and-vehicle-license.onrender.com/users/profile', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('There was an error fetching the documents!', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <nav className="bg-blue-500">
        <div className="px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <img className="h-12 rounded-full w-auto" src={logo} alt="Your Company" />
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex sm:items-center sm:justify-center flex-grow">
              <div className="flex space-x-4">
                <a
                  onClick={() => window.open('https://aadvlca.com/')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  አሽከርካሪና ተሽከርካሪ ፍቃድ ቁጥጥር
                </a>
                <a
                  onClick={() => window.open('https://me-qr.com/mobile/pdf/22929263')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  የ ተሽከርካሪ አሽከርካሪ ቅድመ ሁኔታ
                </a>
                <a
                  onClick={() => navigate('/comment')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  አስተያየት
                </a>
                {!localStorage.getItem('authToken') && (
                  <a
                    onClick={() => navigate('/login')}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                  >
                    ግባ
                  </a>
                )}
              </div>
            </div>

            {/* User Info and Logout */}
            {localStorage.getItem('authToken') && (
              <div className="relative flex items-center space-x-4">
                <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer text-white">
                  {user.first_name} {user.last_name}
                </div>
                {user.profile_pic && (
                  <img className="h-8 w-8 rounded-full" src={user.profile_pic} alt="User Profile" />
                )}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <a
                      onClick={() => {
                        localStorage.setItem('authToken', '');
                        navigate('/');
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      ውጣ
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              onClick={() => window.open('https://aadvlca.com/')}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black"
            >
              አሽከርካሪና ተሽከርካሪ ፍቃድ ቁጥጥር
            </a>
            <a
              onClick={() => window.open('https://me-qr.com/mobile/pdf/22929263')}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black"
            >
              የ ተሽከርካሪ አሽከርካሪ ቅድመ ሁኔታ
            </a>
            <a
              onClick={() => navigate('/comment')}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black"
            >
              አስተያየት
            </a>
            {!localStorage.getItem('authToken') && (
              <a
                onClick={() => navigate('/login')}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black"
              >
                ግባ
              </a>
            )}
          </div>
        </div>
      </nav>
      {children}
      <div className="flex items-end w-full bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default NavLayout;



