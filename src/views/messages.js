import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import bg from '../assets/bj.jpg';

const StyledMain = styled('main')({
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingLeft: '15%'
});

const LetterTypography = styled(Typography)({
    fontFamily: '"Courier New", Courier, monospace', // Use a typewriter font
    whiteSpace: 'pre-wrap', // Preserve whitespace formatting
    fontSize: '1.1rem',
    lineHeight: '1.6',
    letterSpacing: '0.05em',
    color: 'green',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    margin: '2rem 0',
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
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    style={{
                        fontFamily: 'Permanent Marker, cursive',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)',
                        fontWeight: 'bold',
                        lineHeight: '1.8',
                        paddingTop: '100px',
                        position: 'relative',
                    }}
                >
                    <span style={{ color: 'green', position: 'absolute', top: 0, left: '280px' }}>M</span>
                    <span style={{ color: '#a3d977', position: 'absolute', top: 0, left: '340px' }}>e</span>
                    <span style={{ color: 'green', position: 'absolute', top: 0, left: '380px' }}>s</span>
                    <span style={{ color: '#a3d977', position: 'absolute', top: 0, left: '420px' }}>s</span>
                    <span style={{ color: 'green', position: 'absolute', top: 0, left: '460px' }}>a</span>
                    <span style={{ color: '#a3d977', position: 'absolute', top: 0, left: '500px' }}>g</span>
                    <span style={{ color: 'green', position: 'absolute', top: 0, left: '540px' }}>e</span>
                    <span style={{ color: '#a3d977', position: 'absolute', top: 0, left: '580px' }}>s</span>
                </Typography>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress color="inherit" />
                    </div>
                ) : (
                    <div>
                        {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <LetterTypography key={index}>
                                    <Typography variant="h5" gutterBottom>De: <span style={{ color: "white", fontWeight: 'bold' }}> {feedback.email}</span></Typography>
                                    <Typography variant="body1" gutterBottom>Message: <span style={{ color: "white", fontWeight: 'bold' }}>{feedback.message}</span></Typography>
                                </LetterTypography>
                            ))
                        ) : (
                            <Typography variant="body1" align="center" style={{ color: '#fff' }}>
                                il n'y a pas de messages pour l'instant
                            </Typography>
                        )}
                    </div>
                )}
            </Container>
        </StyledMain>
    );
};

export default MessagesPage;
