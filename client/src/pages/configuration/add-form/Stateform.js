/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const styles = {
    input: {
        marginBottom: '1rem',
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

const AddState = ({ addStateHandler, setAdd, error, setError }) => {
    const [list, setList] = useState({ country: [] });
    const [state, setState] = useState('');
    const [country, setCountry] = useState();

    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedCountryList } = await api.countryGet();

                const countryList = crypt.decryptData(encryptedCountryList); //Decryption of Data

                let country = [];
                for (let i = 0; i < Object.values(countryList.country).length; i++) {
                    country.push({ id: countryList.country[i].country_id, name: countryList.country[i].country_name });
                }

                setList(() => {
                    return { country: country };
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, []);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeState = (event) => {
        setState(event.target.value);
    };

    const stateHandler = (event) => {
        event.preventDefault();
        const data = { in_state_name: state, in_country_id: country };
        addStateHandler(data);
    };

    const handleReset = () => {
        setCountry('');
        setState('');
    };

    const selectCountryHandler = (event) => {
        for (let i = 0; i < Object.values(list.country).length; i++) {
            if (list.country[i].name === event.target.value) {
                setCountry(list.country[i].id);
                break;
            }
        }
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
                <form onSubmit={stateHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add State
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
                        <Box sx={styles.select}>
                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={country}
                                    label="Age"
                                    onChange={selectCountryHandler}
                                    style={{ fontSize: '10px' }}
                                >
                                    {list.country.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            id="country-name-input"
                            label="State Name"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeState}
                            value={state}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.7rem' }}>
                        <Button variant="contained" size="small" color="primary" onClick={stateHandler}>
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
                        // sx={{ bgColor: 'darkgrey', color: 'red' }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default AddState;
