import React, { useState } from 'react';
import { Typography, Container, TextField, Button, Paper } from '@mui/material';
import background from '../assets/bg.mp4'; // Import the background video
import axios from 'axios'; // Import axios

const NavBar = () => {
  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 2 }}>
      <nav>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li style={{ marginRight: '1rem' }}>
            <a href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          </li>
          <li style={{ marginRight: '1rem' }}>
            <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          </li>
          <li style={{ marginRight: '1rem' }}>
            <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
          </li>
          <li>
            <a href="#download" style={{ color: 'white', textDecoration: 'none' }}>Download</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const HomePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend with email and message data
      const response = await axios.post('http://localhost:3000/feedbacks', { email, message });
  
      // Check if the request was successful
      if (response.status === 201) {
        // Feedback submitted successfully
        console.log('Feedback submitted successfully');
        // Clear the form fields after submission
        setEmail('');
        setMessage('');
      } else {
        // Handle error if the request was not successful
        console.error('Failed to submit feedback:', response.data.message);
      }
    } catch (error) {
      // Handle error if the request failed
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
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0
        }}
      />

      {/* Home Section */}
      <section id="home" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        {/* Welcome message */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            zIndex: 1
          }}
        >
          <Typography variant="h4" align="center" style={{ fontWeight: 'bold' }}>
            Welcome to Our Game
          </Typography>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: 'transparent' }}>
        <Container maxWidth="md" style={{ paddingTop: '10vh', position: 'relative', zIndex: 2 }}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: 'rgba(0, 0, 0, 1)' }}>
            <Typography variant="h2" align="center" gutterBottom style={{color: 'white'}}>
              About Us
            </Typography>
            <Typography variant="body1" align="center" gutterBottom style={{color: 'white'}}>
              Our company is dedicated to providing high-quality products and excellent customer service.
            </Typography>
          </Paper>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: 'transparent' }}>
        <Container maxWidth="md" style={{ paddingTop: '10vh', position: 'relative', zIndex: 2 }}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h2" align="center" gutterBottom>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="contained" color="primary" fullWidth type="submit">
                Send Message
              </Button>
            </form>
          </Paper>
        </Container>
      </section>

      {/* Download Section */}
      <section id="download" style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: 'transparent' }}>
        <Container maxWidth="md" style={{ paddingTop: '10vh', position: 'relative', zIndex: 2 }}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: 'rgba(0, 0, 0, 1)' }}>
            <Typography variant="h2" align="center" gutterBottom style={{color: 'white'}}>
              Download Our Game
            </Typography>
            <Typography variant="body1" align="center" gutterBottom style={{color: 'white'}}>
              Click the link below to download the game:
            </Typography>
            <Button variant="contained" color="primary" fullWidth href="https://drive.google.com/file/d/1Ksag8X3RdxCQaFAK0nvnvrIH67S4d_FO/view?usp=sharing" target="_blank">
              Download Game
            </Button>
          </Paper>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
