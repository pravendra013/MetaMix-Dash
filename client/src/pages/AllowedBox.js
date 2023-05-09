/* eslint-disable */
import React, { useEffect } from 'react';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '../../node_modules/@mui/icons-material/index';

const AllowedBox = ({ setPermission }) => {
    useEffect(() => {
        setTimeout(() => {
            setPermission(false);
        }, 5000);
    }, []);
    return (
        <>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setPermission(false);
                }}
                onBackdropClick={() => {
                    setPermission(false);
                }}
                onEscapeKeyDown={() => {
                    setPermission(false);
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: '900',
                        p: '5px',
                        backgroundColor: '#ECF2FF'
                    }}
                >
                    Unauthorize
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
                            setPermission(false);
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>

                <DialogContent sx={{ mt: '-1rem' }}>
                    <DialogContentText sx={{ color: 'black' }}>
                        You don't have permission to do this action please contact administration!!!!
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AllowedBox;
