import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import PatientReport from '../PatientReport.js';

const styles = {
    input: {
        marginBottom: '0.5rem',
        width: '100%',
        height: '1.8rem',
        color: 'red',
        pointerEvents: 'none'
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

const ReportDetails = ({ setDetails, patientsDetail }) => {
    return (
        <>
            {/* <Dialog
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
            > */}
            <form>
                <DialogTitle sx={{ height: '1rem', fontWeight: '900' }}>Patient Details</DialogTitle>
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

                <DialogContent sx={{ height: 'auto', spacing: 2 }}>
                    <Box sx={styles.select}>
                        <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                            <TextField
                                id="country-name-input"
                                label="Name"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_patient_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />

                            <TextField
                                id="country-name-input"
                                label="Mobile Number"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_patient_mobile}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                            <TextField
                                id="country-name-input"
                                label="Alternative Number"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_patient_mobile_alt}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                            <TextField
                                id="country-name-input"
                                label="Email"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_patient_email}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                            <TextField
                                id="country-name-input"
                                label="Gender"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_patient_gender === 'M' ? 'Male' : 'Female'}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />

                            <TextField
                                id="country-name-input"
                                label="Age"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_patient_age}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                            <TextField
                                id="country-name-input"
                                label="UHID"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_uhid}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />

                            <TextField
                                id="country-name-input"
                                label="Goverment UHID"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_govt_uhid}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                            <TextField
                                id="country-name-input"
                                label="Address"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_patient_address}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                            <TextField
                                id="country-name-input"
                                label="City"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_city_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                            <TextField
                                id="country-name-input"
                                label="State"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_state_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                            <TextField
                                id="country-name-input"
                                label="Country"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_country_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                            <TextField
                                id="country-name-input"
                                label="Department"
                                variant="outlined"
                                sx={styles.input}
                                value={patientsDetail.in_department_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                    </Box>
                </DialogContent>

                <PatientReport patientsDetail={patientsDetail} />
            </form>
            {/* </Dialog> */}
        </>
    );
};

export default ReportDetails;
