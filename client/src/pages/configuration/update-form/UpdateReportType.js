/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Switch from '@mui/material/Switch';
import { Alert } from '@mui/material';
// import '../configuration.css';
const styles = {
    input: {
        marginBottom: '1.2rem',
        width: '100%',
        height: '1.8rem'
    }
};

const UpdateReportType = ({ updateReportTypeHandler, setUpdate, error, setError, updateReportType }) => {
    const [documentTypeName, setDocumentTypeName] = useState(updateReportType.in_document_type_name);
    console.log('see eahs');
    console.log(updateReportType.in_document_type_name);
    console.log(updateReportType.in_document_type_extension);
    const [documentTypeExtension, setdocumentTypeExtension] = useState(updateReportType.in_document_type_extension);
    const [active, setActive] = useState(updateReportType.in_active);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storedocumentTypeName = (event) => {
        setDocumentTypeName(event.target.value);
    };

    const storedocumentTypeExtension = (event) => {
        setdocumentTypeExtension(event.target.value);
    };

    const reportTypeHandler = (event) => {
        event.preventDefault();
        const data = { in_document_type_name: documentTypeName, in_document_type_extension: documentTypeExtension, in_active: active };
        updateReportTypeHandler(data);
    };

    const handleReset = () => {
        setDocumentTypeName(updateReportType.in_document_type_name);
        setdocumentTypeExtension(updateReportType.in_document_type_extension);
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    return (
        <>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setError('');
                    setUpdate(false);
                }}
                onBackdropClick={() => {
                    setError('');
                    setUpdate(false);
                }}
                onEscapeKeyDown={() => {
                    setError('');
                    setUpdate(false);
                }}
            >
                <form onSubmit={reportTypeHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Report Type
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
                                setUpdate(false);
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
                            onChange={storedocumentTypeName}
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
                            onChange={storedocumentTypeExtension}
                            value={documentTypeExtension}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                        <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem', mt: '-1.5rem' }}>
                            <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                            {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
                            <Switch onChange={activeHandler} defaultChecked={updateReportType.in_active} />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-2.5rem' }}>
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
                    >
                        {error}
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default UpdateReportType;
