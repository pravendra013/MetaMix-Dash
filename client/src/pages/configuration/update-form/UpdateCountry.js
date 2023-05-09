/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { Alert } from '@mui/material';
import Switch from '@mui/material/Switch';

const styles = {
    input: {
        marginBottom: '0.7rem',
        width: '100%',
        height: '1.8rem'
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

const UpdateCountry = ({ updateCountryHandler, setUpdate, error, setError, updateCountry }) => {
    const [country, setCountry] = useState(updateCountry.in_country_name);
    const [active, setActive] = useState(updateCountry.in_active);

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
        event.preventDefault();
        const data = { in_country_name: country, in_active: active };
        updateCountryHandler(data);
    };

    const handleReset = () => {
        setCountry(updateCountry.in_country_name);
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
                <form onSubmit={countryHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Country
                    </DialogTitle>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            bg: 'red'
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
                            label="Country Name"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeCountry}
                            value={country}
                            InputProps={{
                                style: { color: 'black', fontSize: '10px' }
                            }}
                        />
                        <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem' }}>
                            <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                            {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
                            <Switch onChange={activeHandler} defaultChecked={updateCountry.in_active} />
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

export default UpdateCountry;
