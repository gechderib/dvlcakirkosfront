import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReportCards from './ReportCards';
import { useTranslation } from 'react-i18next';

const ReportComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('');
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCreatedBy, setSearchCreatedBy] = useState(''); // New state for searching by Created By
  const [itemsPerPage] = useState(10); // Number of items per page
  const statuses = ['start', 'checked', 'scanned', 'recorded','requested', 'approved','fileout'];

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('https://driver-and-vehicle-license.onrender.com/document/report/date-range/', {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            start_date: startDate != null ? startDate.toISOString().split('T')[0] : "",
            end_date: endDate != null ? endDate.toISOString().split('T')[0] : "",
            file_status: status,
          },
        });
        setReports(response.data);
        setFilteredReports(response.data);
        setCurrentPage(1); // Reset to first page on new data fetch
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [startDate, endDate, status]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = reports;

      if (status) {
        filtered = filtered.filter(report => report.file_status === status);
      }

      if (searchCreatedBy) {
        filtered = filtered.filter(report =>
          `${report.file_created_by.first_name} ${report.file_created_by.last_name}`
            .toLowerCase()
            .includes(searchCreatedBy.toLowerCase())
        );
      }

      setFilteredReports(filtered);
    };

    applyFilters();
  }, [reports, status, searchCreatedBy]);

  // Calculate the indices for slicing the reports
  const indexOfLastReport = currentPage * itemsPerPage;
  const indexOfFirstReport = indexOfLastReport - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  // Pagination controls
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const { t, i18n } = useTranslation();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=''>
      <ReportCards />
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded p-2"
              placeholderText='2024-08-14'
            />
          </div>
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded p-2"
              placeholderText='2024-08-14'
            />
          </div>
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">All</option>
              {statuses.map(statusOption => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Search by Created By</label>
            <input
              type="text"
              value={searchCreatedBy}
              onChange={e => setSearchCreatedBy(e.target.value)}
              className="border border-gray-300 rounded p-2"
              placeholder="Enter creator's name"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReports.map(report => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.file_created_by.first_name + " " + report.file_created_by.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.file_serial_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.file_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.file_content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.file_status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.updated_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 px-4 py-2 rounded text-gray-700"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 px-4 py-2 rounded text-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
