import React from 'react'
import { useTranslation } from 'react-i18next';


const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-14 px-20 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-lg">
            {t('contactusviaemail')}: 
            <a href="mailto:dvadigitalkirkos@gmail.com" className="text-blue-400 hver:otext-blue-600 ml-1">
              dvadigitalkirkos@gmail.com
            </a>
          </p>
        </div>
        <div>
          <p className="text-lg">
            {t("FollowusonFacebook")}: 
            <a href="https://www.facebook.com/profile.php?id=61564926917992" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 ml-1">
              {t("FacebookPage")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
