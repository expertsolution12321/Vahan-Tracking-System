// src/Layouts/AuthLayout.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login';

const AuthLayout = ({ setToken, setRole }) => {
    return (
        <Routes>
            <Route path="/" element={<Login setToken={setToken} setRole={setRole} />} />
            <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
            {/* Add other auth-related routes here */}
        </Routes>
    );
};

export default AuthLayout;
