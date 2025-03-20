import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Check if the token is valid by making a request to the server
            fetch('http://localhost:8080/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid token');
                }
                return response.json();
            })
            .then(() => {
                if (location.pathname === '/' ||
                    location.pathname === '/login' ||
                    location.pathname === '/signup'
                ) {
                    navigate('/body', { replace: true });
                }
            })
            .catch(() => {
                // If token is invalid, remove it and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('loggedInUser');
                if (location.pathname !== '/login' && 
                    location.pathname !== '/signup' && 
                    location.pathname !== '/'
                ) {
                    navigate('/login', { replace: true });
                }
            });
        } else {
            // If no token and trying to access protected route, redirect to login
            if (location.pathname !== '/login' && 
                location.pathname !== '/signup' && 
                location.pathname !== '/'
            ) {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate]);

    return null;
}

export default RefrshHandler;