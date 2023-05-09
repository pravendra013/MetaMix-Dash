/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import '../configuration/configuration.css';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
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
        height: 'auto'
        // marginTop: '0.5rem'
    }
};

if (sessionStorage.getItem('user')) {
    // var { user_info, security_option } = JSON.parse(sessionStorage.getItem('user'));
    var { user_info, security_option } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
}
// const { user_info } = JSON.parse(sessionStorage.getItem('user'));

const AddSecurity = ({ addSecurityHandler, setAdd, error, setError }) => {
    const [fixedCenter, setFixedCenter] = useState(true);
    const [list, setList] = useState({ center: [] });
    const [userGroupName, setUserGroupName] = useState('');
    const [center, setCenter] = useState(user_info.out_center_id);
    const [centerName, setCenterName] = useState(user_info.out_center_name);

    console.log('security lenght');
    console.log(Object.values(security_option).length);
    console.log(security_option[0].user_group_id);

    const [securitydata, setSecurityData] = useState({ securityOptions: [] });
    const [fixedSecurityData, setFixedSecurityData] = useState({ fixedSecurityOptions: [] });
    console.log('very close');
    console.log(securitydata);

    const rows = securitydata.securityOptions.map((row, index) => ({
        id: row.id,
        security_option_id: row.security_option_id,
        security_option_name: row.security_option_name,
        all: row.all,
        add: row.add,
        view: row.view,
        update: row.update,
        delete: row.delete,
        index: index + 1
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

                const { data: decryptedSecurityData } = await api.securityOptionList();
                const dataSecurity = crypt.decryptData(decryptedSecurityData);
                const securityOptions = [];
                const fixedSecurityOptions = [];
                for (let i = 0; i < Object.values(dataSecurity.securityOptionList).length; i++) {
                    securityOptions.push({
                        id: dataSecurity.securityOptionList[i].security_option_id,
                        security_option_id: dataSecurity.securityOptionList[i].security_option_id,
                        security_option_name: dataSecurity.securityOptionList[i].security_option_name,
                        view: 0,
                        add: 0,
                        update: 0,
                        delete: 0,
                        all: 0
                    });
                    fixedSecurityOptions.push({
                        id: dataSecurity.securityOptionList[i].security_option_id,
                        security_option_id: dataSecurity.securityOptionList[i].security_option_id,
                        security_option_name: dataSecurity.securityOptionList[i].security_option_name,
                        view: 0,
                        add: 0,
                        update: 0,
                        delete: 0,
                        all: 0
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
    }, [center]);

    console.log('beside');
    console.log(securitydata);

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

    const securityHandler = (event) => {
        event.preventDefault();
        const data = {
            in_user_group_name: userGroupName,
            in_center_id: center,
            in_institute_id: user_info.out_institute_id,
            in_created_by: user_info.out_userid,
            securityOptions: securitydata
        };
        console.log('form submit');
        console.log(data);
        addSecurityHandler(data);
    };

    const handleReset = () => {
        setUserGroupName('');
        const temp = fixedSecurityData.fixedSecurityOptions;
        console.log(temp.length);
        const newFixedSecurityOptions = [];
        for (let i = 0; i < temp.length; i++) {
            newFixedSecurityOptions.push({
                id: temp[i].security_option_id,
                security_option_id: temp[i].security_option_id,
                security_option_name: temp[i].security_option_name,
                view: 0,
                add: 0,
                update: 0,
                delete: 0,
                all: 0
            });
        }
        setSecurityData(() => {
            return { securityOptions: newFixedSecurityOptions };
        });
    };

    const selectCenterHandler = (event) => {
        console.log('select center handler');
        for (let i = 0; i < Object.values(list.center).length; i++) {
            if (list.center[i].name === event.target.value) {
                console.log('inside select center if');
                setCenterName(list.center[i].name);
                setCenter(list.center[i].id);
                break;
            }
        }
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
        console.log('getting new data in handle check all change');
        console.log(newData);
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

    return (
        <>
            <Dialog
                open={open}
                maxWidth="sm"
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
                <form onSubmit={securityHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Security
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
                        <Box sx={styles.select}>
                            <FormControl fullWidth style={{ marginBottom: '0.5rem' }}>
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
                            style={{ marginTop: '0.5rem' }}
                            onChange={storeuserGroupName}
                            value={userGroupName}
                            InputProps={{
                                style: { fontSize: '10px' }
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
                        // sx={{ bgColor: 'darkgrey', color: 'red' }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default AddSecurity;
