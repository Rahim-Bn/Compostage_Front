import React, { useState } from 'react';
import { Typography, Container, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import background from '../assets/bg.mp4';
import purchaseLogo from '../assets/Purchase.png';
import tutoVideo from '../assets/bg.mp4';

const NavBar = () => {
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 2 }}>
      <nav>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li style={{ marginRight: '1rem' }}>
            <a href="#home" style={{ color: 'white', textDecoration: 'none' }} onClick={(e) => handleSmoothScroll(e, 'home')}>Accueil</a>
          </li>
          <li style={{ marginRight: '1rem' }}>
            <a href="#request-access" style={{ color: 'white', textDecoration: 'none' }} onClick={(e) => handleSmoothScroll(e, 'request-access')}>Demander l'Accès</a>
          </li>
          <li>
            <a href="#contact" style={{ color: 'white', textDecoration: 'none' }} onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const HomePage = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [requestSent, setRequestSent] = useState(false); // State to track if the request is sent
  const [feedbackSent, setFeedbackSent] = useState(false); // State to track if the feedback is sent

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/requests', { nom, prenom, email });
      if (response.status === 201) {
        console.log('Request submitted successfully');
        setRequestSent(true);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };
  

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/feedbacks', { email, message });
      if (response.status === 201) {
        console.log('Feedback submitted successfully');
        setFeedbackSent(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Navigation */}
      <NavBar />

      {/* Background video */}
      <video 
        src={background} 
        autoPlay 
        loop 
        muted 
        style={{ 
          position: 'fixed',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: -1
        }} 
      />
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      {/* Home Section */}
      <section id="home" style={{ position: 'relative', width: '100vw', height: '150vh' }}>
        <Container maxWidth="md" style={{ paddingTop: '10vh' }}>
          <Typography variant="h1" align="center" gutterBottom style={{color: '#a3d977', fontWeight: 'bold', textShadow: '10px 12px 10px rgba(0, 0, 0, 2)' }}>
            CompostageSimulation
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3rem' }}>
            <video 
              src={tutoVideo} 
              controls
              style={{ maxWidth: '70%' }}
            />
            <div style={{ maxWidth: '70%', color: 'white' }}>
              <img src={purchaseLogo} alt="Purchase Logo" style={{ width: '50%', marginBottom: '1rem' }} />
                <Typography variant="body1" paragraph marginRight="20px">
                  <span style={{fontWeight:'bold',color: 'rgba(265,265,265,0.5)'}}>Développeur:</span>  D.A.L.L. Tunisia
                </Typography>
                <Typography variant="body1" paragraph marginRight="110px">
                <span style={{fontWeight:'bold',color: 'rgba(265,265,265,0.5)'}}>Éditeur:</span> Net-Info
                </Typography>
                <Typography variant="body1" paragraph marginRight="50px">
                <span style={{fontWeight:'bold',color: 'rgba(265,265,265,0.5)'}}>Date de sortie:</span> 05/06/24
                </Typography>
                <Typography variant="body1" paragraph marginRight="70px">
                <span style={{fontWeight:'bold',color: 'rgba(265,265,265,0.5)'}}>Plateforme:</span> Windows
                </Typography>
              <Button variant="contained" color="primary" fullWidth href="https://example.com/download">
                Télécharger
              </Button>
            </div>
          </div>
          <Typography variant="h6" align="center" style={{ color: 'white', marginTop: '2rem', fontStyle: 'italic' }}>
            CompostageSimulation vous plonge au cœur de The World's Game (le jeu Universel) pour vous offrir une simulation de compostage la plus réaliste au monde avec HyperMotionV, les Styles de jeu optimisés par Opta et un moteur de jeu Frostbite™ amélioré.
          </Typography>
        </Container>
      </section>

      {/* Request Access Section */}
      <section id="request-access" style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: 'transparent' }}>
        <Container maxWidth="md" style={{ paddingTop: '10vh', position: 'relative', zIndex: 2 }}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <Typography  variant="h2" align="center" gutterBottom color="#ffff" fontFamily="bold">
              Demander l'Accès
            </Typography>
            {requestSent ? (
              <Typography variant="body1" align="center" gutterBottom>
                Votre demande a été soumise avec succès.
              </Typography>
            ) : (
              <form onSubmit={handleRequestSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                  InputLabelProps={{
                    style: { color: 'white' }
                  }}
                  InputProps={{
                    style: { color: 'white' }
                  }}
                />
                <TextField
                  label="Prénom"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                  InputLabelProps={{
                    style: { color: 'white' }
                  }}
                  InputProps={{
                    style: { color: 'white' }
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                  InputLabelProps={{
                    style: { color: 'white' }
                  }}
                  InputProps={{
                    style: { color: 'white' }
                  }}
                />
                <Button variant="contained" color="primary"  type="submit">
                  Soumettre la Demande
                </Button>
              </form>
            )}
          </Paper>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Container maxWidth="md" style={{ paddingTop: '10vh' }}>
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <Typography variant="h2" align="center" gutterBottom color="#ffff" fontFamily="bold">
              Contactez-Nous
            </Typography>
            {feedbackSent ? (
              <Typography variant="body1" align="center" gutterBottom>
                Votre message a été envoyé avec succès.
              </Typography>
            ) : (
              <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom color="#ffff">
                  Laissez-nous votre message :
                </Typography>
              {/* Email input added here */}
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                  InputLabelProps={{
                    style: { color: 'white' }
                  }}
                  InputProps={{
                    style: { color: 'white' }
                  }}
                />
                <textarea
                  rows="6"
                  placeholder="Entrez votre message ici..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    color:'rgba(0, 0, 0, 0.4)'
                  }}
                />
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
                  Envoyer
                </Button>
              </form>
            )}
          </Paper>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
