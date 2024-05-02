    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import Grid from '@mui/material/Grid';
    import TextField from '@mui/material/TextField';
    import Button from '@mui/material/Button';
    import Table from '@mui/material/Table';
    import TableHead from '@mui/material/TableHead';
    import TableBody from '@mui/material/TableBody';
    import TableRow from '@mui/material/TableRow';
    import TableCell from '@mui/material/TableCell';
    import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
    import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
    import DeleteIcon from '@mui/icons-material/Delete';
    import SearchIcon from '@mui/icons-material/Search';
    import Modal from '@mui/material/Modal';
    import Box from '@mui/material/Box';
    import Typography from '@mui/material/Typography';

    const EnseignantsCrud = () => {
        const [enseignants, setEnseignants] = useState([]);
        const [newEnseignant, setNewEnseignant] = useState({ nom: '', prenom: '', email: '', password: '' });
        const [updateEnseignant, setUpdateEnseignant] = useState(null);
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [openModal, setOpenModal] = useState(false);
        const [searchQuery, setSearchQuery] = useState('');

        const fetchEnseignants = async () => {
            try {
                const response = await axios.get('http://localhost:3000/enseignants');
                setEnseignants(response.data.data);
            } catch (error) {
                console.error('Error fetching enseignants:', error);
            }
        };

        useEffect(() => {
            fetchEnseignants();
        }, []);

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            if (updateEnseignant) {
                setUpdateEnseignant({ ...updateEnseignant, [name]: value });
                if (name === 'email') {
                    validateEmail(value);
                } else if (name === 'password') {
                    validatePassword(value);
                }
            } else {
                setNewEnseignant({ ...newEnseignant, [name]: value });
                if (name === 'email') {
                    validateEmail(value);
                } else if (name === 'password') {
                    validatePassword(value);
                }
            }
        };

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
            }
        };

        const validatePassword = (password) => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if (!passwordRegex.test(password)) {
                setPasswordError('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character');
            } else {
                setPasswordError('');
            }
        };

        const handleAddEnseignant = async () => {
            try {
                const response = await axios.post('http://localhost:3000/enseignants', newEnseignant);
                fetchEnseignants();
                setNewEnseignant({ nom: '', prenom: '', email: '', password: '' });
                console.log('Enseignant added:', response.data.data);
            } catch (error) {
                console.error('Error adding enseignant:', error);
            }
        };

        const handleUpdateEnseignant = async () => {
            try {
                const response = await axios.put(`http://localhost:3000/enseignants/${updateEnseignant._id}`, updateEnseignant);
                fetchEnseignants();
                console.log('Enseignant updated:', response.data.data);
                setUpdateEnseignant(null);
                setOpenModal(false);
            } catch (error) {
                console.error('Error updating enseignant:', error);
            }
        };

        const handleDeleteEnseignant = async (id) => {
            try {
                const response = await axios.delete(`http://localhost:3000/enseignants/${id}`);
                fetchEnseignants();
                console.log('Enseignant deleted:', response.data.data);
            } catch (error) {
                console.error('Error deleting enseignant:', error);
            }
        };

        const handleOpenModal = (enseignant) => {
            if (enseignant) {
                setUpdateEnseignant(enseignant);
            } else {
                setNewEnseignant({ nom: '', prenom: '', email: '', password: '' });
                setUpdateEnseignant(null);
            }
            setOpenModal(true);
        };

        const handleCloseModal = () => {
            setOpenModal(false);
        };

        const filteredEnseignants = enseignants.filter(enseignant =>
            enseignant.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enseignant.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enseignant.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div style={{ minHeight: '200vh', backgroundColor: '#37474f', paddingLeft: '15%' }}> {/* Adjust position and background color */}
                <Grid container spacing={2}>
                    <Grid item xs={15}>
                        <div style={{ padding: '10px' }}>
                            <h1>Gestion des Enseignants</h1>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px'}}>
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
                            <Button
                                onClick={() => handleOpenModal()}
                                style={{ borderRadius: '50%', padding: '16px' }} // Make the button circular and adjust padding
                                variant="contained" // Add a contained style to have a background color
                                color="primary" // Set primary color
                                size="large" // Increase the size of the button
                            >
                                <PersonAddAltIcon style={{ fontSize: 40 }} /> {/* Increase the icon size */}
                            </Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prénom</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredEnseignants.map(enseignant => (
                                        <TableRow key={enseignant._id}>
                                            <TableCell>{enseignant.nom}</TableCell>
                                            <TableCell>{enseignant.prenom}</TableCell>
                                            <TableCell>{enseignant.email}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleOpenModal(enseignant)}
                                                    startIcon={<ManageAccountsIcon style={{ fontSize: 30 }} />} // Increase the icon size
                                                    variant="outlined"
                                                    size="large" // Increase the size of the button
                                                >
                                                    {/* Remove the text content */}
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteEnseignant(enseignant._id)}
                                                    startIcon={<DeleteIcon style={{ fontSize: 30 }} />} // Increase the icon size
                                                    variant="outlined"
                                                    size="large" // Increase the size of the button
                                                    color="error"
                                                >
                                                    {/* Remove the text content */}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {updateEnseignant ? 'Modifier Enseignant' : 'Ajouter Enseignant'}
                                    </Typography>
                                    <TextField
                                        name="nom"
                                        label="Nom"
                                        variant="outlined"
                                        size="small"
                                        value={updateEnseignant ? updateEnseignant.nom : newEnseignant.nom}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="prenom"
                                        label="Prénom"
                                        variant="outlined"
                                        size="small"
                                        value={updateEnseignant ? updateEnseignant.prenom : newEnseignant.prenom}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        value={updateEnseignant ? updateEnseignant.email : newEnseignant.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        error={!!emailError}
                                        helperText={emailError}
                                    />
                                    <TextField
                                        name="password"
                                        label="Mot de passe"
                                        variant="outlined"
                                        size="small"
                                        value={updateEnseignant ? updateEnseignant.password : newEnseignant.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                        error={!!passwordError}
                                        helperText={passwordError}
                                    />
                                    <Button onClick={updateEnseignant ? handleUpdateEnseignant : handleAddEnseignant} variant="contained" color="primary" size="small">
                                        {updateEnseignant ? 'Enregistrer' : 'Ajouter'}
                                    </Button>
                                </Box>
                            </Modal>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    };

    export default EnseignantsCrud;
