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

const AddPatient = ({ addPatientHandler, setAdd, error, setError }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const [patientName, setPatientName] = useState();
    const [patientEmail, setPatientEmail] = useState();
    const [patientMobile, setPatientMobile] = useState();
    const [patientMobileAlt, setPatientMobileAlt] = useState();
    const [patientAge, setPatientAge] = useState();
    const [patientGender, setPatientGender] = useState();
    const [uhid, setUhid] = useState();
    const [govtUhid, setGovtUhid] = useState();
    const [address, setAddress] = useState();

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

    const [department, setDepartment] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [showDepartmentList, setShowDepartmentList] = useState(false);

    const [active, setActive] = useState();
    const initialRender = useRef(0);

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

        const fetchDepartment = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: encryptedCountryList } = await api.departmentGet({ data: encryptedData });

                const list = crypt.decryptData(encryptedCountryList); //Decryption of Data
                console.log(list);
                let department = [];
                for (let i = 0; i < Object.values(list.centerDepartment).length; i++) {
                    department.push({ id: list.centerDepartment[i].department_id, name: list.centerDepartment[i].department_name });
                }

                setDepartmentList(() => {
                    return { department: department };
                });
                setShowDepartmentList(true);
                // setGetCountryList(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (getCountryList) {
            fetchList();
            fetchDepartment();
        }
        console.log('Country');
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

    // useEffect(() => {
    //     const fetchStateList = async () => {
    //         try {
    //             const { data: encryptedStateList } = await api.stateGet();
    //             const stateList = crypt.decryptData(encryptedStateList); //Decryption of Data
    //             console.log(stateList);
    //             let state = [];
    //             let target = false;
    //             for (let i = 0; i < Object.values(stateList.state).length; i++) {
    //                 if (stateList.state[i].country_id === country) {
    //                     state.push({ id: stateList.state[i].state_id, name: stateList.state[i].state_name });
    //                     target = true;
    //                 }
    //             }
    //             console.log(state);
    //             setStateList(() => {
    //                 return { state: state };
    //             });
    //             if (state) setShowState(true);
    //         } catch (error) {}
    //     };
    //     console.log('state');
    //     if (initialRender.current === 1) fetchStateList();
    // }, [getStateList]);

    // useEffect(() => {
    //     const fetchCityList = async () => {
    //         try {
    //             const { data: encryptedStateList } = await api.cityGet();
    //             const cityList = crypt.decryptData(encryptedStateList);

    //             let city = [];
    //             let target = false;
    //             for (let i = 0; i < Object.values(cityList.city).length; i++) {
    //                 if (cityList.city[i].state_id === state) {
    //                     city.push({ id: cityList.city[i].city_id, name: cityList.city[i].city_name });
    //                     target = true;
    //                 }
    //             }

    //             setCityList(() => {
    //                 return { state: state };
    //             });
    //             if (target) setShowCity(true);
    //         } catch (error) {}
    //     };
    //     console.log('city');

    //     if (initialRender.current === 1) fetchCityList();
    // }, [getCityList]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

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
        // const data = String
        console.log(event.target.value);
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
        setCityList();
        setCity();
        setState();
        setStateList();
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

    const selectedDepartmentHandler = (event) => {
        for (let i = 0; i < Object.values(departmentList.department).length; i++) {
            if (departmentList.department[i].name === event.target.value) {
                setDepartment(departmentList.department[i].id);
                break;
            }
        }
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    const handleReset = () => {
        setPatientName();
        setPatientMobile();
        setPatientMobileAlt();
        setPatientAge();
        setPatientEmail();
        setPatientGender();
        setCity();
        setState();
        setCountry();
        setUhid();
        setGovtUhid();
        setAddress();
        setDepartment();
    };

    const patientHandler = (event) => {
        event.preventDefault();

        const data = {
            in_institute_id: user_info.out_institute_id,

            in_city_id: city,
            // in_city_id: 1,

            in_state_id: state,
            // in_state_id: 209,

            in_country_id: country,
            // in_country_id: 185,

            in_uhid: uhid,
            in_govt_uhid: govtUhid,

            in_patient_name: patientName,
            in_patient_age: Number(patientAge),

            in_patient_gender: patientGender ? (patientGender.toLowerCase() === 'male' ? 'M' : 'F') : 'M',
            in_patient_email: patientEmail,
            in_patient_mobile: patientMobile,
            in_patient_mobile_alt: patientMobileAlt,
            in_patient_address: address,
            in_created_by: user_info.out_userid,
            in_department_id: department,
            in_user_id: user_info.out_userid
        };

        addPatientHandler(data);
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
                <form onSubmit={patientHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Patient
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
                                    onChange={storePatientGender}
                                    style={{ fontSize: '10px' }}
                                >
                                    <MenuItem style={{ fontSize: '10px', height: '1.1rem' }} className="menu-item" value={'Male'}>
                                        Male
                                    </MenuItem>
                                    <MenuItem style={{ fontSize: '10px', height: '1.1rem' }} className="menu-item" value={'Female'}>
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
                                <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Country"
                                    onChange={selectCountryHandler}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showCountry && countryList ? (
                                        countryList.country.map((name) => (
                                            <MenuItem
                                                className="menu-item"
                                                value={name.name}
                                                style={{ fontSize: '10px', height: '1.1rem' }}
                                            >
                                                {name.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem>Sorry</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="State"
                                    onChange={selectStateHandler}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showState && stateList ? (
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
                                        <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select Country</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="City"
                                    onChange={selectCityHandler}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showCity && cityList ? (
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

                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Department"
                                    onChange={selectedDepartmentHandler}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showDepartmentList &&
                                        departmentList &&
                                        departmentList.department.map((name) => (
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
                    </DialogContent>
                    {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}>
                        <Switch onChange={activeHandler} />
                    </div> */}
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

export default AddPatient;
