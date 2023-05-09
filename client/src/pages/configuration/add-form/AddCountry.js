/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Alert from '@mui/material/Alert';

const styles = {
    input: {
        marginBottom: '0.5rem',
        // marginTop: '0.8rem',
        width: '100%',
        height: '1.8rem'
    }
};

function AddCountry({ addCountryHandler, setAdd, error, setError }) {
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeCountry = (event) => {
        setCountry(event.target.value);
    };

    const countryHandler = (event) => {
        // event.preventDefault();
        addCountryHandler(country);
        console.log('add country');
    };

    const handleReset = () => {
        setCountry('');
    };

    return (
        <>
            <Dialog
                open={true}
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
                <form onSubmit={countryHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Country
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
                            label="Country Name"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeCountry}
                            value={country}
                            InputProps={{
                                style: { color: 'black', fontSize: '10px' }
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.3rem' }}>
                        <Button variant="contained" size="small" color="primary" onClick={() => countryHandler()}>
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
}

export default AddCountry;
