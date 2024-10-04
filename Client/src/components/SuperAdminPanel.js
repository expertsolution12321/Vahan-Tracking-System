import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const SuperAdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        username: ''
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [loadingData, setLoadingData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchLoadingData(startDate, endDate);
    }, [startDate, endDate]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('truck_token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchLoadingData = async (startDate = '', endDate = '') => {
        try {
            const token = localStorage.getItem('truck_token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/loadings`, {
                headers: {
                    'Authorization': `${token}`
                },
                params: {
                    startDate,
                    endDate
                }
            });
            setLoadingData(response.data);
        } catch (error) {
            console.error('Error fetching loading data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('truck_token');

            if (editingUserId) {
                await axios.put(`http://localhost:3000/api/users/${editingUserId}`, userDetails, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                alert('User updated successfully!');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, userDetails, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                alert('User created successfully!');
            }

            setUserDetails({ name: '', email: '', password: '', role: '', username: '' });
            setEditingUserId(null);
            fetchUsers();
        } catch (error) {
            console.error('Error submitting user details:', error);
            alert('Submission failed. Please try again.');
        }
    };

    const handleEdit = (user) => {
        setUserDetails({
            name: user.name,
            email: user.email,
            role: user.role,
            username: user.username
        });
        setEditingUserId(user._id);
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('truck_token');
            await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            alert('User deleted successfully!');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(loadingData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Loading Data");
        XLSX.writeFile(workbook, "loading_data.xlsx");
    };

    return (
        <div>
            <h2>Super Admin Panel</h2>
            <p>You can manage users here.</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={userDetails.name}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={userDetails.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={userDetails.password}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={userDetails.username}
                />
                <select
                    name="role"
                    onChange={handleChange}
                    value={userDetails.role}
                    required
                >
                    <option value="" disabled>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="transporter">Transporter</option>
                    <option value="computer_operator">Computer Operator</option>
                </select>
                <button type="submit">{editingUserId ? 'Update User' : 'Create User'}</button>
            </form>

            <h3>Existing Users</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
    <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
            <th className="py-3 px-6 text-left">User Name</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Actions</th>
        </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
        {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{user.username}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6 flex space-x-2">
                    <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-150"
                        onClick={() => handleEdit(user)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-150"
                        onClick={() => handleDelete(user._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>


            <h3>Truck Loading Details</h3>
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
            <table className="min-w-full bg-white border border-gray-200">
    <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Driver Name</th>
            <th className="py-3 px-6 text-left">RC Details</th>
            <th className="py-3 px-6 text-left">License Details</th>
            <th className="py-3 px-6 text-left">Loading Time</th>
            <th className="py-3 px-6 text-left">Unloading Time</th>
            <th className="py-3 px-6 text-left">Loading Location</th>
            <th className="py-3 px-6 text-left">Unloading Location</th>
            <th className="py-3 px-6 text-left">Item Details</th>
            <th className="py-3 px-6 text-left">Created By</th>
        </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
        {loadingData.length > 0 ? (
            loadingData.map((detail, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{detail.driverName}</td>
                    <td className="py-3 px-6">{detail.rcDetails}</td>
                    <td className="py-3 px-6">{detail.licenceDetails}</td>
                    <td className="py-3 px-6">{new Date(detail.loadingTime).toLocaleString()}</td>
                    <td className="py-3 px-6">{new Date(detail.unloadingTime).toLocaleString()}</td>
                    <td className="py-3 px-6">{detail.loadingLocation}</td>
                    <td className="py-3 px-6">{detail.unloadingLocation}</td>
                    <td className="py-3 px-6">{detail.itemDetails}</td>
                    <td className="py-3 px-6">{detail.createdBy.email}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="9" className="py-3 px-6 text-center">No loading details available.</td>
            </tr>
        )}
    </tbody>
</table>

        </div>
    );
};

export default SuperAdminPanel;
