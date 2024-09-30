
import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import addis from '../assets/addis.png';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';

const NavLayout = ({ children }) => {
  const navigate = useNavigate();
  // const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const { t, i18n } = useTranslation();


  const LanguageSwitcher = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isOpen, setIsOpen] = useState(false);

    const languages = ['en', 'am'];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectLanguage = (language) => {
      i18n.changeLanguage(language)
      setSelectedLanguage(language);
      setIsOpen(false);
    };

    return (
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {selectedLanguage === "en" ? "English" : "አማርኛ"}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-20 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {languages.map((language) => (
                <a
                  key={language}
                  href="#"
                  onClick={() => handleSelectLanguage(language)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {language === 'en' ? "English" : "አማርኛ"}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

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
                {/* <a
                  onClick={() => window.open('https://aadvlca.com/')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  አሽከርካሪና ተሽከርካሪ ፍቃድ ቁጥጥር
                </a> */}
                <a
                  onClick={() => window.open('https://me-qr.com/mobile/pdf/22929263')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  የ ተሽከርካሪ አሽከርካሪ ቅድመ ሁኔታ
                </a>
                {localStorage.getItem('authToken') && user.role === "admin" && (
                  <a
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                  >
                    {t('dashbored')}
                  </a>
                )}
                <a
                  onClick={() => navigate('/comment')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  {t('commentf')}
                </a>
                <a
                  onClick={() => navigate('/news')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  {t('newsl')}
                </a>
                <a
                  onClick={() => navigate('/service')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  {t('service')}
                </a>
                <a
                  onClick={() => navigate('/help')}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  {t('Information')}
                </a>
                {!localStorage.getItem('authToken') && (
                  <a
                    onClick={() => navigate('/login')}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                  >
                    {t('login')}
                  </a>
                )}
                <LanguageSwitcher />
              </div>
            </div>

            {/* User Info and Logout */}
            {localStorage.getItem('authToken') && (
              <div className="relative flex items-center space-x-10">
                <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer text-white">
                  {user.first_name} {user.last_name}
                </div>
                <div className="w-1"></div>
                {user.profile_pic && (
                  <img onClick={() => setDropdownOpen(false)} className="h-8 w-8 rounded-full" src={user.profile_pic} alt="User Profile" />
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
                      {t('sign')}
                    </a>

                  </div>
                )}
              </div>
            )}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <img className="h-12 rounded-full w-auto" src={addis} alt="Your Company" />
            </div>
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
              {t('cndition')}
            </a>
            <a
              onClick={() => navigate('/comment')}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black"
            >
              {t('commentf')}
            </a>
            {!localStorage.getItem('authToken') && (
              <a
                onClick={() => navigate('/login')}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white hover:text-black"
              >
                {t('login')}
              </a>
            )}
          </div>
        </div>

      </nav>
      {children}
      <Footer />
    </div>
  );
};

export default NavLayout;



