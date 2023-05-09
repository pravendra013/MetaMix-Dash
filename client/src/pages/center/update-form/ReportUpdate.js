//  eslint-disable

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
import { update } from 'lodash';
import PatientDepartment from '../PatientDepartment.js';
import Loader from 'utils/Loader.js';
import EditablePatientReport from '../EditablePatientReport.js';
import { useLocation } from 'react-router';

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

const UpdateReport = ({ updatePatient }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));

    // const { patientsDetail } = useLocation();
    // const [updatePatient, setUpdatePatient] = useState(patientsDetail);

    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const [patientName, setPatientName] = useState(updatePatient.in_patient_name);
    const [patientEmail, setPatientEmail] = useState(updatePatient.in_patient_email);
    const [patientMobile, setPatientMobile] = useState(updatePatient.in_patient_mobile);
    const [patientMobileAlt, setPatientMobileAlt] = useState(updatePatient.in_patient_mobile_alt);
    const [patientAge, setPatientAge] = useState(updatePatient.in_patient_age);
    const [patientGender, setPatientGender] = useState(updatePatient.in_patient_gender === 'M' ? 'Male' : 'Female');
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

    // const storePatientName = (event) => {
    //     setPatientName(event.target.value);
    // };

    // const storePatientEmail = (event) => {
    //     setPatientEmail(event.target.value);
    // };

    // const storePatientMobile = (event) => {
    //     setPatientMobile(event.target.value);
    // };

    // const storePatientMobileAlt = (event) => {
    //     setPatientMobileAlt(event.target.value);
    // };

    // const storePatientAge = (event) => {
    //     setPatientAge(event.target.value);
    // };

    // const storePatientGender = (event) => {
    //     setPatientGender(event.target.value);
    // };

    // const storeUhid = (event) => {
    //     setUhid(event.target.value);
    // };

    // const storeGovtUhid = (event) => {
    //     setGovtUhid(event.target.value);
    // };

    // const storeAddress = (event) => {
    //     setAddress(event.target.value);
    // };

    // const storeCity = (event) => {
    //     setCity(event.target.value);
    // };

    // const selectStateHandler = (event) => {
    //     for (let i = 0; i < Object.values(stateList.state).length; i++) {
    //         if (stateList.state[i].name === event.target.value) {
    //             setState(stateList.state[i].id);
    //             break;
    //         }
    //     }

    //     setGetCityList((state) => !state);
    // };

    // const selectCountryHandler = (event) => {
    //     for (let i = 0; i < Object.values(countryList.country).length; i++) {
    //         if (countryList.country[i].name === event.target.value) {
    //             setCountry(countryList.country[i].id);
    //             break;
    //         }
    //     }
    //     setGetStateList((state) => !state);
    // };

    // const selectCityHandler = (event) => {
    //     for (let i = 0; i < Object.values(cityList.city).length; i++) {
    //         if (cityList.city[i].name === event.target.value) {
    //             setCity(cityList.city[i].id);
    //             break;
    //         }
    //     }
    // };

    // const activeHandler = (event) => {
    //     setActive(event.target.checked === true ? 1 : 0);
    // };

    // const handleReset = () => {
    //     setPatientName(updatePatient.in_patient_name);
    //     setPatientMobile(updatePatient.in_patient_mobile);
    //     setPatientMobileAlt(updatePatient.in_patient_mobile_alt);
    //     setPatientAge(updatePatient.in_patient_age);
    //     setPatientEmail(updatePatient.in_patient_email);
    //     setPatientGender(updatePatient.in_patient_gender === 'M' ? 'Male' : 'Female');
    //     setAddress(updatePatient.in_patient_address);
    //     setCity(updatePatient.in_city_id);
    //     setCountry(updatePatient.in_country_id);
    //     setState(updatePatient.in_state_id);
    //     setUhid(updatePatient.in_uhid);
    //     setGovtUhid(updatePatient.in_govt_uhid);
    //     setActive(updatePatient.in_active);
    // };

    // const patientHandler = (event) => {
    //     event.preventDefault();
    //     const data = {
    //         in_institute_id: user_info.out_institute_id,

    //         in_city_id: city,
    //         // in_city_id: updatePatient.in_city_id,

    //         in_state_id: state,
    //         // in_state_id: updatePatient.in_state_id,

    //         in_country_id: country,
    //         // in_country_id: updatePatient.in_country_id,

    //         in_uhid: uhid,
    //         in_govt_uhid: govtUhid,
    //         in_patient_id: updatePatient.in_patient_id,

    //         in_patient_name: patientName,
    //         in_patient_age: Number(patientAge),

    //         in_patient_gender: patientGender.toLowerCase() === 'male' ? 'M' : 'F',
    //         in_patient_email: patientEmail,
    //         in_patient_mobile: patientMobile,
    //         in_patient_mobile_alt: patientMobile,
    //         in_patient_address: address,
    //         in_created_by: user_info.out_userid,
    //         // in_active: updatePatient.in_active
    //         in_active: active
    //     };
    //     updatePatientHandler(data);
    // };

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
                <div>
                    <form>
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
                                        // onChange={storePatientName}
                                        value={patientName}
                                        InputProps={{
                                            readOnly: true,
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
                                        // onChange={storePatientEmail}
                                        value={patientEmail}
                                        InputProps={{
                                            readOnly: true,
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
                                        // onChange={storePatientMobile}
                                        value={patientMobile}
                                        InputProps={{
                                            readOnly: true,
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
                                        // onChange={storePatientMobileAlt}
                                        value={patientMobileAlt}
                                        InputProps={{
                                            readOnly: true,
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
                                        // onChange={storePatientAge}
                                        value={patientAge}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <TextField
                                        id="patient-gender-input"
                                        label="Gender"
                                        variant="outlined"
                                        sx={styles.input}
                                        // onChange={storePatientGender}
                                        value={patientGender}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <TextField
                                        id="patient-uhid-input"
                                        label="UHID"
                                        variant="outlined"
                                        sx={styles.input}
                                        // onChange={storeUhid}
                                        value={uhid}
                                        InputProps={{
                                            readOnly: true,
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
                                        // onChange={storeGovtUhid}
                                        value={govtUhid}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <TextField
                                        id="patient-address-input"
                                        label="Address"
                                        variant="outlined"
                                        sx={styles.input}
                                        // onChange={storeAddress}
                                        value={address}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <TextField
                                        id="patient-address-input"
                                        label="Address"
                                        variant="outlined"
                                        sx={styles.input}
                                        // onChange={storeAddress}
                                        value={updatePatient.in_country_name}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <FormControl fullWidth style={{ marginBottom: '-2.5rem' }}>
                                    <TextField
                                        id="patient-address-input"
                                        label="Address"
                                        variant="outlined"
                                        sx={styles.input}
                                        // onChange={storeAddress}
                                        value={updatePatient.in_state_name}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                    <TextField
                                        id="patient-address-input"
                                        label="Address"
                                        variant="outlined"
                                        sx={styles.input}
                                        // onChange={storeAddress
                                        value={updatePatient.in_city_name}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem' }}>
                                <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                                <Switch defaultChecked={updatePatient.in_active} disabled />
                            </Box>
                        </DialogContent>

                        {/* <DialogActions sx={{ width: '96%', height: 'auto', mt: '-4.5rem' }}>
                            <Button variant="contained" size="small" color="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="contained" size="small" color="error" onClick={handleReset}>
                                Reset
                            </Button>
                        </DialogActions> */}
                    </form>
                    <EditablePatientReport updatePatient={updatePatient} patientsDetail={updatePatient} />
                </div>
            ) : (
                <Loader />
            )}
            {/* </Dialog> */}
            {/* 
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
            )} */}
        </>
    );
};

export default UpdateReport;
