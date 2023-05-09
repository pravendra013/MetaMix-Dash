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
import Switch from '@mui/material/Switch';

const styles = {
    input: {
        marginBottom: '1.5rem',
        // marginTop: '1rem',
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

const UpdateCenter = ({ updateCenterHandler, setUpdate, error, setError, updateCenter }) => {
    const [user, setUser] = useState(updateCenter.in_user_name);
    const [contact, setContact] = useState(updateCenter.in_user_mobile);
    const [email, setEmail] = useState(updateCenter.in_user_email);
    const [address, setAddress] = useState(updateCenter.in_user_address);
    // const [center, setCenter] = useState(updateCenter.in_center_id);
    const [center, setCenter] = useState(updateCenter.in_center_name);
    const [country, setCountry] = useState(updateCenter.in_country_id);
    const [state, setState] = useState(updateCenter.in_state_id);
    const [city, setCity] = useState(updateCenter.in_city_id);

    const [countryList, setCountryList] = useState({ country: [] });
    const [stateList, setStateList] = useState({ state: [] });
    const [cityList, setCityList] = useState({ city: [] });

    const [showCityList, setShowCityList] = useState();
    const [showCountryList, setShowCountryList] = useState();
    const [showStateList, setShowStateList] = useState();

    const [getCountryList, setGetCountryList] = useState(true);
    const [getStateList, setGetStateList] = useState(false);

    const [getCityList, setGetCityList] = useState(false);

    const [active, setActive] = useState(updateCenter.in_active);

    const initialRender = useRef(0);

    // // //COUNTRY LIST

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
                setShowCountryList(true);
                // setGetCountryList(false);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchStateList = async () => {
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
                setShowStateList(true);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCityList = async () => {
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
                setShowCityList(true);
            } catch (error) {
                console.log(error);
            }
        };

        console.log('running', initialRender.current);
        if (initialRender.current === 0) {
            fetchList();
            fetchStateList();
            fetchCityList();
            initialRender.current++;
        }
    }, []);

    //STATE LIST

    useEffect(() => {
        const fetchStateList = async () => {
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
                setShowStateList(true);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialRender.current !== 0) {
            fetchStateList();
        }
    }, [getStateList]);

    //CITY LIST

    useEffect(() => {
        const fetchCityList = async () => {
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
                setShowCityList(true);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialRender.current !== 0) {
            fetchCityList();
        }
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

    // const storeUser = (event) => {
    //     setUser(event.target.value);
    // };
    // const storeContact = (event) => {
    //     setContact(event.target.value);
    // };
    // const storeEmail = (event) => {
    //     // console.log('UPDTE DATA..  ', updateCenter);
    //     setEmail(event.target.value);
    // };
    // const storeCenter = (event) => {
    //     setCenter(event.target.value);
    // };
    const storeAddress = (event) => {
        setAddress(event.target.value);
    };

    const selectCountryHandler = (event) => {
        for (let i = 0; i < Object.values(countryList.country).length; i++) {
            if (countryList.country[i].name === event.target.value) {
                setCountry(countryList.country[i].id);
                break;
            }
        }
        setGetStateList((state) => !state);
    };

    const selectStateHandler = (event) => {
        for (let i = 0; i < Object.values(stateList.state).length; i++) {
            if (stateList.state[i].name === event.target.value) {
                setState(stateList.state[i].id);
                break;
            }
        }

        setGetCityList((state) => !state);
    };
    const selectCityHandler = (event) => {
        for (let i = 0; i < Object.values(cityList.city).length; i++) {
            if (cityList.city[i].name === event.target.value) {
                setCity(cityList.city[i].id);
                break;
            }
        }
    };

    const handleReset = () => {
        setAddress(updateCenter.in_center_address);
    };

    const centerHandler = (event) => {
        event.preventDefault();
        const data = {
            in_institute_id: user_info.out_institute_id,
            in_user_name: user,
            in_user_email: email,
            in_center_address: address,
            in_user_mobile: contact,
            in_center_id: updateCenter.in_center_id,
            in_center_name: center,
            // in_user_id: updateCenter.in_user_id,
            in_country_id: country,
            in_state_id: state,
            in_city_id: city,
            in_created_by: user_info.out_userid,
            in_active: active
        };
        updateCenterHandler(data);
        console.log(' update data pass');
        console.log(data);
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
                <form onSubmit={centerHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        {' '}
                        Center
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

                    <DialogContent sx={{ height: 'auto' }}>
                        <Box sx={styles.select}>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="institute-name-input"
                                    label="Institute Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    style={{ marginBottom: '1.3rem', pointerEvents: 'none' }}
                                    value={user_info.out_institute_name}
                                    InputProps={{
                                        // readOnly: true,
                                        style: { color: 'black', fontSize: '10px', pointerEvents: 'none' }
                                    }}
                                />
                                <TextField
                                    id="country-name-input"
                                    label="Center Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // onChange={storeCenter}
                                    value={updateCenter.in_center_name}
                                    // value={center}
                                    // value={centerDetail.in_center_name}
                                    InputProps={{
                                        // readOnly: true,
                                        style: { color: 'black', fontSize: '10px', pointerEvents: 'none' }
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="user-name-input"
                                    label="User Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // onChange={storeUser}
                                    // defaultValue={updateCenter.in_user_name}
                                    value={updateCenter.in_user_name}
                                    // value={centerDetail.in_user_name}
                                    InputProps={{
                                        // readOnly: true,
                                        style: { color: 'black', fontSize: '10px', pointerEvents: 'none' }
                                    }}
                                />
                                <TextField
                                    id="country-name-input"
                                    label="Contact No"
                                    variant="outlined"
                                    sx={styles.input}
                                    // onChange={storeContact}
                                    // defaultValue={updateCenter.in_user_mobile}
                                    value={updateCenter.in_user_mobile}
                                    // value={centerDetail.in_user_mobile}
                                    InputProps={{
                                        // readOnly: true,
                                        style: { color: 'black', fontSize: '10px', pointerEvents: 'none' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem', mt: 0 }}>
                                <TextField
                                    id="country-name-input"
                                    label="Email"
                                    variant="outlined"
                                    sx={styles.input}
                                    // onChange={storeEmail}
                                    defaultValue={updateCenter.in_user_email}
                                    value={updateCenter.in_user_email}
                                    // value={centerDetail.in_user_email}
                                    InputProps={{
                                        // readOnly: true,
                                        style: { color: 'black', fontSize: '10px', pointerEvents: 'none' }
                                    }}
                                />
                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={updateCenter.in_country_name}
                                        displayEmpty
                                        label="Age"
                                        // value={updateCenter.in_country_name}
                                        onChange={selectCountryHandler}
                                        style={{ fontSize: '10px', pointerEvents: 'none' }}
                                    >
                                        <MenuItem value>{updateCenter.in_country_name}</MenuItem>
                                        {showCountryList &&
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
                            <Box sx={{ display: 'flex', gap: '1rem', marginTop: '-1rem', marginBottom: '0.5rem' }}>
                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={updateCenter.in_state_name}
                                        // value={user_state_name}
                                        displayEmpty
                                        label="Age"
                                        onChange={selectStateHandler}
                                        style={{ fontSize: '10px', pointerEvents: 'none' }}
                                    >
                                        <MenuItem value>{updateCenter.in_state_name}</MenuItem>
                                        {showStateList &&
                                            stateList &&
                                            stateList.state.map((name) => (
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

                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={updateCenter.in_city_name}
                                        // value={updateCenter.in_city_name}
                                        label="Age"
                                        onChange={selectCityHandler}
                                        style={{ fontSize: '10px', pointerEvents: 'none' }}
                                    >
                                        {showCityList &&
                                            cityList &&
                                            cityList.city.map((name) => (
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
                            <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Address"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeAddress}
                                    defaultValue={updateCenter.in_center_address}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}></Box>
                            <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem', mt: '-0.5rem' }}>
                                <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                                {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
                                <Switch onChange={activeHandler} defaultChecked={updateCenter.in_active} />
                            </Box>
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

export default UpdateCenter;
