import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

import addEnseignantsImage from '../assets/add_enseignants.png'; // Import image for add enseignants
import addEtudiantsImage from '../assets/etudiant.png'; // Import image for add etudiants

const StyledMain = styled('main')({
    minHeight: '100vh',
    backgroundColor: '#37474f',
    paddingLeft: '15%',
    paddingTop: '7%', // Adjust left padding to account for the nav bar taking 15% of the page
});

const StyledSection = styled('section')({
    marginBottom: '2rem',
});

const StyledActionLink = styled(Link)({
    textDecoration: 'none',
    color: '#fff',
});

const StyledActionCard = styled('div')({
    textAlign: 'center',
    borderRadius: '35%', // Make the border circular
    boxShadow: '0px 4px 10px rgba(5, 0, 0, 1.3)',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    border: '2px solid #fff',
    overflow: 'hidden', // Ensure the image stays within the circular border
    width: '80%', // Set the width of the card to match the width of the icon
    margin: 'auto', // Center the card horizontally
});

const StyledActionImage = styled('img')({
    width: '50%', // Make the icon fill the entire width of the card
    marginBottom: '1rem',
});

const StyledTypography = styled(Typography)({
    color: '#ffcc00', // Change the color of the title to a good one
    fontFamily: 'Roboto, sans-serif', // Change the font to a good designed one
    fontSize: '4rem', // Increase the font size for a better emphasis
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px',
});



const HomePage = () => {
    useEffect(() => {
        // Add CSS to remove scroll bar
        document.body.style.overflow = 'hidden';
        return () => {
            // Reset CSS when component unmounts
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <StyledMain>
            <Container maxWidth="lg">
                <StyledSection>
                    <StyledTypography variant="h2" gutterBottom>Gestion</StyledTypography>
                    <Grid container spacing={5} justifyContent="flex-end"> {/* Align content to the right */}
                        <Grid item xs={12} sm={6}>
                            <StyledActionLink to="/GestionEnseignant">
                                <StyledActionCard>
                                    <StyledActionImage src={addEnseignantsImage} alt="Ajouter Enseignants" />
                                    <Typography variant="h5">Gestion des Enseignants</Typography>
                                </StyledActionCard>
                            </StyledActionLink>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledActionLink to="/GestionEtudiant">
                                <StyledActionCard>
                                    <StyledActionImage src={addEtudiantsImage} alt="Ajouter Étudiants" />
                                    <Typography variant="h5">Gestion des Étudiants</Typography>
                                </StyledActionCard>
                            </StyledActionLink>
                        </Grid>
                    </Grid>
                </StyledSection>
            </Container>
        </StyledMain>
    );
};

export default HomePage;
