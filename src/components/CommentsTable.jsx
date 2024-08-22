import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CommentsTable = () => {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchComments = async () => {
      try {
        const response = await axios.get('https://driver-and-vehicle-license.onrender.com/comments/all/'); // replace with your API endpoint
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchComments();

  }, []);


  const renderComments = () => {
    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error: {error.message}</div>
    } else {
      return comments.map(comment => (
        <tr key={comment.id} className="bg-white border-b hover:bg-gray-50">
          <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
            <img className="w-10 h-10 rounded-full" src={comment.to_user.profile_pic} alt={`${comment.to_user.first_name} ${comment.to_user.last_name}`}></img>
            <div className="ps-3">
              <div className="text-base font-semibold">{comment.to_user.first_name} {comment.to_user.last_name}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            {comment.ticket}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              {comment.window_number}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              {comment.level_of_satisfaction}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              {comment.content}
            </div>
          </td>
        </tr>
      ));
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="h-96 overflow-y-auto"> {/* Set fixed height and enable vertical scrolling */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
              አስተያየት የተሰጠው ሰራተኛ
              </th>
              <th scope="col" className="px-6 py-3">
              የቲኬት ቁጥር
              </th>
              <th scope="col" className="px-6 py-3">
              የመስኮት ቁጥር
              </th>
              <th scope="col" className="px-6 py-3">
              የእርካታ ደረጃ ከ ፭
              </th>
              <th scope="col" className="px-6 py-3">
              ይዘት
              </th>
            </tr>
          </thead>
          <tbody>
            {renderComments()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommentsTable;
