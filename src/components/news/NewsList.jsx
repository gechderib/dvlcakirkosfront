import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import axios from 'axios';

const NewsList = () => {
 const [news, setNews] = useState([]);
 const [category, setCategory] = useState('All');

 useEffect(() => {

  const fetchNews = async () => {
   const response = await axios.get('https://dvlcadigitalkirkos.onrender.com/news/all/');
   const data = await response.data;
   console.log(data);
   setNews(data);
  }
  fetchNews()
 }, []);

 const filteredNews = news.filter(item =>
  category === 'All' || item.news_type.toLowerCase() === category.toLowerCase()
 );

 return (
  <div>
   <div className="flex justify-center mb-4 mt-5 px-10 cursor-pointer">
    {['All', 'Urgent', 'Normal'].map(cat => (
     <div
      key={cat}
      onClick={() => setCategory(cat)}
      className={`mx-2 py-3 px-16 rounded ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
       }`}
     >
      {cat}
     </div>
    ))}
   </div>

   <div className={`${filteredNews.length === 1?"grid-cols-1":filteredNews.length === 2?"sm:grid-cols-2 grid-cols-1":filteredNews.length === 3?"md:grid-cols-3 sm:grid-cols-2 grid-cols-1":"md:grid-cols-4 sm:grid-cols-2 grid-cols-1"} grid`}>
    {filteredNews.map(item => (
     <NewsCard
      key={item.id}
      title={item.title}
      content={item.content}
      image={item.image}
      createdAt={item.created_at}
     />
    ))}
   </div>
  </div>
 );
};

export default NewsList;
