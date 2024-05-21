import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import bg from '../assets/bj.jpg';

const Request = ({ setNewDemands }) => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:3000/requests');
            setRequests(response.data.data);
            // Check if there are new demands
            const hasNewDemands = response.data.data.some(request => !request.seen);
            setNewDemands(hasNewDemands);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [setNewDemands]);

    const handleAccept = async (id, nom, prenom, email) => {
        try {
            await axios.delete(`http://localhost:3000/requests/${id}`);
            await createEtudiant({ nom, prenom, email });
            console.log('Request accepted and etudiant created successfully');
            fetchRequests(); // Fetch requests again after accepting
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/requests/${id}`);
            console.log('Request rejected successfully');
            fetchRequests(); // Fetch requests again after rejecting
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const createEtudiant = async ({ nom, prenom, email }) => {
        try {
            const response = await axios.post('http://localhost:3000/etudiants', { nom, prenom, email });
            console.log('Etudiant created:', response.data);
        } catch (error) {
            console.error('Error creating etudiant:', error);
        }
    };

    return (
        <div style={{ minHeight: '100vh',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bg})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingLeft: '15%',
        }}>
         <div gutterBottom  style={{ padding: ' 30px',  color: '#a3d977', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: '2.5rem'}}>  
            <h2>Les demandes</h2>
             <div style={{paddingTop: '2%',paddingRight:'15%',paddingLeft:'20%' }}>  
                <Table sx={{ border: '2px solid black', borderRadius: '10px' }}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'green' }}>
                            <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>Nom</TableCell>
                            <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center' }}>Prénom</TableCell>
                            <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center'  }}>Email</TableCell>
                            <TableCell style={{ color: '#fff', fontWeight: 'bold', borderRight: '2px solid black', borderBottom: '2px solid black', textAlign: 'center'  }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request._id} style={{ backgroundColor:  '#a3d977' }}>
                                <TableCell style={{ borderRight: '2px solid black' ,fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>{request.nom}</TableCell>
                                <TableCell style={{ borderRight: '2px solid black' ,fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>{request.prenom}</TableCell>
                                <TableCell style={{ borderRight: '2px solid black' ,fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>{request.email}</TableCell>
                                <TableCell style={{ borderRight: '2px solid black' ,fontWeight: 'bold', borderBottom: '2px solid black', textAlign: 'center'  }}>
                                    <Button onClick={() => handleAccept(request._id, request.nom, request.prenom, request.email)} style={{ marginRight: '10px', color: '#fff', backgroundColor: 'green' }}>Accept</Button>
                                    <Button onClick={() => handleReject(request._id)} style={{ color: '#fff', backgroundColor: 'red' }}>Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
    );
};

export default Request;
