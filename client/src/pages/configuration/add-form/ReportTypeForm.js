/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Alert } from '@mui/material';

const styles = {
    input: {
        marginBottom: '0.7rem',
        width: '100%',
        height: '1.8rem'
        // marginTop: '0.5rem'
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: 'auto',
        marginTop: '0.5rem'
    }
};

const AddReportType = ({ addReportTypeHandler, setAdd, error, setError }) => {
    const [documentTypeName, setDocumentTypeName] = useState('');
    const [documentTypeExtension, setDocumentTypeExtension] = useState('');

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeDocumentTypeName = (event) => {
        setDocumentTypeName(event.target.value);
    };

    const storeDocumentTypeExtension = (event) => {
        setDocumentTypeExtension(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const data = { in_document_type_name: documentTypeName, in_document_type_extension: documentTypeExtension };
        addReportTypeHandler(data);
    };

    const handleReset = () => {
        setDocumentTypeName('');
        setDocumentTypeName('');
    };

    return (
        <>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setError('');
                    setAdd(false);
                }}
                onBackdropClick={() => {
                    setError('');
                    setAdd(false);
                }}
                onEscapeKeyDown={() => {
                    setError('');
                    setAdd(false);
                }}
            >
                <form onSubmit={submitHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Report Document Type
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
                                setAdd(false);
                            }}
                        >
                            <CancelRoundedIcon />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        <TextField
                            id="country-name-input"
                            label="Document Type Name"
                            variant="outlined"
                            sx={styles.input}
                            style={{ marginBottom: '1.5rem' }}
                            onChange={storeDocumentTypeName}
                            value={documentTypeName}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />

                        <TextField
                            id="country-name-input"
                            label="Document Type Extension"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeDocumentTypeExtension}
                            value={documentTypeExtension}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.3rem' }}>
                        <Button variant="contained" size="small" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="contained" size="small" color="error" onClick={handleReset}>
                            Reset
                        </Button>
                    </DialogActions>
                </form>
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
                        // sx={{ bgColor: 'darkgrey', color: 'red' }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default AddReportType;
