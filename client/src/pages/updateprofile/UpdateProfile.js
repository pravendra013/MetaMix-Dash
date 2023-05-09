// //  eslint-disable

import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const styles = {
    input: {
        marginBottom: '1.3rem',
        // marginTop: '0.5rem',
        width: '100%',
        height: '1.8rem'
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: 'auto',
        marginTop: '0.7rem'
    }
};
// const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// if (sessionStorage.getItem('user')) {
//     // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
//     var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
// }

const UpdateProfile = ({ updateProfileHandler, setUpdate, error, setError, updateProfile }) => {
    if (sessionStorage.getItem('user')) {
        // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
        var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    }
    const [user, setUser] = useState(user_info.out_user_name);
    const [contact, setContact] = useState(user_info.out_user_mobile);
    const [email, setEmail] = useState(user_info.out_user_email);
    const [address, setAddress] = useState(user_info.out_user_address);
    const [center, setCenter] = useState(user_info.out_center_id);
    const [designation, setDesignation] = useState(user_info.out_user_type);
    const [department, setDepartment] = useState(user_info.out_department_id);
    const [country, setCountry] = useState(user_info.out_country_id);
    const [state, setState] = useState(user_info.out_state_id);
    const [city, setCity] = useState(user_info.out_city_id);

    const [centerlist, setCenterList] = useState({ center: [] });
    const [showCenterList, setShowCenterList] = useState();
    const [getCenterList, setGetCenterList] = useState(false);
    const [fixedCenter, setFixedCenter] = useState(true);
    const [centerName, setCenterName] = useState(user_info.out_center_name);
    const [active, setActive] = useState(1);
    const initialRender = useRef(0);

    const stopRender = useRef(false);
    if (user_info.out_center_id === null && !stopRender.current) {
        stopRender.current = true;
        setFixedCenter(false);
    }

    // center
    useEffect(() => {
        const fetchCenterList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData);

                console.log(data);

                let center = [];
                for (let i = 0; i < Object.values(data.center).length; i++) {
                    center.push({ id: data.center[i].center_id, name: data.center[i].center_name });
                }

                setCenterList(() => {
                    return { center: center };
                });
                setShowCenterList(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (initialRender.current !== 0) {
            fetchCenterList();
        }
    }, [getCenterList]);

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

    const selectCenterHandler = (event) => {
        for (let i = 0; i < Object.values(centerlist.center).length; i++) {
            if (centerlist.center[i].name === event.target.value) {
                setCenter(centerlist.center[i].id);
                setCenterName(centerlist.center[i].name);
                console.log('getting center');
                console.log(centerlist);
                console.log(centerlist.center[0].id);
                // setGetDepartmentList(true);
                break;
            }
        }
        // setGetDepartmentList((state) => !state);
    };

    const handleReset = () => {
        setCity(updateProfile.in_city_name);
        setState(updateProfile.in_state_name);
        setCountry(updateProfile.in_country_name);
        setEmail(updateProfile.in_user_email);
        setAddress(updateProfile.in_user_address);
        setUser(updateProfile.in_user_name);
        setContact(updateProfile.in_user_mobile);
        setCenter(updateProfile.in_center_name);
        setDesignation(updateProfile.in_user_type_name);
        setDepartment(updateProfile.in_department_name);
    };

    const profileHandler = (event) => {
        event.preventDefault();
        const data = {
            in_institute_id: user_info.out_institute_id,
            in_user_name: user,
            in_user_email: email,
            in_user_address: address,
            in_user_mobile: contact,
            in_center_id: center,
            in_center_name: user_info.out_center_name,
            in_department_id: department,
            in_department_name: user_info.out_department_name,
            in_user_id: user_info.out_userid,
            in_user_type: designation,
            in_user_group_id: user_info.out_user_group_id,
            in_country_id: country,
            in_state_id: state,
            in_city_id: city,
            in_created_by: user_info.out_userid,
            in_is_doctor: 0,
            in_active: active
        };
        console.log(data);

        updateProfileHandler(data);
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
                <form onSubmit={profileHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Profile
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
                                    id="user-name-input"
                                    label="User Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeUser}
                                    // defaultValue={user_info.out_user_name}
                                    value={user_info.out_user_name}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px', pointerEvents: 'none' }
                                    }}
                                />
                                <TextField
                                    id="country-name-input"
                                    label="contact No"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeContact}
                                    defaultValue={user_info.out_user_mobile}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Email"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeEmail}
                                    // defaultValue={user_info.out_user_email}
                                    value={user_info.out_user_email}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px', pointerEvents: 'none' }
                                    }}
                                />
                                {/* <TextField
                                    id="country-name-input"
                                    label="Address"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeAddress}
                                    defaultValue={user_info.out_user_address}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                /> */}
                                <TextField
                                    id="country-name-input"
                                    label="Country Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // disabled
                                    value={user_info.out_country_name}
                                    InputProps={{
                                        readOnly: true,

                                        style: { color: 'black', fontSize: '10px', height: '2rem', pointerEvents: 'none' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem', marginTop: '-1rem', marginBottom: '0.5rem' }}>
                                {/* <TextField
                                    id="country-name-input"
                                    label="Country Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // disabled
                                    value={user_info.out_country_name}
                                    InputProps={{
                                        readOnly: true,

                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                /> */}

                                <TextField
                                    id="country-name-input"
                                    label="State Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // disabled
                                    value={user_info.out_state_name}
                                    InputProps={{
                                        readOnly: true,

                                        style: { color: 'black', fontSize: '10px', height: '2rem', pointerEvents: 'none' }
                                    }}
                                />
                                <TextField
                                    id="country-name-input"
                                    label="City Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // disabled
                                    value={user_info.out_city_name}
                                    InputProps={{
                                        readOnly: true,

                                        style: { color: 'black', fontSize: '10px', height: '2rem', pointerEvents: 'none' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                                {/* <TextField
                                    id="country-name-input"
                                    label="City Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // disabled
                                    value={user_info.out_city_name}
                                    InputProps={{
                                        readOnly: true,

                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                /> */}
                                <TextField
                                    id="country-name-input"
                                    label="Address"
                                    variant="outlined"
                                    sx={styles.input}
                                    onChange={storeAddress}
                                    defaultValue={user_info.out_user_address}
                                    InputProps={{
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                                {user_info.out_center_id && (
                                    <FormControl fullWidth style={{ marginBottom: '0.5rem' }}>
                                        {/* <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={centerName}
                                            label="Center"
                                            onChange={fixedCenter ? null : selectCenterHandler}
                                            disabled={fixedCenter}
                                            style={{ fontSize: '10px' }}
                                        >
                                            <MenuItem value> {user_info.out_center_name}</MenuItem>
                                            {showCenterList &&
                                                centerlist.center.map((name) => (
                                                    <MenuItem
                                                        className="menu-item"
                                                        value={name.name}
                                                        style={{ fontSize: '10px', height: '1.1rem' }}
                                                    >
                                                        {name.name}
                                                    </MenuItem>
                                                ))}
                                        </Select> */}
                                        <TextField
                                            id="country-name-input"
                                            label="Center Name"
                                            variant="outlined"
                                            sx={styles.input}
                                            // disabled
                                            value={user_info.out_center_name}
                                            InputProps={{
                                                readOnly: true,

                                                style: { color: 'black', fontSize: '10px', height: '2rem', pointerEvents: 'none' }
                                            }}
                                        />
                                    </FormControl>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Department Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // disabled
                                    value={user_info.out_department_name}
                                    InputProps={{
                                        readOnly: true,

                                        style: { color: 'black', fontSize: '10px', height: '2rem', pointerEvents: 'none' }
                                    }}
                                />

                                <TextField
                                    id="country-name-input"
                                    label="Designation Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // disabled
                                    value={user_info.out_user_type_name}
                                    InputProps={{
                                        readOnly: true,

                                        style: { color: 'black', fontSize: '10px', height: '2rem', pointerEvents: 'none' }
                                    }}
                                />
                            </Box>
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-2rem' }}>
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

export default UpdateProfile;
