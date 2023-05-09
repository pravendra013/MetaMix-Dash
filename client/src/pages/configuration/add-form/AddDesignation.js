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

// const { user_info } = JSON.parse(sessionStorage.getItem('user'));
if (sessionStorage.getItem('user')) {
    // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
    var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
}

const AddDesignation = ({ addDesignationHandler, setAdd, error, setError }) => {
    const [designation, setDesignation] = useState();
    const [fixedCenter, setFixedCenter] = useState(true);
    const [list, setList] = useState({ center: [] });
    const [center, setCenter] = useState(user_info.out_center_id);
    const [centerName, setCenterName] = useState(user_info.out_center_name);

    const stopRender = useRef(false);
    if (user_info.out_center_id === null && !stopRender.current) {
        stopRender.current = true;
        setFixedCenter(false);
    }

    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.centerList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log('data consoling');
                console.log(user_info.out_center_id != null);
                let center = [];
                for (let i = 0; i < Object.values(data.centerList).length; i++) {
                    center.push({ id: data.centerList[i].center_id, name: data.centerList[i].center_name });
                }
                setList(() => {
                    return { center: center };
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, [center]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const selectCenterHandler = (event) => {
        for (let i = 0; i < Object.values(list.center).length; i++) {
            if (list.center[i].name === event.target.value) {
                setCenterName(list.center[i].name);
                setCenter(list.center[i].id);
                break;
            }
        }
    };

    const storeDesignation = (event) => {
        setDesignation(event.target.value);
    };

    const handleReset = () => {
        setDesignation('');
    };

    const designationHandler = (event) => {
        event.preventDefault();
        const data = {
            in_user_type_name: designation,
            in_institute_id: user_info.out_institute_id,
            in_center_id: user_info.out_center_id,
            in_center_id: center,
            in_created_by: user_info.out_userid
        };
        addDesignationHandler(data);
        console.log('add design data');
        console.log(data);
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
                <form onSubmit={designationHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Designation
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
                        <Box sx={styles.select}>
                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fixedCenter ? user_info.out_center_name : centerName}
                                    label="Center"
                                    onChange={fixedCenter ? null : selectCenterHandler}
                                    disabled={fixedCenter}
                                    style={{ fontSize: '10px', color: 'black' }}
                                >
                                    {list.center.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            id="country-name-input"
                            label="Designation"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeDesignation}
                            value={designation}
                            InputProps={{
                                style: { color: 'black', fontSize: '10px' }
                            }}
                        />
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

export default AddDesignation;
