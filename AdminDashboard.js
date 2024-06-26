import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct the import
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [pendingAdmins, setPendingAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchPendingAdminRequests();
        fetchUsers();
        fetchAnalytics();
    }, []);

    const fetchPendingAdminRequests = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const decodedToken = jwtDecode(token); // Use jwtDecode to decode token
            console.log('Decoded Token:', decodedToken);

            const response = await axios.get('http://localhost:3000/api/admin/pending-requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPendingAdmins(response.data);
        } catch (error) {
            handleRequestError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await axios.get('http://localhost:3000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            handleRequestError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await axios.get('http://localhost:3000/api/admin/analytics', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnalytics(response.data);
        } catch (error) {
            handleRequestError(error);
        } finally {
            setLoading(false);
        }
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        return token;
    };

    const handleApprove = async (userId) => {
        try {
            const token = getToken();
            await axios.post('http://localhost:3000/api/admin/approve-request', { userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPendingAdminRequests();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleDeny = async (userId) => {
        try {
            const token = getToken();
            await axios.post('http://localhost:3000/api/admin/deny-request', { userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPendingAdminRequests();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const token = getToken();
            await axios.post('http://localhost:3000/api/admin/upload-image', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Image uploaded successfully');
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        console.error('API Error:', error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorMessage(`Request failed: ${error.response.data.message}`);
        } else {
            setErrorMessage(`Request failed: ${error.message}`);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <h3>Pending Admin Requests</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {pendingAdmins.map(admin => (
                        <li key={admin._id}>
                            {admin.email} - {admin.userId}
                            <button onClick={() => handleApprove(admin._id)}>Approve</button>
                            <button onClick={() => handleDeny(admin._id)}>Deny</button>
                        </li>
                    ))}
                </ul>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <h3>User Management</h3>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.email} - {user.role}
                    </li>
                ))}
            </ul>

            <h3>Analytics</h3>
            <div className="analytics">
                <p>Total Users: {analytics.totalUsers}</p>
                <p>Total Images: {analytics.totalImages}</p>
            </div>

            <h3>Image Upload</h3>
            <form onSubmit={handleImageUpload}>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
