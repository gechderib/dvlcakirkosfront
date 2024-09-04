import React from 'react'
import NavLayout from '../components/NavLayout'
import Service from '../components/news/Service'
import { useTranslation } from 'react-i18next';

const ServicePage = () => {
 const { t, i18n } = useTranslation();

  return (
    <NavLayout>
    <div className=" bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center py-16">
      <div className="max-w-3xl p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
        የእኛ ልዩ አገልግሎቶች

        </h1>
        <p className="text-gray-700 text-lg mb-6">
        እንኳን ወደ የአገልግሎት ገፃችን በደህና መጡ! ልዩ ፍላጎቶችዎን ለማሟላት የተነደፉ ልዩ ልዩ የፕሪሚየም አገልግሎቶችን በማቅረብ በጣም ደስተኞች ነን። የእኛ የባለሙያዎች ቡድን ወደር የለሽ ጥራት ለማቅረብ እና ከፍተኛ እርካታዎን ለማረጋገጥ ቁርጠኛ ነው። የእኛ ፈጠራ መፍትሄዎች ግቦችዎን በቀላል እና በብቃት እንዴት ማሳካት እንደሚችሉ ይወቁ።
        </p>
        <p className="text-gray-700 text-lg">
        ከሙያ አማካሪ ጀምሮ እስከ ቴክኒካል ድጋፍ እና የፈጠራ አገልግሎቶች ድረስ ለእርስዎ ብቻ የተበጁ አጠቃላይ መፍትሄዎችን እናቀርባለን። ለበለጠ መረጃ እኛን ለማግኘት ወይም ለግል የተበጀ ምክክር ቀጠሮ ለመያዝ አያመንቱ። እርስዎ እንዲሳካዎት ለማገዝ እዚህ መጥተናል!
        </p>
      </div>
    </div>

     <Service/>
    </NavLayout>
  )
}

export default ServicePage