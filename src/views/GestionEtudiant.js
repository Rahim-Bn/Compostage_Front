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

const EtudiantsCrud = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [newStudent, setNewStudent] = useState({ nom: '', prenom: '', email: '', password: '' });
    const [updateStudent, setUpdateStudent] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEtudiants = async () => {
        try {
            const response = await axios.get('http://localhost:3000/etudiants');
            setEtudiants(response.data.data);
        } catch (error) {
            console.error('Error fetching etudiants:', error);
        }
    };

    useEffect(() => {
        fetchEtudiants();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (updateStudent) {
            setUpdateStudent({ ...updateStudent, [name]: value });
            if (name === 'email') {
                validateEmail(value);
            } else if (name === 'password') {
                validatePassword(value);
            }
        } else {
            setNewStudent({ ...newStudent, [name]: value });
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

    const handleAddStudent = async () => {
        try {
            const response = await axios.post('http://localhost:3000/etudiants', newStudent);
            fetchEtudiants();
            setNewStudent({ nom: '', prenom: '', email: '', password: '' });
            console.log('Student added:', response.data.data);
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleUpdateStudent = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/etudiants/${updateStudent._id}`, updateStudent);
            fetchEtudiants();
            console.log('Student updated:', response.data.data);
            setUpdateStudent(null);
            setOpenModal(false);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/etudiants/${id}`);
            fetchEtudiants();
            console.log('Student deleted:', response.data.data);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleOpenModal = (student) => {
        if (student) {
            setUpdateStudent(student);
        } else {
            setNewStudent({ nom: '', prenom: '', email: '', password: '' });
            setUpdateStudent(null);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    useEffect(() => {
        // Add CSS to remove scroll bar
        document.body.style.overflow = 'hidden';
        return () => {
            // Reset CSS when component unmounts
            document.body.style.overflow = 'unset';
        };
    }, []);

    const filteredStudents = etudiants.filter(student =>
        student.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ minHeight: '200vh', backgroundColor: '#37474f', paddingLeft: '15%' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ padding: '30px', color: '#fff' }}>
                        <h1>Gestion des Étudiants</h1>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ position: 'relative', marginRight: '30px' }}>
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
                                <Button
                                    onClick={() => handleOpenModal()}
                                    style={{ bottom: '-55px', transform: 'translateX(-50%)', borderRadius: '50%', padding: '16px' }}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    <PersonAddAltIcon style={{ fontSize: 30 }} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
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
                            {Array.isArray(filteredStudents) && filteredStudents.map(student => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.nom}</TableCell>
                                    <TableCell>{student.prenom}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleOpenModal(student)}
                                            startIcon={<ManageAccountsIcon style={{ fontSize: 30 }} />}
                                            variant="outlined"
                                            size="large"
                                        >
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteStudent(student._id)}
                                            startIcon={<DeleteIcon style={{ fontSize: 30 }} />}
                                            variant="outlined"
                                            size="large"
                                            color="error"
                                        >
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {updateStudent ? 'Modifier Étudiant' : 'Ajouter Étudiant'}
                    </Typography>
                    <TextField
                        name="nom"
                        label="Nom"
                        variant="outlined"
                        size="small"
                        value={updateStudent ? updateStudent.nom : newStudent.nom}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        name="prenom"
                        label="Prénom"
                        variant="outlined"
                        size="small"
                        value={updateStudent ? updateStudent.prenom : newStudent.prenom}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        size="small"
                        value={updateStudent ? updateStudent.email : newStudent.email}
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
                        value={updateStudent ? updateStudent.password : newStudent.password}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <Button onClick={updateStudent ? handleUpdateStudent : handleAddStudent} variant="contained" color="primary" size="small">
                        {updateStudent ? 'Enregistrer' : 'Ajouter'}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default EtudiantsCrud;
