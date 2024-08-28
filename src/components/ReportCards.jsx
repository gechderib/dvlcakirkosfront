import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportCards = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('https://driver-and-vehicle-license.onrender.com/document/report/status/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setReportData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-1 sm:px-2 md:px-6 lg:px-10 gap-5">
                {reportData.map((item) => (
                    <div key={item.file_status} className=" bg-white p-6 rounded-lg shadow-md w-full sm:w-60 md:w-72 lg:w-80">
                        <h2 className="text-xl font-bold mb-2">{item.file_status.charAt(0).toUpperCase() + item.file_status.slice(1)}</h2>
                        <p className="text-2xl font-semibold">{item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportCards;
