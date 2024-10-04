import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, password });

            // Save token and role in localStorage
            localStorage.setItem('truck_token', response.data.token);
            localStorage.setItem('truck_role', response.data.role);

            setToken(response.data.token);
            setRole(response.data.role);

            console.log('Login successful:', response.data);

            // Redirect to corresponding role panel
            window.location.href = `admin/${response.data.role.replace('_', '-')}`;
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
