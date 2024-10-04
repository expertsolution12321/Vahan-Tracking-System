import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const AdminPanel = () => {
    const [loadingDetails, setLoadingDetails] = useState([]);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Function to fetch truck loading details
    const fetchLoadingDetails = async () => {
        try {
            const token = localStorage.getItem('truck_token'); // Assuming you stored the JWT token in localStorage
            const response = await axios.get('http://localhost:3000/api/loadings', {
                headers: {
                    authorization: `${token}`,
                },
            });
            setLoadingDetails(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch loading details.');
        }
    };

    useEffect(() => {
        fetchLoadingDetails();
    }, []);

    // Filter loading data based on date range
    const filteredLoadingData = loadingDetails.filter(detail => {
        const loadingTime = new Date(detail.loadingTime);
        const start = new Date(startDate);
        const end = new Date(endDate);
console.log('filter')
        return (
            (startDate === '' || loadingTime >= start) &&
            (endDate === '' || loadingTime <= end)
        );
    });

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredLoadingData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Loading Data");
        XLSX.writeFile(workbook, "loading_data.xlsx");
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <p>You can view truck loading details created by the computer operator.</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Date Filter Inputs */}
            <div>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={exportToExcel}>Download as Excel</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>RC Details</th>
                        <th>License Details</th>
                        <th>Item Details</th>
                        <th>Loading Time</th>
                        <th>Loading Location</th>
                        <th>Unloading Time</th>
                        <th>Unloading Location</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLoadingData.length > 0 ? (
                        filteredLoadingData.map((detail) => (
                            <tr key={detail._id}>
                                <td>{detail.driverName}</td>
                                <td>{detail.rcDetails}</td>
                                <td>{detail.licenceDetails}</td>
                                <td>{detail.itemDetails}</td>
                                <td>{new Date(detail.loadingTime).toLocaleString()}</td>
                                <td>{detail.loadingLocation}</td>
                                <td>{new Date(detail.unloadingTime).toLocaleString()}</td>
                                <td>{detail.unloadingLocation}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No loading details available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
