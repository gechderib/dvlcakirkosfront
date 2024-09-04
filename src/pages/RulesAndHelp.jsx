import React from 'react'
import NavLayout from '../components/NavLayout'
import OfficeAndObligation from '../components/news/OfficeAndObligation'
import { useTranslation } from 'react-i18next';

const RulesAndHelp = () => {
 const { t, i18n } = useTranslation();

 return (
  <NavLayout>
   <div className="p-8 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500  flex items-center justify-center">
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl relative overflow-hidden">
     {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 opacity-50 z-0"></div> */}

     <div className="relative z-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
       ወደ የእኛ የመረጃ ማዕከል እንኳን በደህና መጡ

      </h1>
      <p className="text-lg font-medium text-gray-700 mb-6">
       ይህ ገጽ የቢሮ አቅጣጫዎችን እና ለማጠናቀቅ የሚያስፈልጉዎትን ቁልፍ ግዴታዎች ግንዛቤዎችን ይሰጣል።
      </p>
      <p className="text-gray-600">
       ስለ ቢሮ ቦታዎች እና መሟላት ስለሚገባቸው ተግባራት አጠቃላይ መረጃ ለማግኘት ከዚህ በታች ያሉትን ዝርዝር ክፍሎች ያስሱ።
       እያንዳንዱ ክፍል የተነደፈው የእርስዎን ኃላፊነት በቀላሉ እና በብቃት እንዲቆጣጠሩ ለመርዳት ነው። በአሰሳዎ ይደሰቱ!
      </p>
     </div>
    </div>
   </div>
   <OfficeAndObligation />
  </NavLayout>
 )
}

export default RulesAndHelp