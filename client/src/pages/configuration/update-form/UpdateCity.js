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
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import Switch from '@mui/material/Switch';

const styles = {
    input: {
        marginBottom: '0.5rem',
        width: '100%',
        height: '1.8rem',
        mt: '0.2rem'
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: 'auto',
        gap: '0.2rem'
    }
};

const UpdateCity = ({ updateCityHandler, setUpdate, error, setError, updateCity }) => {
    const [city, setCity] = useState(updateCity.in_city_name);
    const [state, setState] = useState(updateCity.in_state_id);
    const [country, setCountry] = useState(updateCity.in_country_name);

    const [list, setList] = useState({ country: [] });

    const [stateList, setStateList] = useState({ state: [] });
    const [getStateList, setGetStateList] = useState(false);
    const [showState, setShowState] = useState(false);

    const [active, setActive] = useState(updateCity.in_active);
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
            } catch (error) {}
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
        event.preventDefault();
        const data = { in_city_name: city, in_state_id: state, in_active: active };
        updateCityHandler(data);
    };

    const handleReset = () => {
        setCity(updateCity.in_city_name);
        setState(updateCity.in_state_name);
        setCountry(updateCity.in_country_name);
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
                <form onSubmit={cityHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        City
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
                                setUpdate(false);
                            }}
                        >
                            <CancelRoundedIcon />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto', spacing: 2 }}>
                        <Box sx={styles.select}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Country"
                                    onChange={selectCountryHandler}
                                    defaultValue={updateCity.in_country_name}
                                    style={{ fontSize: '10px' }}
                                >
                                    {list.country.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="State"
                                    onChange={selectStateHandler}
                                    defaultValue={updateCity.in_state_name}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showState &&
                                        stateList.state.map((name) => (
                                            <MenuItem
                                                className="menu-item"
                                                value={name.name}
                                                style={{ fontSize: '10px', height: '1.1rem' }}
                                            >
                                                {name.name}
                                            </MenuItem>
                                        ))}
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
                        <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem', mt: '0.1rem' }}>
                            <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                            {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
                            <Switch onChange={activeHandler} defaultChecked={updateCity.in_active} />
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

export default UpdateCity;
