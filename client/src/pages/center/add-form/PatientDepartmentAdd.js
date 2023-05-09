/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index';
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
if (sessionStorage.getItem('user')) {
    // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
    var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
}
const PatientDepartmentAdd = ({ addDepartmentHandler, setAdd, error, setError }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    // const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const [department, setDepartment] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [showList, setShowList] = useState();
    const [getDepartmentList, setGetDepartmentList] = useState();

    // const [center, setCenter] = useState();
    // const [centerList, setCenterList] = useState();
    // const [showCenterList, setShowCenterList] = useState();
    const [fixedCenter, setFixedCenter] = useState(true);
    const [list, setList] = useState({ center: [] });
    const [center, setCenter] = useState(user_info.out_center_id);
    const [centerName, setCenterName] = useState(user_info.out_center_name);

    const render = useRef(0);
    const stopRender = useRef(false);
    if (user_info.out_center_id === null && !stopRender.current) {
        stopRender.current = true;
        setFixedCenter(false);
    }

    useEffect(() => {
        //Department List
        const fetchDepartmentList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.departmentList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.centerDepartmentList).length; i++) {
                    const n = {
                        id: data.centerDepartmentList[i].department_id,
                        name: data.centerDepartmentList[i].department_name
                    };
                    row.push(n);
                }
                setDepartmentList(row);
                setShowList(true);
            } catch (error) {
                console.log(crypt.decryptData(error.response.data));
            }
        };

        const fetchCenterList = async () => {
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

        if (render.current === 0) {
            if (user_info.out_center_id) fetchDepartmentList();
            // if (!user_info.out_center_id) fetchCenterList();
            fetchCenterList();
            render.current = 1;
        }
    }, []);

    useEffect(() => {
        const fetchDepartmentList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: center };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.departmentList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.centerDepartmentList).length; i++) {
                    const n = {
                        id: data.centerDepartmentList[i].department_id,
                        name: data.centerDepartmentList[i].department_name
                    };
                    row.push(n);
                }
                setDepartmentList(row);
                setShowList(true);
            } catch (error) {
                console.log(crypt.decryptData(error.response.data));
            }
        };
        fetchDepartmentList();
    }, [getDepartmentList]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    // const storeCountry = (event) => {
    //     setCountry(event.target.value);
    // };

    const selectCenterHandler = (event) => {
        console.log(event.target.value);
        for (let i = 0; i < Object.values(list.center).length; i++) {
            if (list.center[i].name === event.target.value) {
                setCenterName(list.center[i].name);
                setCenter(list.center[i].id);
                break;
            }
        }
        setDepartment();
        setGetDepartmentList((state) => !state);
    };

    const selectDepartmentHandler = (event) => {
        for (let i = 0; i < Object.values(departmentList).length; i++) {
            if (departmentList[i].name === event.target.value) {
                console.log(departmentList[i].id);
                setDepartment(departmentList[i].id);
                break;
            }
        }
    };

    const departmentHandler = (event) => {
        event.preventDefault();
        addDepartmentHandler(department);
    };

    const handleReset = () => {
        // setCountry('');
    };

    return (
        <>
            <Dialog
                open={true}
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
                {/* <form onSubmit={departmentHandler}>
                 */}
                <form>
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
                            <Close />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
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
                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Country"
                                onChange={selectDepartmentHandler}
                            >
                                {showList && departmentList ? (
                                    departmentList.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}> Select Center First</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.7rem' }}>
                        <Button variant="contained" size="small" color="primary" type="submit" onClick={departmentHandler}>
                            Submit
                        </Button>
                        <Button variant="contained" size="small" color="error" onClick={handleReset}>
                            Reset
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {error && (
                // <Box sx={{ position: 'absolute', top: '0.5rem', width: '30%', left: '45%', transform: 'translate(-15%)', zIndex: 2222 }}>
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

export default PatientDepartmentAdd;
