import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    profile_pic: null,
    role: 'user1',  // Default value
    window_number: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_pic: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    setLoading(true); // Set loading state

    const form = new FormData();
    form.append('first_name', formData.first_name);
    form.append('last_name', formData.last_name);
    form.append('phone_number', formData.phone_number);
    form.append('password', formData.password);
    form.append('profile_pic', formData.profile_pic);
    form.append('role', formData.role);
    form.append('window_number', formData.window_number);

    try {
      const response = await axios.post(
        'https://dvlcadigitalkirkos.onrender.com/users/register/',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSuccess('Registration successful!'); // Show success message
      setLoading(false); // Reset loading state
      setTimeout(() => {
        onClose(); // Close the modal after 1.5 seconds
      }, 1500);
    } catch (error) {
      setLoading(false); // Reset loading state

      // Extract error messages
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join(' | ');
        setError(errorMessages);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="px-4 py-2 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Register</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-4">
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          {success && <div className="mb-4 text-green-500 text-sm">{success}</div>}
          {loading && <div className="mb-4 text-blue-500 text-sm">Registering...</div>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_pic">
              Profile Picture
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={handleFileChange}
              className="w-full text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="user1">ፈጳሚ</option>
              <option value="user2">ኦዲተር</option>
              <option value="user3">ማረጃ ሰብሳቢ</option>
              <option value="user4">መዝገብ ቤት</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="window_number">
              Window Number
            </label>
            <input
              type="text"
              id="window_number"
              name="window_number"
              value={formData.window_number}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
