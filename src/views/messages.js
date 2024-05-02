import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const StyledMain = styled('main')({
    minHeight: '100vh',
    backgroundColor: '#37474f',
    paddingLeft: '15%',
    paddingTop: '7%', // Adjust left padding to account for the nav bar taking 15% of the page
});

const MessagesPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/feedbacks');
            setFeedbacks(response.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <StyledMain>
            <Container maxWidth="md">
                <Typography variant="h2" align="center" gutterBottom style={{ color: '#fff' }}>
                    Feedbacks
                </Typography>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress color="inherit" />
                    </div>
                ) : (
                    <div>
                        {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <Paper key={index} elevation={3} style={{ padding: '1rem', margin: '2rem 0', backgroundColor: '#37474f', border: '2px solid #37474f', boxShadow: '5px 5px 15px rgba(0, 0, 0, 1.1)' }}>
                                    <Typography variant="h5" gutterBottom>Email: {feedback.email}</Typography>
                                    <Typography variant="body1" gutterBottom>Message: {feedback.message}</Typography>
                                </Paper>
                            ))
                        ) : (
                            <Typography variant="body1" align="center" style={{ color: '#fff' }}>
                                No feedbacks available
                            </Typography>
                        )}
                    </div>
                )}
            </Container>
        </StyledMain>
    );
};

export default MessagesPage;
