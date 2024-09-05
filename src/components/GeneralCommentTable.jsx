import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const GeneralCommentTable = () => {
  const { t, i18n } = useTranslation();

  const [comments, setcomments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchcomments = async () => {
      try {
        const response = await axios.get('https://dvlcadigitalkirkos.onrender.com/comments/general/all/'); // replace with your API endpoint
        setcomments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchcomments();

  }, []);

  const renderUsers = () => {
    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error: {error.message}</div>
    } else {
      return comments.map((comment) => (
        <div key={comment.id} className="bg-white shadow-md rounded-lg p-4">
          <p className="font-bold">የአስተያየት ቁጥር: {comment.id}</p>
          <p>{comment.content}</p>
          <p>የእርካታ ደረጃ: {comment.level_of_satisfaction}</p>
          <p>የተፈጠረው በ
          : {new Date(comment.created_at).toLocaleString()}</p>
          <p>የዘመነ በ
          : {new Date(comment.updated_at).toLocaleString()}</p>
        </div>
      ))
    }
  }
  return <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {renderUsers()}
    </div>
  </div>

}

export default GeneralCommentTable