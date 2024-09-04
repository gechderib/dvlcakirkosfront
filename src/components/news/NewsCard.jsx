import React from 'react';

const NewsCard = ({ title, content, image, createdAt }) => {
 return (
   
   <div className="rounded overflow-hidden shadow-2xl m-4 hover:animate-pulse cursor-pointer">
    <img className="w-full h-96 object-cover" src={image} alt={title} />
    <div className="px-6 py-4">
     <div className="font-bold text-xl mb-2">{title}</div>
     <p className="text-gray-700 text-base">{content}</p>
    </div>
    <div className="px-6 pt-4 pb-2">
     <span className="text-gray-600 text-sm">{new Date(createdAt).toDateString()}</span>
    </div>
   </div> 


 );
};

export default NewsCard;




