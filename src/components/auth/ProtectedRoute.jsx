// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Spin } from 'antd';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Give a moment for the AuthContext to initialize from localStorage
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100); // A small delay to avoid flicker on fast reloads
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }
    
    if (!token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;

