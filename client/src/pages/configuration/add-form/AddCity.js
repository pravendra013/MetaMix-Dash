/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import { Alert, Select, FormControl, InputLabel, MenuItem, Menu } from '@mui/material';

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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const AddCity = ({ addCityHandler, setAdd, error, setError }) => {
    const [city, setCity] = useState('');
    const [state, setState] = useState();
    const [country, setCountry] = useState();

    const [list, setList] = useState({ country: [] });

    const [stateList, setStateList] = useState({ state: [] });
    const [getStateList, setGetStateList] = useState(false);
    const [showState, setShowState] = useState(false);

    const initialRender = useRef(0);

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

        const fetchStateList = async () => {
            try {
                const { data: encryptedStateList } = await api.stateGet();
                const stateList = crypt.decryptData(encryptedStateList); //Decryption of Data
                console.log(stateList);

                let state = [];
                for (let i = 0; i < Object.values(stateList.state).length; i++) {
                    if (stateList.state[i].country_name === country) {
                        state.push({ id: stateList.state[i].state_id, name: stateList.state[i].state_name });
                    }
                }

                setStateList(() => {
                    return { state: state };
                });
                setShowState(true);
            } catch (error) {
                console.log('state not found');
            }
        };

        if (initialRender.current === 0) {
            fetchList();
            initialRender.current++;
        }
        if (initialRender.current === 1) fetchStateList();
    }, [getStateList]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeCity = (event) => {
        setCity(event.target.value);
    };

    const cityHandler = (event) => {
        // event.preventDefault();
        const data = { in_city_name: city, in_state_id: state };
        addCityHandler(data);
        console.log('add city');
    };

    const handleReset = () => {
        // setCity('');
        setCountry('');
        // setShowState(false);
        setCity('');
    };

    const selectStateHandler = (event) => {
        for (let i = 0; i < Object.values(stateList.state).length; i++) {
            if (stateList.state[i].name === event.target.value) {
                setState(stateList.state[i].id);
                break;
            }
        }
    };

    const selectCountryHandler = (event) => {
        setCountry(event.target.value);
        setGetStateList((state) => !state);
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
                <form onSubmit={cityHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add City
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

                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state}
                                    label="Age"
                                    onChange={selectStateHandler}
                                    style={{ fontSize: '10px' }}
                                    // MenuProps={MenuProps}
                                >
                                    {showState && stateList && stateList.state.length != 0 ? (
                                        stateList.state.map((name) => (
                                            <MenuItem
                                                value={name.name}
                                                className="menu-item"
                                                style={{ fontSize: '10px', height: '1.1rem' }}

                                                // sx={{
                                                //     '&:hover': { backgroundColor: '#85CDFD', color: 'white' },
                                                //     fontSize: '10px',
                                                //     height: '1.1rem'
                                                // }}
                                            >
                                                {name.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select Country First</MenuItem>
                                    )}

                                    {!showState && (
                                        <option value="none" selected disabled hidden>
                                            Select an State
                                        </option>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            id="country-name-input"
                            label="City Name"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeCity}
                            value={city}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.7rem' }}>
                        <Button variant="contained" size="small" color="primary" onClick={() => cityHandler()}>
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

export default AddCity;
