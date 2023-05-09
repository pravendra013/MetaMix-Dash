/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const styles = {
    input: {
        marginBottom: '1.5rem',
        width: '100%',
        height: '1.8rem'
        // pointerEvents: 'none'
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

const PatientsDetails = ({ setDetails, patientsDetail }) => {
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
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
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
                                    id="details"
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
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
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
                                    id="details"
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
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
                                    label="Gender"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={patientsDetail.in_patient_gender}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />

                                <TextField
                                    id="details"
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
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
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
                                    id="details"
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
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
                                    label="Country"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={patientsDetail.in_country_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                                <TextField
                                    id="details"
                                    label="State"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={patientsDetail.in_state_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
                                    label="City"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={patientsDetail.in_city_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                                <TextField
                                    id="details"
                                    label="Address"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={patientsDetail.in_patient_address}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                            </Box>
                        </Box>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default PatientsDetails;
