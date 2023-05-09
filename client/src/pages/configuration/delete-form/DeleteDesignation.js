/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { activeDeleteForm } from 'store/reducers/form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Alert from '@mui/material/Alert';

const DeleteDesignation = ({ setDeleteConfirmation, error, setError, setRemove }) => {
    const dispatch = useDispatch();

    return (
        <>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setError('');

                    setRemove(false);
                }}
                onBackdropClick={() => {
                    setError('');
                    setRemove(false);
                }}
                onEscapeKeyDown={() => {
                    setError('');
                    setRemove(false);
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: '900',
                        p: '5px',
                        backgroundColor: '#ECF2FF'
                    }}
                >
                    Delete Confirmation
                </DialogTitle>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0'
                    }}
                >
                    <IconButton
                        onClick={() => {
                            setError('');
                            setRemove(false);
                        }}
                    >
                        <CancelRoundedIcon />
                    </IconButton>
                </Box>

                <DialogContent>
                    <DialogContentText>Are you really want to delete all the data</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            setDeleteConfirmation((state) => !state);
                            setRemove(false);
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            setError('');
                            setRemove(false);
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {error && (
                <Box sx={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2222 }}>
                    <Alert
                        severity="error"
                        sx={{
                            backgroundColor: 'lightred',
                            color: 'red'
                        }}
                        onClose={() => {
                            setError('');
                        }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default DeleteDesignation;
