import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Table, TableHead, TableBody, TableRow, TableCell, TextField, Modal, Box } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import bg from '../assets/bj.jpg';
import tunisiaImage from '../assets/Tunisia.png';
import coin from '../assets/coin.png';
import compost from '../assets/Compost.png';
import progressionIcon from '../assets/progression.png'; // Import the progression icon

const StyledTableCell = styled(TableCell)({
    color: '#fff',
    borderBottom: '2px solid #fff',
});

const StyledTableCellModal = styled(TableCell)({
    color: '#000',
    borderBottom: '2px solid #000',
    borderRight: '2px solid black', 
    textAlign: 'center', 
    width: '120px', // Set a fixed width
    height: '20px' // Set a fixed height
});

const EtudiantsProgression = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEtudiant, setSelectedEtudiant] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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

    const handleIconClick = async (etudiant) => {
        try {
            setSelectedEtudiant(etudiant);
            setModalOpen(true);
        } catch (error) {
            console.error('Error setting selected etudiant:', error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEtudiant(null);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', paddingLeft: '15%' }}>
            <div>
                <Typography variant="h2" align="center" gutterBottom style={{ padding: '30px', color: '#a3d977', fontWeight: 'bold', textShadow: '2px 10px 4px rgba(0, 0, 0, 4.5)' }}>
                    Progression des étudiants
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <div style={{ position: 'relative', marginRight: '240px', marginTop: '50px' }}>
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
                </div>
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                <div style={{ paddingTop: '2%', paddingRight: '15%', paddingLeft: '20%' }}>
                    <Table sx={{ border: '2px solid black', borderRadius: '10px' }}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'green' }}>
                                <StyledTableCell style={{ borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>ID</StyledTableCell>
                                <StyledTableCell style={{ borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>Nom</StyledTableCell>
                                <StyledTableCell style={{ borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>Prénom</StyledTableCell>
                                <StyledTableCell style={{ borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>Progression</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {etudiants.map((etudiant, index) => (
                                <TableRow key={index} style={{ backgroundColor: '#a3d977' }}>
                                    <TableCell style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>{index}</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>{etudiant.nom}</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>{etudiant.prenom}</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                        <img 
                                            src={progressionIcon} 
                                            alt="Progression" 
                                            style={{ width: '40px', height: '40px', cursor: 'pointer' }} 
                                            onClick={() => handleIconClick(etudiant)} 
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'rgba(255, 255, 255, 0.9)', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" component="h2" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <span style={{  color: 'green' }}>Progression de:</span> {selectedEtudiant && <span style={{ fontWeight: 'bold' }}>{selectedEtudiant.prenom} {selectedEtudiant.nom}</span>}
                </Typography>

                    <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                        {selectedEtudiant && selectedEtudiant.gouvernorat && selectedEtudiant.gouvernorat.length > 0 ? (
                            <Table sx={{ border: '2px solid black', borderRadius: '10px' }}>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: '#a3d977' }}>
                                        <StyledTableCellModal style={{ borderRight: '2px solid black', borderBottom: '2px solid black'}}>
                                            <img src={tunisiaImage} alt="Tunisia" style={{ width: '60px', height: '70px' }} />
                                        </StyledTableCellModal>
                                        <StyledTableCellModal style={{ borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                            Session
                                        </StyledTableCellModal>
                                        <StyledTableCellModal style={{ borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                            <img src={coin} alt="coin" style={{ width: '60px', height: '70px' }} />
                                        </StyledTableCellModal>
                                        <StyledTableCellModal style={{ borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                            <img src={compost} alt="compost" style={{ width: '60px', height: '60px' }} />
                                        </StyledTableCellModal>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedEtudiant.gouvernorat.reduce((acc, gov) => {
                                        const existingGovIndex = acc.findIndex(item => item.nom === gov.nom);
                                        if (existingGovIndex !== -1) {
                                            acc[existingGovIndex].sessions.push({
                                                argent: gov.argents,
                                                nombre_de_compost: gov.nombre_de_compost
                                            });
                                        } else {
                                            acc.push({
                                                nom: gov.nom,
                                                sessions: [{
                                                    argent: gov.argents,
                                                    nombre_de_compost: gov.nombre_de_compost
                                                }]
                                            });
                                        }
                                        return acc;
                                    }, []).map((gov, index) => (
                                        gov.sessions.map((session, sessionIndex) => (
                                            <TableRow key={`${index}-${sessionIndex}`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                                                {sessionIndex === 0 && (
                                                    <StyledTableCellModal rowSpan={gov.sessions.length} style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                                        {gov.nom}
                                                    </StyledTableCellModal>
                                                )}
                                                <StyledTableCellModal style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                                    {sessionIndex + 1}
                                                </StyledTableCellModal>
                                                <StyledTableCellModal style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                                    {session.argent}
                                                </StyledTableCellModal>
                                                <StyledTableCellModal style={{ fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>
                                                    {session.nombre_de_compost}
                                                </StyledTableCellModal>
                                            </TableRow>
                                        ))
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography variant="body1" gutterBottom>
                             Il n'a pas encore Jouer... 
                            </Typography>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EtudiantsProgression;
