/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton, FormControl } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index.js';

const styles = {
    input: {
        marginBottom: '0.7rem',
        width: '100%',
        height: '1.8rem',
        color: 'red'
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

const AssetUserDetail = ({ setDetails, assetUserDetail }) => {
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
                        Asset Details
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
                                label="User Name"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={assetUserDetail.in_user_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="details"
                                label="Mobile"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={assetUserDetail.in_user_mobile}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="details"
                                label="Email"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={assetUserDetail.in_user_email}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="details"
                                label="Asset Type"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={assetUserDetail.in_user_pin}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </FormControl>
                        {/* <FormControl> */}

                        {/* </FormControl> */}
                    </DialogContent>
                </form>
                {/* <div style={{ position: 'absolute', bottom: '.2%', left: '3%' }}>
                    <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                    <Switch disabled defaultChecked={assetUserDetail.in_active} />
                </div> */}
            </Dialog>
        </>
    );
};

export default AssetUserDetail;
