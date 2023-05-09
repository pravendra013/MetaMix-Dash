/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Checkbox } from '@mui/material';
// import { Close } from '../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import '../configuration/configuration.css';

import * as api from '../../api/index';
import * as crypt from '../../utils/crypto.js';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const styles = {
    input: {
        marginBottom: '1rem',
        width: '100%',
        height: '1.8rem',
        marginTop: '0.4rem'
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: 'auto'
        // marginTop: '0.5rem'
    }
};

// const { user_info } = JSON.parse(sessionStorage.getItem('user'));

const UpdateSecurity = ({ updateSecurityHandler, setUpdate, error, setError, updateSecurity }) => {
    if (sessionStorage.getItem('user')) {
        // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
        var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    }
    const [fixedCenter, setFixedCenter] = useState(true);
    const [userGroupName, setUserGroupName] = useState(updateSecurity.in_user_group_name);
    const [center, setCenter] = useState(updateSecurity.in_center_id);
    console.log('getting center');
    console.log(updateSecurity.in_center_id);
    const [securitydata, setSecurityData] = useState({ securityOptions: [] });
    const [fixedSecurityData, setFixedSecurityData] = useState({ fixedSecurityOptions: [] });
    const [centerName, setCenterName] = useState(updateSecurity.in_center_name);

    const [list, setList] = useState({ center: [] });

    const stopRender = useRef(false);
    if (user_info.out_center_id === null && !stopRender.current) {
        stopRender.current = true;
        setFixedCenter(false);
    }

    const rows = securitydata.securityOptions.map((row) => ({
        id: row.id,
        user_group_security_id: row.user_group_security_id,
        security_option_id: row.security_option_id,
        security_option_name: row.security_option_name,
        all: row.all,
        add: row.add,
        view: row.view,
        update: row.update,
        delete: row.delete,
        index: row.id
    }));

    console.log('getting rows');
    console.log(rows);

    const columns = [
        {
            field: 'security_option_name',
            headerName: 'Security Options',
            flex: 1,
            editable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'all',
            headerName: 'All',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Checkbox size="small" checked={params.row.all} onChange={(event) => handleAllChange(event, params.row.id)} />
            )
        },
        {
            field: 'add',
            headerName: 'Add',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Checkbox size="small" checked={params.row.add} onChange={(event) => handleCheckboxChange(event, params.row.id, 'add')} />
            )
        },
        {
            field: 'view',
            headerName: 'View',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Checkbox size="small" checked={params.row.view} onChange={(event) => handleCheckboxChange(event, params.row.id, 'view')} />
            )
        },
        {
            field: 'update',
            headerName: 'Update',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Checkbox
                    size="small"
                    checked={params.row.update}
                    onChange={(event) => handleCheckboxChange(event, params.row.id, 'update')}
                />
            )
        },
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Checkbox
                    size="small"
                    checked={params.row.delete}
                    onChange={(event) => handleCheckboxChange(event, params.row.id, 'delete')}
                />
            )
        }
    ];

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

                const userGroup = { in_user_group_id: updateSecurity.in_user_group_id };
                const encryptedDataUg = crypt.encryptData(userGroup);
                const { data: decryptedDataUg } = await api.getUserGroupSecurity({ data: encryptedDataUg });
                const dataUg = crypt.decryptData(decryptedDataUg); //Decryption of Data
                console.log('data consoling');
                console.log(Object.values(dataUg.userGroupSecurity).length);
                console.log(dataUg);
                const securityOptions = [];
                const fixedSecurityOptions = [];
                for (let i = 0; i < Object.values(dataUg.userGroupSecurity).length; i++) {
                    if (
                        dataUg.userGroupSecurity[i].view +
                            dataUg.userGroupSecurity[i].add +
                            dataUg.userGroupSecurity[i].update +
                            dataUg.userGroupSecurity[i].delete ==
                        4
                    ) {
                        var all = 1;
                    } else {
                        var all = 0;
                    }
                    securityOptions.push({
                        id: dataUg.userGroupSecurity[i].user_group_security_id,
                        user_group_security_id: dataUg.userGroupSecurity[i].user_group_security_id,
                        security_option_id: dataUg.userGroupSecurity[i].security_option_id,
                        security_option_name: dataUg.userGroupSecurity[i].security_option_name,
                        view: dataUg.userGroupSecurity[i].view,
                        add: dataUg.userGroupSecurity[i].add,
                        update: dataUg.userGroupSecurity[i].update,
                        delete: dataUg.userGroupSecurity[i].delete,
                        all: all
                    });
                    fixedSecurityOptions.push({
                        id: dataUg.userGroupSecurity[i].user_group_security_id,
                        user_group_security_id: dataUg.userGroupSecurity[i].user_group_security_id,
                        security_option_id: dataUg.userGroupSecurity[i].security_option_id,
                        security_option_name: dataUg.userGroupSecurity[i].security_option_name,
                        view: dataUg.userGroupSecurity[i].view,
                        add: dataUg.userGroupSecurity[i].add,
                        update: dataUg.userGroupSecurity[i].update,
                        delete: dataUg.userGroupSecurity[i].delete,
                        all: all
                    });
                }
                setSecurityData(() => {
                    return { securityOptions: securityOptions };
                });
                setFixedSecurityData(() => {
                    return { fixedSecurityOptions: fixedSecurityOptions };
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, []);

    console.log('data finding');

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeuserGroupName = (event) => {
        setUserGroupName(event.target.value);
    };

    const userGroupHandler = (event) => {
        event.preventDefault();
        const data = { in_center_id: center, in_user_group_name: userGroupName, securityOptions: securitydata };
        console.log('data brick');
        console.log(data);
        updateSecurityHandler(data);
    };

    const handleReset = () => {
        setCenter(updateSecurity.in_center_id);
        console.log('inside something');
        console.log(securitydata);
        setUserGroupName(updateSecurity.in_user_group_name);
        const temp = fixedSecurityData.fixedSecurityOptions;
        console.log(temp.length);
        const newFixedSecurityOptions = [];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].view + temp[i].add + temp[i].update + temp[i].delete == 4) {
                var all = 1;
            } else {
                var all = 0;
            }
            newFixedSecurityOptions.push({
                id: temp[i].user_group_security_id,
                user_group_security_id: temp[i].user_group_security_id,
                security_option_id: temp[i].security_option_id,
                security_option_name: temp[i].security_option_name,
                view: temp[i].view,
                add: temp[i].add,
                update: temp[i].update,
                delete: temp[i].delete,
                all: all
            });
        }
        setSecurityData(() => {
            return { securityOptions: newFixedSecurityOptions };
        });
    };

    const handleAllChange = (event, index) => {
        console.log('handle all changed called');
        console.log('geeting rows again');
        console.log(rows);
        console.log('getting index in all change check box');
        console.log(index);
        const newData = rows.map((row) => {
            if (row.index === index) {
                const newValue = event.target.checked ? 1 : 0;
                return {
                    ...row,
                    all: newValue,
                    add: newValue,
                    view: newValue,
                    update: newValue,
                    delete: newValue
                };
            } else {
                const allChecked = row.add && row.view && row.update && row.delete;
                return {
                    ...row,
                    all: allChecked ? 1 : 0
                };
            }
        });

        setSecurityData(() => {
            return { securityOptions: newData };
        });
    };

    const handleCheckboxChange = (event, index, column) => {
        console.log('handle check box changed called');
        console.log('geeting rows again in check box');
        console.log(rows);
        console.log('getting index in one change check box');
        console.log(index);
        console.log(column);
        const newData = rows.map((row) => {
            console.log('checking row.index');
            console.log(row.index);
            if (row.index === index) {
                const newValue = event.target.checked ? 1 : 0;
                const updatedRow = {
                    ...row,
                    [column]: newValue
                };
                if (updatedRow.add && updatedRow.view && updatedRow.update && updatedRow.delete) {
                    updatedRow.all = 1;
                } else {
                    updatedRow.all = 0;
                }
                return updatedRow;
            }
            return row;
        });
        setSecurityData(() => {
            return { securityOptions: newData };
        });
        console.log('getting new data in handle check box change');
        console.log(newData);
        console.log('geetttttting security');
        console.log(securitydata);
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
            >
                <form onSubmit={userGroupHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                            // position: 'fixed'
                        }}
                    >
                        Update Security
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
                            disableTouchRipple
                            disableElevation
                            style={{ height: '30px' }}
                        >
                            <CancelRoundedIcon disableElevation />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        <Box sx={styles.select}>
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
                        </Box>
                        <TextField
                            id="country-name-input"
                            label="User Group Name"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeuserGroupName}
                            value={userGroupName}
                            InputProps={{
                                style: { color: 'black', fontSize: '10px' }
                            }}
                        />
                        <Box
                            sx={{
                                height: 340,
                                width: '100%',
                                mt: '0.2rem',
                                '& .super-app-theme--header': {
                                    backgroundColor: '#85CDFD'
                                }
                            }}
                        >
                            <DataGrid
                                rows={rows}
                                disableSelectionOnClick
                                rowHeight={22}
                                headerHeight={30}
                                columns={columns}
                                checkboxSelection={false}
                            />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-1.5rem' }}>
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

export default UpdateSecurity;
