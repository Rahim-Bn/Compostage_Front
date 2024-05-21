import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ConfirmationDialog from './confirmationDialog'; // Importer le composant ConfirmationDialog
import bg from '../assets/bj.jpg';
import updateImage from '../assets/update.png';
import addImage from '../assets/add.png';
import deleteImage from '../assets/delete.png'; // Import the delete image

const GestionEtudiant = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [newStudent, setNewStudent] = useState({ nom: '', prenom: '', email: '' });
    const [updateStudent, setUpdateStudent] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [addConfirmationOpen, setAddConfirmationOpen] = useState(false);
    const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);

    const fetchEtudiants = async () => {
        try {
            const response = await axios.get('http://localhost:3000/etudiants');
            setEtudiants(response.data.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des étudiants :', error);
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
            }
        } else {
            setNewStudent({ ...newStudent, [name]: value });
            if (name === 'email') {
                validateEmail(value);
            }
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Format email invalide');
        } else {
            setEmailError('');
        }
    };

    const handleAddStudent = async () => {
        try {
            const response = await axios.post('http://localhost:3000/etudiants', newStudent);
            fetchEtudiants();
            setNewStudent({ nom: '', prenom: '', email: '' });
            console.log('Étudiant ajouté :', response.data.data);
            setAddConfirmationOpen(false);
            setOpenModal(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'étudiant :', error);
        }
    };

    const handleUpdateStudent = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/etudiants/${updateStudent._id}`, updateStudent);
            fetchEtudiants();
            console.log('Étudiant mis à jour :', response.data.data);
            setUpdateStudent(null);
            setOpenModal(false);
            setUpdateConfirmationOpen(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'étudiant :', error);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/etudiants/${id}`);
            fetchEtudiants();
            console.log('Étudiant supprimé :', response.data.data);
            setDeleteConfirmationOpen(false); // Fermer la boîte de dialogue de confirmation de suppression
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'étudiant :', error);
        }
    };

    const handleOpenModal = (student) => {
        if (student) {
            setUpdateStudent(student);
        } else {
            setNewStudent({ nom: '', prenom: '', email: '' });
            setUpdateStudent(null);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleConfirmDelete = () => {
        if (studentToDelete) {
            handleDeleteStudent(studentToDelete._id);
            setStudentToDelete(null);
        }
    };

   

    const handleConfirmUpdate = () => {
        setUpdateConfirmationOpen(true);
    };

    const filteredStudents = etudiants.filter(student =>
        student.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', paddingLeft: '15%' }}>
             <div>
        <Typography variant="h2" align="center" gutterBottom style={{ padding: '30px',color: '#a3d977', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Gestion des étudiants
        </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ position: 'relative',   marginRight: '165px', marginTop:'50px'}}>
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
                            style={{ bottom: '20px', transform: 'translateX(-450%)', borderRadius: '50%',border: '2px solid black', padding: '16px', backgroundColor: 'green'}}
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            <PersonAddAltIcon style={{ fontSize: 40 }} />
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '2%', paddingRight: '15%', paddingLeft: '20%' }}>
    <Table sx={{ border: '2px solid black', borderRadius: '10px' }}>
        <TableHead>
            <TableRow style={{ backgroundColor: 'green' }}>
                <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center'  }}>ID</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center'  }}>Nom</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center'  }}>Prénom</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center'  }}>Email</TableCell>
                <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight:'2px solid black', borderBottom: '2px solid black', textAlign: 'center'  }}>Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Array.isArray(filteredStudents) && filteredStudents.map((student, index) => (
                <TableRow key={student._id} style={{ backgroundColor: '#a3d977' }}>
                    <TableCell style={{ borderRight: '2px solid black' ,fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>{index}</TableCell>
                    <TableCell style={{ borderRight: '2px solid black',fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>{student.nom}</TableCell>
                    <TableCell style={{ borderRight: '2px solid black',fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>{student.prenom}</TableCell>
                    <TableCell style={{ borderRight: '2px solid black',fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>{student.email}</TableCell>
                    <TableCell style={{ borderRight:'2px solid black',fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center' }} align='center'>
                        <Button 
                            onClick={() => handleOpenModal(student)}
                            startIcon={<ManageAccountsIcon style={{ fontSize: 30 }} />}
                            variant="outlined"
                            size="large"
                        />
                        <Button
                            onClick={() => {
                                setStudentToDelete(student);
                                setDeleteConfirmationOpen(true);
                            }}
                            startIcon={<DeleteIcon style={{ fontSize: 30 }} />}
                            variant="outlined"
                            size="large"
                            color="error"
                            style={{ marginLeft: '10px' }}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</div>


            
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center', // Align items vertically
                    maxWidth: '90%', // Adjust the width
                }}>
                    <Paper sx={{
                        width: '100%', // Ensure form takes full width
                        overflowY: 'auto',
                        bgcolor: '#f4f4f4',
                        boxShadow: 8,
                        borderRadius: '10px',
                        p: 4,
                        display: 'flex',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column', // Stack items vertically
                            flex: 1, // Allow the form to take up remaining space
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center" gutterBottom>
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
                                margin="normal"
                            />
                            <TextField
                                name="prenom"
                                label="Prénom"
                                variant="outlined"
                                size="small"
                                value={updateStudent ? updateStudent.prenom : newStudent.prenom}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
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
                                margin="normal"
                            />
                            <Button
                                onClick={updateStudent ? handleConfirmUpdate : handleAddStudent}
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                {updateStudent ? 'Enregistrer' : 'Ajouter'}
                            </Button>
                        </Box>
                        {updateStudent && (
    <img
        src={updateImage}
        alt="update"
        style={{
            width: '40%',
            marginLeft: '30px',
            borderRadius: '10px',
            animation: 'fadeInRight 0.5s ease-out' // Add animation for update image
        }}
    />
)}
{!updateStudent && (
    <img
        src={addImage}
        alt="add"
        style={{
            width: '40%',
            marginLeft: '20px',
            borderRadius: '10px',
            animation: 'fadeInLeft 0.5s ease-out' // Add animation for add image
        }}
    />
)}

                    </Paper>
                </Box>
            </Modal>
            {/* Boîte de dialogue de confirmation pour Supprimer */}
            <ConfirmationDialog
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Êtes-vous sûr de vouloir supprimer cet étudiant ?"
                imageSrc={deleteImage} // Pass the delete image
            />

            {/* Boîte de dialogue de confirmation pour Ajouter */}
            <ConfirmationDialog
                open={addConfirmationOpen}
                onClose={() => setAddConfirmationOpen(false)}
                onConfirm={handleAddStudent}
                message="Êtes-vous sûr de vouloir ajouter cet étudiant ?"
            />

            {/* Boîte de dialogue de confirmation pour Mettre à jour */}
            <ConfirmationDialog
                open={updateConfirmationOpen}
                onClose={() => setUpdateConfirmationOpen(false)}
                onConfirm={handleUpdateStudent}
                message="Êtes-vous sûr de vouloir mettre à jour cet étudiant ?"
            />
        </div>
    );
};

export default GestionEtudiant;
