import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const TransporterPanel = () => {
    const [loadingData, setLoadingData] = useState([]); // State to hold truck loading data
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Function to fetch loading data from the API
    const fetchLoadingData = async () => {
        try {
            const token = localStorage.getItem('truck_token'); // JWT token
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/loadings`, {
                headers: {
                    'authorization': `${token}` // JWT token for authentication
                }
            });
            setLoadingData(response.data); // Set the data into state
        } catch (error) {
            console.error('Error fetching loading data', error);
        }
    };

    // Fetch the data when the component mounts
    useEffect(() => {
        fetchLoadingData();
    }, []);

    // Filter loading data based on date range
    const filteredLoadingData = loadingData.filter(detail => {
        const loadingTime = new Date(detail.loadingTime);
        const start = new Date(startDate);
        const end = new Date(endDate);

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
            <h2>Transporter Panel</h2>
            <p>You can view truck loading details created by the computer operator.</p>

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

            {/* Display loading details in a table */}
            <h2>Truck Loading Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>RC Details</th>
                        <th>Licence Details</th>
                        <th>Loading Time</th>
                        <th>Unloading Time</th>
                        <th>Loading Location</th>
                        <th>Unloading Location</th>
                        <th>Item Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLoadingData.length > 0 ? (
                        filteredLoadingData.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.driverName}</td>
                                <td>{detail.rcDetails}</td>
                                <td>{detail.licenceDetails}</td>
                                <td>{new Date(detail.loadingTime).toLocaleString()}</td>
                                <td>{new Date(detail.unloadingTime).toLocaleString()}</td>
                                <td>{detail.loadingLocation}</td>
                                <td>{detail.unloadingLocation}</td>
                                <td>{detail.itemDetails}</td>
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

export default TransporterPanel;
