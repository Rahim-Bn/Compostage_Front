import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ConfirmationDialog = ({ open, onClose, onConfirm, message, imageSrc }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '2%',
                textAlign: 'center'
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirmation
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
                {imageSrc && (
                    <Box display="flex" justifyContent="center" my={2}>
                        <img
                            src={imageSrc}
                            alt="confirmation"
                            style={{
                                width: '50px',
                                maxHeight: '50px',
                                objectFit: 'contain',
                                marginTop: '10px',
                                animation: 'popIn 0.3s ease-out'
                            }}
                        />
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={onClose} color="secondary" variant="contained" sx={{ mr: 2 }}>Cancel</Button>
                    <Button onClick={onConfirm} color="primary" variant="contained">Confirm</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationDialog;
