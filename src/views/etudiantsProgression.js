import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, CircularProgress, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const StyledMain = styled('main')({
    minHeight: '100vh',
    backgroundColor: '#37474f',
    paddingTop: '7%', // Adjust left padding to account for the nav bar taking 15% of the page
});

const StyledTableCell = styled(TableCell)({
    color: '#fff',
    borderBottom: '2px solid #fff',
});

const EtudiantsProgression = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEtudiants = async () => {
        try {
            const response = await axios.get('http://localhost:3000/etudiants');
            setEtudiants(response.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching etudiants:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEtudiants();
    }, []);

    const filteredEtudiants = etudiants.filter(etudiant =>
        etudiant.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <StyledMain>
            <Container maxWidth="md">
                <Typography variant="h2" align="center" gutterBottom style={{ color: '#fff' }}>
                    Liste des Étudiants
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <TextField
                        label="Rechercher"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon color="disabled" />
                            ),
                            style: { color: 'white' }
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                    />
                </div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress color="inherit" />
                    </div>
                ) : (
                    <Table style={{ color: '#fff' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nom</StyledTableCell>
                                <StyledTableCell>Prénom</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Progression</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEtudiants.map((etudiant, index) => (
                                <TableRow key={index}>
                                    <TableCell>{etudiant.nom}</TableCell>
                                    <TableCell>{etudiant.prenom}</TableCell>
                                    <TableCell>{etudiant.email}</TableCell>
                                    <TableCell>{/* Progression data goes here */}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Container>
        </StyledMain>
    );
};

export default EtudiantsProgression;
