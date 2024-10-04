// src/Layouts/AdminLayout.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SuperAdminPanel from '../components/SuperAdminPanel';
import AdminPanel from '../components/AdminPanel';
import TransporterPanel from '../components/TransporterPanel';
import ComputerOperatorPanel from '../components/ComputerOperatorPanel';
// import PageNotFound from '../Screens/Admin/Common/NotFound';

const AdminLayout = () => {
    return (
        <Routes>
            <Route path="super-admin" element={<SuperAdminPanel />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="transporter" element={<TransporterPanel />} />
            <Route path="computer-operator" element={<ComputerOperatorPanel />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
    );
};

export default AdminLayout;
