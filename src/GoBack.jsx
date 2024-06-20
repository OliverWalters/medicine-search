import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import "./GoBack.css";

export function GoBack() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Button onClick={handleGoHome} className="goBack-btn"><ArrowBackIcon /></Button>
    );
}