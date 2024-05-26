import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import addEnseignantsImage from '../assets/add_enseignants.png'; // Import image for add enseignants
import addEtudiantsImage from '../assets/etudiant.png'; // Import image for add etudiants
import bg from '../assets/bj.jpg';
import heyGif from '../assets/hey.gif'; // Import hey.gif

const StyledActionLink = styled(Link)({
    textDecoration: 'none',
});

const StyledActionCard = styled('div')({
    background:
        "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.75))",
    marginTop: '100px',
    marginLeft: '100px',
    borderRadius: '8%', // Make the border circular
    boxShadow: '5px 4px 18px rgba(0, 0, 0, 1.3)',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    overflow: 'hidden', // Ensure the image stays within the circular border
    width: '50%', // Set the width of the card to match the width of the icon
});

const StyledActionImage = styled('img')({
    width: '70%', // Make the icon fill the entire width of the card
    marginBottom: '1rem',
});

const HomePage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', paddingLeft: '15%' }}>
            <Container maxWidth="lg">
                <div>
                <Typography variant="h1" align="center" gutterBottom style={{ padding: '30px', color: '#a3d977', fontWeight: 'bold', textShadow: '6px 12px 2px rgba(0, 0, 0, 3.5)' }}>
                    Bienvenue Admin <img src={heyGif} alt="Hey GIF" style={{ width: '13%' }} />
                </Typography>   
                    <Grid container spacing={5} justifyContent="flex-end"> {/* Align content to the right */}
                        <Grid item xs={12} sm={6}>
                            <StyledActionLink to="/GestionEnseignant">
                                <StyledActionCard>
                                    <StyledActionImage src={addEnseignantsImage} alt="Ajouter Enseignants" />
                                    <Typography variant="h5" style={{ fontFamily: ' Recoleta' }} color="green">Gestion des Enseignants</Typography>
                                </StyledActionCard>
                            </StyledActionLink>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledActionLink to="/GestionEtudiant">
                                <StyledActionCard>
                                    <StyledActionImage src={addEtudiantsImage} alt="Ajouter Étudiants" />
                                    <Typography variant="h5" style={{ fontFamily: ' Recoleta' }} color="green">Gestion des Étudiants</Typography>
                                </StyledActionCard>
                            </StyledActionLink>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default HomePage;
