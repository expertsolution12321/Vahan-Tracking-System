// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import AdminLayout from './Layouts/AdminLayout';
// import { InitialRenderPage } from './Screens/Admin/Common/InitialRender';
// import PageNotFound from './Screens/Admin/Common/NotFound';
import './App.css'
const App = () => {
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');

    return (
        <Router>
            <Routes>
                <Route path="auth/*" element={<AuthLayout setToken={setToken} setRole={setRole} />} />
                <Route path="auth/admin/*" element={<AdminLayout />} />
                {/* <Route path="/" element={<InitialRenderPage />} />
                <Route path="/404" element={<PageNotFound />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
