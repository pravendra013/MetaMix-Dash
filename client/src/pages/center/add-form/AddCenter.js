/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
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
        marginTop: '0.2rem',
        width: '100%',
        height: '1.8rem'
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: 'auto'
    }
};

// const { user_info } = JSON.parse(sessionStorage.getItem('user'));
const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
// if (sessionStorage.getItem('user')) {
//     var { user_info } = JSON.parse(sessionStorage.getItem('user'));
// }

const AddCenter = ({ addCenterHandler, setAdd, error, setError }) => {
    const [user, setUser] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [center, setCenter] = useState('');

    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();

    const [countryList, setCountryList] = useState({ country: [] });
    const [stateList, setStateList] = useState({ state: [] });
    const [cityList, setCityList] = useState({ state: [] });

    const [showCountry, setShowCountry] = useState(false);
    const [showState, setShowState] = useState(false);
    const [showCity, setShowCity] = useState(false);

    const [getCountryList, setGetCountryList] = useState(true);
    const [getStateList, setGetStateList] = useState(false);
    const [getCityList, setGetCityList] = useState(false);

    //GET COUNTRY LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedCountryList } = await api.countryGet();

                const list = crypt.decryptData(encryptedCountryList); //Decryption of Data

                let country = [];
                for (let i = 0; i < Object.values(list.country).length; i++) {
                    country.push({ id: list.country[i].country_id, name: list.country[i].country_name });
                }

                setCountryList(() => {
                    return { country: country };
                });
                setShowCountry(true);
                setGetCountryList(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (getCountryList) {
            fetchList();
        }
    }, []);

    //GET STATE LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(country);
                const { data: encryptedCountryList } = await api.stateGet({ in_country_id: country });

                const list = crypt.decryptData(encryptedCountryList); //Decryption of Data

                let state = [];
                for (let i = 0; i < Object.values(list.state).length; i++) {
                    if (list.state[i].country_id === country) state.push({ id: list.state[i].state_id, name: list.state[i].state_name });
                }
                console.log(state);
                setStateList(() => {
                    return { state: state };
                });
                setShowState(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!getCountryList) fetchList();
        console.log('State');
    }, [getStateList]);

    //GET CITY LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedCountryList } = await api.cityGet(state);

                const list = crypt.decryptData(encryptedCountryList); //Decryption of Data
                console.log(list);
                let city = [];
                for (let i = 0; i < Object.values(list.city).length; i++) {
                    if (list.city[i].state_id === state) city.push({ id: list.city[i].city_id, name: list.city[i].city_name });
                }
                console.log(city);

                setCityList(() => {
                    return { city: city };
                });
                setShowCity(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!getCountryList) fetchList();
        console.log('City');
    }, [getCityList]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeUser = (event) => {
        setUser(event.target.value);
    };
    const storeContact = (event) => {
        setContact(event.target.value);
    };
    const storeEmail = (event) => {
        setEmail(event.target.value);
    };
    const storeAddress = (event) => {
        setAddress(event.target.value);
    };
    const storeCenter = (event) => {
        setCenter(event.target.value);
    };

    const selectCityHandler = (event) => {
        for (let i = 0; i < Object.values(cityList.city).length; i++) {
            if (cityList.city[i].name === event.target.value) {
                setCity(cityList.city[i].id);
                break;
            }
        }
    };

    const selectStateHandler = (event) => {
        for (let i = 0; i < Object.values(stateList.state).length; i++) {
            if (stateList.state[i].name === event.target.value) {
                setState(stateList.state[i].id);
                break;
            }
        }
        setCity();
        setCityList();
        setGetCityList((state) => !state);
    };

    const selectCountryHandler = (event) => {
        for (let i = 0; i < Object.values(countryList.country).length; i++) {
            if (countryList.country[i].name === event.target.value) {
                setCountry(countryList.country[i].id);
                break;
            }
        }
        setCity();
        setCityList();
        setState();
        setStateList();
        setGetStateList((state) => !state);
    };

    const centerHandler = (event) => {
        event.preventDefault();
        const data = {
            in_institute_id: user_info.out_institute_id,
            in_user_name: user,
            in_user_email: email,
            in_center_address: address,
            in_user_mobile: contact,
            // in_center_id: center,
            in_center_name: center,
            in_country_id: country,
            in_state_id: state,
            in_city_id: city,
            in_created_by: user_info.out_userid
        };
        console.log('data findjg');
        console.log(data);
        addCenterHandler(data);
    };

    const handleReset = () => {
        setDoctor('');
        setContact('');
        setEmail('');
        setAddress('');
    };

    return (
        <>
            <Dialog
                open={open}
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
                <form onSubmit={centerHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Center
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
                            <Box sx={{ display: 'flex', gap: '1rem', mb: '0.2rem' }}>
                                <TextField
                                    id="institute-name-input"
                                    label="Institute Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    style={{ marginBottom: '1rem', pointerEvents: 'none' }}
                                    value={user_info.out_institute_name}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                                <TextField
                                    id="center-name-input"
                                    label="Center Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeCenter}
                                    value={center}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem', mb: '0.2rem' }}>
                                <TextField
                                    id="user-name-input"
                                    label="User Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeUser}
                                    value={user}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                                <TextField
                                    id="country-name-input"
                                    label="Contact No"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeContact}
                                    value={contact}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem', mb: '1.3rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Email"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeEmail}
                                    value={email}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                                <FormControl fullWidth style={{ marginBottom: '0.9rem' }}>
                                    <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={country}
                                        label="Country"
                                        onChange={selectCountryHandler}
                                        style={{ fontSize: '10px' }}
                                    >
                                        {showCountry &&
                                            countryList &&
                                            countryList.country.map((name) => (
                                                <MenuItem
                                                    className="menu-item"
                                                    value={name.name}
                                                    style={{ fontSize: '10px', height: '1.1rem' }}
                                                >
                                                    {name.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem', marginTop: '-1rem' }}>
                                <FormControl fullWidth style={{ marginBottom: '0.9rem' }}>
                                    <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state}
                                        label="State"
                                        onChange={selectStateHandler}
                                        style={{ fontSize: '10px' }}
                                    >
                                        {showState && stateList && stateList.length != 0 ? (
                                            stateList.state.map((name) => (
                                                <MenuItem
                                                    className="menu-item"
                                                    value={name.name}
                                                    style={{ fontSize: '10px', height: '1.1rem' }}
                                                >
                                                    {name.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select Country First</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth style={{ marginBottom: '0.9rem' }}>
                                    <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        label="City"
                                        onChange={selectCityHandler}
                                        style={{ fontSize: '10px' }}
                                    >
                                        {showCity && cityList && cityList.city ? (
                                            cityList.city.map((name) => (
                                                <MenuItem
                                                    className="menu-item"
                                                    value={name.name}
                                                    style={{ fontSize: '10px', height: '1.1rem' }}
                                                >
                                                    {name.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select State First</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Address"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeAddress}
                                    value={address}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}></Box>
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.7rem' }}>
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

export default AddCenter;
