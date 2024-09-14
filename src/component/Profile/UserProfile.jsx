import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const UserProfile = () => { // Receive user as a prop
    const navigate = useNavigate(); // Initialize useNavigate
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from localStorage
        dispatch(logout()); // Dispatch the logout action
        navigate('/'); // Redirect to login page
    };


    if (!user) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col items-center justify-center'>
                <AccountCircleIcon sx={{ fontSize: '9rem' }} />
                <h1 className='py-5 text-2xl font-semibold'>{user.fullName || 'User'}</h1> {/* Display user's full name */}
                <p>Email: {user.email || 'Not available'}</p> {/* Display user's email */}
                <Button variant="contained" onClick={handleLogout} sx={{ margin: '2rem 0rem' }}>Logout</Button>
            </div>
        </div>
    );
}


export default UserProfile;
