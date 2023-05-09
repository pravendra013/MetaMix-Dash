/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Switch } from '@mui/material';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const styles = {
    input: {
        marginBottom: '0.7rem',
        marginTop: '1rem',
        width: '100%',
        height: '1.8rem',
        marginTop: '0.5rem'
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

const UpdateDesignation = ({ updateDesignationHandler, setUpdate, error, setError, updateDesignation }) => {
    const [designation, setDesignation] = useState(updateDesignation.in_user_type_name);
    const [active, setActive] = useState(updateDesignation.in_active);
    const [fixedCenter, setFixedCenter] = useState(true);
    const [center, setCenter] = useState(updateDesignation.in_center_id);
    const [centerName, setCenterName] = useState(updateDesignation.in_center_name);
    const [list, setList] = useState({ center: [] });

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
    }, []);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeDesignation = (event) => {
        setDesignation(event.target.value);
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    const handleReset = () => {
        setDesignation(updateDesignation.in_user_type_name);
        setActive(updateDesignation.in_active);
    };

    const designationHandler = (event) => {
        event.preventDefault();
        const data = {
            in_user_type_name: designation,
            // in_user_type: updateDesignation.in_user_type,
            in_institute_id: user_info.out_institute_id,
            in_center_id: center,
            in_created_by: user_info.out_userid,
            in_active: active
        };
        updateDesignationHandler(data);
    };

    const selectCenterHandler = (event) => {
        for (let i = 0; i < Object.values(list.center).length; i++) {
            if (list.center[i].name === event.target.value) {
                setCenterName(list.center[i].name);
                setCenter(list.center[i].id);
                break;
            }
        }
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
                <form onSubmit={designationHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Designation
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
                        <TextField
                            id="institute-name-input"
                            label="Institute Name"
                            variant="outlined"
                            sx={styles.input}
                            style={{ marginBottom: '1.3rem', pointerEvents: 'none' }}
                            value={user_info.out_institute_name}
                            InputProps={{
                                style: { color: 'black', fontSize: '10px' }
                            }}
                        />
                        {/* <TextField
                            id="center-name-input"
                            label="Center Name"
                            variant="outlined"
                            sx={styles.input}
                            value={user_info.out_center_name}
                            InputProps={{
                                style: { color: 'black', fontSize: '10px' }
                            }}
                        /> */}
                        <FormControl fullWidth style={{ marginBottom: '0.5rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={centerName}
                                label="Center"
                                onChange={fixedCenter ? null : selectCenterHandler}
                                disabled={fixedCenter}
                                style={{ fontSize: '10px' }}
                            >
                                {list.center.map((name) => (
                                    <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                        {name.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            id="user-name-input"
                            label="Designation"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeDesignation}
                            value={designation}
                            InputProps={{
                                style: { color: 'black', fontSize: '10px' }
                            }}
                        />
                        <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem' }}>
                            <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                            <Switch onChange={activeHandler} defaultChecked={updateDesignation.in_active} />
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

export default UpdateDesignation;
