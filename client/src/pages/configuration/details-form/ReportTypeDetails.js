/* eslint-disable */
// import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { FormControl } from '@mui/material';
// import '../configuration.css';
const styles = {
    input: {
        marginBottom: '1.5rem',
        width: '100%',
        height: '1.8rem'
        // pointerEvents: 'none'
    }
};

const ReportTypeDetails = ({ setDetails, reportTypeDetail }) => {
    return (
        <>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setDetails(false);
                }}
                onBackdropClick={() => {
                    setDetails(false);
                }}
                onEscapeKeyDown={() => {
                    setDetails(false);
                }}
            >
                <form>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Report Type Details
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
                                setDetails(false);
                            }}
                        >
                            <CancelRoundedIcon />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        <Box sx={styles.select}>
                            {/* <FormControl fullWidth style={{ marginBottom: '0.5rem' }}> */}
                            <TextField
                                id="details"
                                label="Report Type Name"
                                variant="outlined"
                                sx={styles.input}
                                value={reportTypeDetail.document_type_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                            {/* </FormControl> */}
                        </Box>
                        <TextField
                            id="details"
                            label="Document Type Extension"
                            variant="outlined"
                            sx={styles.input}
                            value={reportTypeDetail.document_type_extension}
                            InputProps={{
                                readOnly: true,
                                style: { color: 'black', fontSize: '10px', height: '2rem' }
                            }}
                        />
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default ReportTypeDetails;
