/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index.js';

import { Alert, Select, FormControl, InputLabel, MenuItem, Switch } from '@mui/material';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';

// const styles = {
//     input: {
//         marginBottom: '0.7rem',
//         width: '100%',
//         height: '1.8rem'
//     },
//     select: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'start',
//         height: 'auto',
//         marginTop: '0.5rem'
//     }
// };

// if (sessionStorage.getItem('user')) {
//     const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// }
// const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

const AssetUserAdd = ({ addUserHandler, setAdd, error, setError, asset_id, updateAsset }) => {
    if (sessionStorage.getItem('user')) {
        // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
        var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    }

    const [user, setUser] = useState();
    // const [userList, setUserList] = useState();

    const [centerlist, setCenterList] = useState({ center: [] });
    const [showCenter, setShowCenter] = useState(false);
    const [getCenterList, setGetCenterList] = useState(true);
    const [fixedCenter, setFixedCenter] = useState(true);
    const [center, setCenter] = useState(user_info.out_center_id);
    const [centerName, setCenterName] = useState(user_info.out_center_name);

    const [department, setDepartment] = useState();
    const [showDepartment, setShowDepartment] = useState(false);
    const [departmentlist, setDepartmentlist] = useState({ department: [] });
    const [getDepartmentList, setGetDepartmentList] = useState(false);

    const [getUserList, setGetUserList] = useState(false);
    const [userlist, setUserlist] = useState({ user: [] });
    const [showUser, setShowUser] = useState(false);

    const [active, setActive] = useState(0);
    // const initialRender = useRef(0);
    const stopRender = useRef(false);
    if (user_info.out_center_id === null && !stopRender.current) {
        stopRender.current = true;
        setFixedCenter(false);
    }
    const render = useRef(0);
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
                setShowCenter(true);
                setGetCenterList(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (getCenterList) {
            fetchCenterList();
        }
    }, []);

    // department
    useEffect(() => {
        const fetchDepartmentList = async () => {
            try {
                console.log('DEPARTMENT');
                // console.log(institute);

                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: center };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.departmentGet({ data: encryptedData });

                const data = crypt.decryptData(decryptedData);

                console.log(data);

                let department = [];
                for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
                    // if (data.department[i].center_name === center) {
                    department.push({ id: data.centerDepartment[i].department_id, name: data.centerDepartment[i].department_name });
                }
                // }
                console.log('department');
                console.log(department);
                setDepartmentlist(() => {
                    return { department: department };
                });
                setShowDepartment(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!getCenterList || center) fetchDepartmentList();
        console.log('Department');
    }, [getDepartmentList]);

    // useEffect(() => {
    //     const getUserList = async () => {
    //         try {
    //             const request = {
    //                 in_institute_id: updateAsset.in_institute_id,
    //                 in_center_id: updateAsset.in_center_id,
    //                 in_is_doctor: 1
    //             };
    //             // const request = {
    //             //     in_institute_id: 5,
    //             //     in_center_id: 7
    //             // };
    //             const encryptedData = crypt.encryptData(request);
    //             const { data: decryptedData } = await api.assetUserMappingUserList({ data: encryptedData });
    //             console.log(decryptedData);
    //             const data = crypt.decryptData(decryptedData); //Decryption of Data
    //             console.log(data);
    //             let row = [];
    //             for (let i = 0; i < Object.values(data.userList).length; i++) {
    //                 row.push({ name: data.userList[i].user_name, id: data.userList[i].user_id });
    //             }
    //             setUserList(row);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     if (initialRender.current === 0) {
    //         getUserList();
    //         initialRender.current++;
    //     }
    // }, []);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                console.log('User');
                // console.log(institute);

                // const institute = { in_institute_id: user_info.out_institute_id, in_center_id: center };
                const request = {
                    in_institute_id: updateAsset.in_institute_id,
                    in_center_id: center,
                    in_department_id: department,
                    in_is_doctor: 1
                };

                const encryptedData = crypt.encryptData(request);
                const { data: decryptedData } = await api.assetUserMappingUserList({ data: encryptedData });

                const data = crypt.decryptData(decryptedData);

                console.log(data);

                let user = [];
                for (let i = 0; i < Object.values(data.userList).length; i++) {
                    user.push({ name: data.userList[i].user_name, id: data.userList[i].user_id });
                }
                // }
                console.log('user');
                console.log(user);
                setUserlist(() => {
                    return { user: user };
                });
                setShowUser(true);
            } catch (error) {
                console.log(error);
            }
        };

        if ((!getDepartmentList || department) && render.current === 1) fetchUserList();
        console.log('User');
    }, [getUserList]);

    const selectCenterHandler = (event) => {
        for (let i = 0; i < Object.values(centerlist.center).length; i++) {
            if (centerlist.center[i].name === event.target.value) {
                setCenter(centerlist.center[i].id);
                setCenterName(centerlist.center[i].name);
                // setGetDepartmentList(true);
                break;
            }
        }
        if (render.current === 0) render.current = 1;
        setDepartment();
        setUser();
        setUserlist({ user: [] });
        setGetDepartmentList((state) => !state);

        // setGetDesignationList((state) => !state);
    };

    const selectDepartmentHandler = (event) => {
        for (let i = 0; i < Object.values(departmentlist.department).length; i++) {
            if (departmentlist.department[i].name === event.target.value) {
                setDepartment(departmentlist.department[i].id);
                break;
            }
        }
        setUser();
        setGetUserList((state) => !state);
    };

    const selectUserHandler = (event) => {
        for (let i = 0; i < Object.values(userlist.user).length; i++) {
            if (userlist.user[i].name === event.target.value) {
                setUser(userlist.user[i].id);
                break;
            }
        }
        // setGetDesignationList((state) => !state);
    };

    const handleReset = () => {
        // setDescription();
        // setDepartment();
    };

    // const selectedUserHandler = (event) => {
    //     for (let i = 0; i < Object.values(userList).length; i++) {
    //         console.log('hereee');
    //         if (userList[i].name === event.target.value) {
    //             console.log(userList[i].id);
    //             setUser(userList[i].id);
    //             break;
    //         }
    //     }
    // };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    const userHandler = (event) => {
        event.preventDefault();
        const data = {
            in_user_id: user,
            in_center_id: center,
            in_department_id: department,
            in_asset_id: asset_id,
            in_created_by: user_info.out_userid
        };
        addUserHandler(data);
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
                <form onSubmit={userHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add User For Asset
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
                        <FormControl fullWidth style={{ marginBottom: '0.9rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fixedCenter ? user_info.out_center_name : centerName}
                                label="Center"
                                onChange={fixedCenter ? null : selectCenterHandler}
                                disabled={fixedCenter}
                                style={{ fontSize: '10px' }}
                            >
                                {showCenter &&
                                    centerlist.center.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Department"
                                onChange={selectDepartmentHandler}
                                style={{ fontSize: '10px' }}
                            >
                                {showDepartment && departmentlist && departmentlist.department.length != 0 ? (
                                    departmentlist.department.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select Center </MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Doctor"
                                value={user}
                                onChange={selectUserHandler}
                                style={{ fontSize: '10px' }}
                            >
                                {/* {userList &&
                                    userList.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))} */}
                                {showUser && userlist && userlist.user.length != 0 ? (
                                    userlist.user.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select Department </MenuItem>
                                )}
                            </Select>
                        </FormControl>
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

export default AssetUserAdd;
