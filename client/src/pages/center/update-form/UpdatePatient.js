/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import Switch from '@mui/material/Switch';
import PatientDepartment from '../PatientDepartment.js';
import Loader from 'utils/Loader.js';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index.js';

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

const UpdatePatient = ({ updatePatient }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const navigate = useNavigate();

    const [patientName, setPatientName] = useState(updatePatient.in_patient_name);
    const [patientEmail, setPatientEmail] = useState(updatePatient.in_patient_email);
    const [patientMobile, setPatientMobile] = useState(updatePatient.in_patient_mobile);
    const [patientMobileAlt, setPatientMobileAlt] = useState(updatePatient.in_patient_mobile_alt);
    const [patientAge, setPatientAge] = useState(updatePatient.in_patient_age);
    const [patientGender, setPatientGender] = useState(updatePatient.in_patient_gender);
    const [uhid, setUhid] = useState(updatePatient.in_uhid);
    const [govtUhid, setGovtUhid] = useState(updatePatient.in_govt_uhid);
    const [address, setAddress] = useState(updatePatient.in_patient_address);

    const [city, setCity] = useState(updatePatient.in_city_id);
    const [state, setState] = useState(updatePatient.in_state_id);
    const [country, setCountry] = useState(updatePatient.in_country_id);

    const [countryList, setCountryList] = useState({ country: [] });
    const [cityList, setCityList] = useState({ city: [] });
    const [stateList, setStateList] = useState({ state: [] });

    const [showCityList, setShowCityList] = useState();
    const [showCountryList, setShowCountryList] = useState();
    const [showStateList, setShowStateList] = useState();

    const [getStateList, setGetStateList] = useState(false);
    const [getCityList, setGetCityList] = useState(false);

    const [active, setActive] = useState(updatePatient.in_active);
    const initialRender = useRef(0);

    const [loader, setLoader] = useState(true);

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
            setLoader(true);
            initialRender.current++;
        }
    }, []);

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

    // useEffect(() => {
    //     if (error !== '') {
    //         setTimeout(() => {
    //             setError('');
    //         }, 2000);
    //     }
    // }, [error]);

    const storePatientName = (event) => {
        setPatientName(event.target.value);
    };

    const storePatientEmail = (event) => {
        setPatientEmail(event.target.value);
    };

    const storePatientMobile = (event) => {
        setPatientMobile(event.target.value);
    };

    const storePatientMobileAlt = (event) => {
        setPatientMobileAlt(event.target.value);
    };

    const storePatientAge = (event) => {
        setPatientAge(event.target.value);
    };

    const storePatientGender = (event) => {
        setPatientGender(event.target.value);
    };

    const storeUhid = (event) => {
        setUhid(event.target.value);
    };

    const storeGovtUhid = (event) => {
        setGovtUhid(event.target.value);
    };

    const storeAddress = (event) => {
        setAddress(event.target.value);
    };

    // const storeCity = (event) => {
    //     setCity(event.target.value);
    // };

    const selectStateHandler = (event) => {
        for (let i = 0; i < Object.values(stateList.state).length; i++) {
            if (stateList.state[i].name === event.target.value) {
                setState(stateList.state[i].id);
                break;
            }
        }
        setCity();
        setGetCityList((state) => !state);
    };

    const selectCountryHandler = (event) => {
        for (let i = 0; i < Object.values(countryList.country).length; i++) {
            if (countryList.country[i].name === event.target.value) {
                setCountry(countryList.country[i].id);
                break;
            }
        }
        setCityList({ city: [] });
        setCity();
        setState();
        setGetStateList((state) => !state);
    };

    const selectCityHandler = (event) => {
        for (let i = 0; i < Object.values(cityList.city).length; i++) {
            if (cityList.city[i].name === event.target.value) {
                setCity(cityList.city[i].id);
                break;
            }
        }
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    const handleReset = () => {
        setPatientName(updatePatient.in_patient_name);
        setPatientMobile(updatePatient.in_patient_mobile);
        setPatientMobileAlt(updatePatient.in_patient_mobile_alt);
        setPatientAge(updatePatient.in_patient_age);
        setPatientEmail(updatePatient.in_patient_email);
        setPatientGender(updatePatient.in_patient_gender === 'M' ? 'Male' : 'Female');
        setAddress(updatePatient.in_patient_address);
        setCity(updatePatient.in_city_id);
        setCountry(updatePatient.in_country_id);
        setState(updatePatient.in_state_id);
        setUhid(updatePatient.in_uhid);
        setGovtUhid(updatePatient.in_govt_uhid);
        setActive(updatePatient.in_active);
    };

    const patientHandler = (event) => {
        event.preventDefault();
        const data = {
            ...updatePatient,
            in_institute_id: user_info.out_institute_id,
            in_city_id: city,
            // in_city_id: updatePatient.in_city_id,
            in_state_id: state,
            // in_state_id: updatePatient.in_state_id,
            in_country_id: country,
            // in_country_id: updatePatient.in_country_id,
            in_uhid: uhid,
            in_govt_uhid: govtUhid,
            in_patient_id: updatePatient.in_patient_id,

            in_patient_name: patientName,
            in_patient_age: Number(patientAge),

            in_patient_gender: patientGender.toLowerCase() === 'male' ? 'M' : 'F',
            in_patient_email: patientEmail,
            in_patient_mobile: patientMobile,
            in_patient_mobile_alt: patientMobile,
            in_patient_address: address,
            in_created_by: user_info.out_userid,
            // in_active: updatePatient.in_active
            in_active: active
        };
        navigate('/patients', { state: { data, name: 'update' } });

        // console.log('INSIDE UPATE HANDLER...');
        // updatePatientHandler(data);
    };

    return (
        <>
            {/* <Dialog
                open={open}
                maxWidth="sm"
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
            > */}
            {loader ? (
                <form onSubmit={patientHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Patient
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
                            <Close />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto', spacing: 2 }}>
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="patient-name-input"
                                    label="Patient"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storePatientName}
                                    value={patientName}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="patient-email-input"
                                    label="Email"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storePatientEmail}
                                    value={patientEmail}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="patient-mobile-input"
                                    label="Mobile"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storePatientMobile}
                                    value={patientMobile}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="patient-mobile-alt-input"
                                    label="Alternative Mobile"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storePatientMobileAlt}
                                    value={patientMobileAlt}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="patient-age-input"
                                    label="Age"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storePatientAge}
                                    value={patientAge}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>

                            {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <TextField
                                        id="patient-gender-input"
                                        label="Gender"
                                        variant="outlined"
                                        sx={styles.input}
                                        onChange={storePatientGender}
                                        value={patientGender}
                                        InputProps={{
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl> */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patientGender}
                                    label="Gender"
                                    defaultValue={updatePatient.in_patient_gender === 'M' ? 'Male' : 'Female'}
                                    onChange={storePatientGender}
                                    style={{ fontSize: '10px' }}
                                >
                                    <MenuItem className="menu-item" style={{ fontSize: '10px', height: '1.1rem' }} value={'Male'}>
                                        Male
                                    </MenuItem>
                                    <MenuItem className="menu-item" style={{ fontSize: '10px', height: '1.1rem' }} value={'Female'}>
                                        Female
                                    </MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="patient-uhid-input"
                                    label="UHID"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeUhid}
                                    value={uhid}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="govt_uhid-input"
                                    label="Government UHID"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeGovtUhid}
                                    value={govtUhid}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <InputLabel id="demo-simple-select-label" html>
                                    Select Country
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Country"
                                    displayEmpty
                                    onChange={selectCountryHandler}
                                    defaultValue={updatePatient.in_country_name}
                                    style={{ fontSize: '10px' }}
                                >
                                    <MenuItem value>{updatePatient.in_country_name}</MenuItem>
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
                            <FormControl fullWidth style={{ marginBottom: '-2.5rem' }}>
                                <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="State"
                                    onChange={selectStateHandler}
                                    displayEmpty
                                    defaultValue={updatePatient.in_state_name}
                                    style={{ fontSize: '10px' }}
                                >
                                    <MenuItem value>{updatePatient.in_state_name}</MenuItem>
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
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', mt: '0.3rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="City"
                                    onChange={selectCityHandler}
                                    defaultValue={updatePatient.in_city_name}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showCityList && cityList && cityList.city.length != 0 ? (
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
                                        <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}> Select State First</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="patient-address-input"
                                    label="Address"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeAddress}
                                    value={address}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <PatientDepartment patientDetail={updatePatient} />

                        <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem' }}>
                            <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                            {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
                            <Switch onChange={activeHandler} defaultChecked={updatePatient.in_active} />
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
            ) : (
                <Loader />
            )}
            {/* </Dialog> */}

            {/* {error && (
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
            )} */}
        </>
    );
};

export default UpdatePatient;
