/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton, FormControl } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index.js';

const styles = {
    input: {
        marginBottom: '0.5rem',
        width: '100%',
        height: '1.8rem'
    }
};

const PatientDepartmentDetail = ({ setDetails, department }) => {
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
                        Patient-Department Detail
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
                            <Close />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="details"
                                label="Patient"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={department.patient_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="details"
                                label="Center"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={department.center_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="details"
                                label="Department"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={department.department_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </FormControl>
                    </DialogContent>
                </form>
                {/* <div style={{ position: 'absolute', bottom: '.2%', left: '3%' }}>
                    <Switch disabled defaultChecked={assetDetail.in_active} />
                </div> */}
            </Dialog>
        </>
    );
};

export default PatientDepartmentDetail;
