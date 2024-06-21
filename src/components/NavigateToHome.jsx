import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import "../assets/NavigateToHome.css";

export function NavigateToHome() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Button onClick={handleGoHome} className="goBack-btn"><ArrowBackIcon /></Button>
    );
}