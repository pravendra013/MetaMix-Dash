/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';

const styles = {
    input: {
        marginBottom: '1.5rem',
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

// if (sessionStorage.getItem('user')) {
//     const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// }
// const { user_info } = JSON.parse(sessionStorage.getItem('user'));

const AddDepartment = ({ addDepartmentHandler, setAdd, error, setError }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const [department, setDepartment] = useState();
    const [description, setDescription] = useState();

    const [center, setCenter] = useState(user_info.out_center_id);
    const [centerList, setCenterList] = useState();
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        const getCenterList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id };
                // const institute = { in_institute_id: 1 };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.assetsCenter({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data

                let row = [];
                for (let i = 0; i < Object.values(data.centerList).length; i++) {
                    row.push({ center_name: data.centerList[i].center_name, center_id: data.centerList[i].center_id });
                }
                setCenterList(row);
                setShowList(true);
            } catch (error) {
                console.log(error);
            }
        };
        console.log('get center');
        getCenterList();
    }, []);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    const storeDescription = (event) => {
        setDescription(event.target.value);
    };

    const selectedCenterHandler = (event) => {
        for (let i = 0; i < Object.values(centerList).length; i++) {
            if (centerList[i].center_name === event.target.value) {
                console.log(centerList[i].center_id);
                setCenter(centerList[i].center_id);
                break;
            }
        }
    };

    const handleReset = () => {
        setDescription();
        setDepartment();
    };

    const departmentHandler = (event) => {
        event.preventDefault();
        const data = {
            in_department_name: department,
            in_department_decs: description,
            in_institute_id: user_info.out_institute_id,
            in_center_id: center,
            in_created_by: user_info.out_userid
        };
        addDepartmentHandler(data);
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
                <form onSubmit={departmentHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Department
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
                        {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}> */}
                        <TextField
                            id="institute-name-input"
                            label="Institute Name"
                            variant="outlined"
                            sx={styles.input}
                            value={user_info.out_institute_name}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                            style={{ pointerEvents: 'none' }}
                        />
                        {/* </FormControl> */}

                        {user_info.out_center_id ? (
                            <FormControl fullWidth style={{ marginBottom: '0.1rem' }}>
                                <TextField
                                    id="center-name-input"
                                    label="Center Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={user_info.out_center_name}
                                    InputProps={{
                                        style: { fontSize: '10px' }
                                    }}
                                    style={{ pointerEvents: 'none' }}
                                />
                            </FormControl>
                        ) : (
                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Center"
                                    onChange={selectedCenterHandler}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showList &&
                                        centerList.map((name) => (
                                            <MenuItem
                                                className="menu-item"
                                                value={name.center_name}
                                                style={{ fontSize: '10px', height: '1.1rem' }}
                                            >
                                                {name.center_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        )}

                        {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}> */}
                        <TextField
                            id="country-name-input"
                            label="Department"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeDepartment}
                            value={department}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                        {/* </FormControl> */}
                        {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}> */}
                        <TextField
                            id="country-name-input"
                            label="Description"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeDescription}
                            value={description}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                        {/* </FormControl> */}
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-1.1rem' }}>
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

export default AddDepartment;
