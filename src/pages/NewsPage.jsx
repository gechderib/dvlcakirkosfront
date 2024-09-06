import React from 'react'
import NewsList from '../components/news/NewsList'
import NavLayout from '../components/NavLayout'
import { useTranslation } from 'react-i18next';
import FloatingButton from '../components/FloatingButton';

const NewsPage = () => {
 const { t, i18n } = useTranslation();

 return (
  <NavLayout>
   <FloatingButton/>
   <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center p-10">
    <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-4xl">
     <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 px-10">
      <h1 className="text-4xl font-bold">የዜና ገጽ</h1>
      <p className="mt-2 text-lg">
      የቅርብ ዜናዎች፣ ታሪኮች እና ግንዛቤዎች እንደተዘመኑ ይቆዩ።
      </p>
     </div>
     <div className="p-10">
      <p className="text-xl text-gray-700">
      ይህ ለሁሉም ሰበር ዜናዎች የአንድ ጊዜ መድረሻዎ ነው። በአለም ዙሪያ ምን እየተከሰተ እንዳለ ለማወቅ ብዙ ጊዜ ይመለሱ።
      </p>
      <div className="mt-10">
       <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300">
       ዜናን ያስሱ
       </button>
      </div>
     </div>
    </div>
   </div>
   <NewsList />

  </NavLayout>
 )
}

export default NewsPage