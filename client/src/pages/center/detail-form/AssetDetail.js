/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index.js';

const styles = {
    input: {
        marginBottom: '1.5rem',
        width: '100%',
        height: '1.8rem'
        // pointerEvents: 'none'
    }
};

const AssetDetail = ({ setDetails, assetDetail }) => {
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
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <TextField
                                id="details"
                                label="Center"
                                variant="outlined"
                                sx={styles.input}
                                value={assetDetail.in_center_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <TextField
                                id="details"
                                label="Device Code"
                                variant="outlined"
                                sx={styles.input}
                                value={assetDetail.in_device_code}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <TextField
                                id="details"
                                label="Device ID"
                                variant="outlined"
                                sx={styles.input}
                                value={assetDetail.in_device_id}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>

                        <Box Box sx={{ display: 'flex', gap: '1rem' }}>
                            <TextField
                                id="details"
                                label="Asset Type"
                                variant="outlined"
                                sx={styles.input}
                                value={assetDetail.in_asset_type_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                    </DialogContent>
                </form>
                {/* <div style={{ position: 'absolute', bottom: '.2%', left: '3%' }}>
                    <Switch disabled defaultChecked={assetDetail.in_active} />
                </div> */}
            </Dialog>
        </>
    );
};

export default AssetDetail;
