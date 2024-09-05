import React, { useState } from "react";
import axios from "axios";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [newsType, setNewsType] = useState("normal"); // Default value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("No authorization token found. Please log in.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("news_type", newsType);

    try {
      const response = await axios.post(
        "https://dvlcadigitalkirkos.onrender.com/news/create/",
        formData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("News created successfully!");
      setTitle("");
      setContent("");
      setImage(null);
      setNewsType("normal"); // Reset to default
    } catch (err) {
      setError(err.response ? err.response.data.detail : "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Add News</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">News Type</label>
          <select
            value={newsType}
            onChange={(e) => setNewsType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit News"}
        </button>
      </form>
    </div>
  );
};

export default AddNews;
