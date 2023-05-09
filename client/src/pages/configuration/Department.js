/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert } from '@mui/material';
import Switch from '@mui/material/Switch';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import './configuration.css';
import operationCheck from '../../utils/operationCheck';
import Delete from './delete-form/Delete.js';
import DepartmentDetails from './details-form/DepartmentDetails';
import AddDepartment from './add-form/AddDepartment.js';
import UpdateDepartment from './update-form/UpdateDepartment.js';
import AllowedBox from 'pages/AllowedBox.js';

const Department = () => {
    const [rows, setRows] = useState([]);
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('Department', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_department_id: params.row.department_id,
                    in_department_decs: params.row.department_decs,
                    in_institute_id: params.row.institute_id,
                    in_department_name: String(params.row.department_name),
                    in_center_id: params.row.center_id,
                    in_created_by: params.row.created_by,
                    in_active: params.row.active
                });
            } else {
                setPermission(true);
            }
        };

        return (
            <div>
                <Switch
                    size="small"
                    defaultChecked={params.row.active}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={switchActiveStatus}
                    // sx={{
                    //     '& .MuiSwitch-switchBase': {
                    //         width: '25px',
                    //         height: '16px',
                    //         mr: '5px'
                    //         // padding: '1px'
                    //     },
                    //     '& .MuiSwitch-thumb': {
                    //         width: '12px',
                    //         height: '12px',
                    //         mt: '8px'
                    //     }
                    // }}
                />
            </div>
        );
    };

    const columns = [
        {
            field: 'department_name',
            headerName: 'Department',
            flex: 0.4,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },

        {
            field: 'center_name',
            headerName: 'Center',
            flex: 0.2,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'institute_name',
            headerName: 'Institute',
            flex: 0.2,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'department_decs',
            headerName: 'Description',
            flex: 0.2,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'active',
            headerName: 'Active',
            // flex: 0.1,
            width: 70,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <ToggleComponent params={params} />
        },

        {
            field: 'actions',
            headerName: 'Actions',
            // flex: 0.12,
            width: 100,

            headerClassName: 'super-app-theme--header',

            renderCell: (params) => {
                return (
                    <>
                        <div style={{ display: 'flex' }}>
                            <IconButton
                                aria-label="visibility"
                                size="small"
                                color="primary"
                                onClick={() => {
                                    if (operationCheck('City', 'view') === 1) {
                                        const data = {
                                            department_name: params.row.department_name,
                                            center_name: params.row.center_name,
                                            institute_name: params.row.institute_name,
                                            department_decs: params.row.department_decs
                                        };
                                        setDepartmentDetail(data);
                                        setDetails(true);
                                    } else {
                                        setPermission(true);
                                    }
                                }}
                            >
                                <VisibilityIcon sx={{ width: '1rem' }} />
                            </IconButton>
                            <IconButton
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => {
                                    if (operationCheck('Department', 'update') === 1) {
                                        const data = {
                                            in_department_id: params.row.department_id,
                                            in_department_decs: params.row.department_decs,
                                            in_institute_id: params.row.institute_id,
                                            in_department_name: String(params.row.department_name),
                                            in_center_id: params.row.center_id,
                                            in_created_by: params.row.created_by,
                                            in_active: params.row.active,
                                            in_center_name: params.row.center_name
                                        };
                                        setUpdateDepartment(data);
                                        setUpdate(true);
                                    } else {
                                        setPermission(true);
                                    }
                                }}
                            >
                                <EditIcon sx={{ width: '1rem' }} />
                            </IconButton>

                            <IconButton
                                aria-label="delete"
                                size="small"
                                color="error"
                                onClick={() => {
                                    if (operationCheck('Department', 'delete') === 1) {
                                        const data = {
                                            in_department_id: params.row.department_id,
                                            in_department_decs: params.row.department_decs,
                                            in_institute_id: params.row.institute_id,
                                            in_department_name: String(params.row.department_name),
                                            in_center_id: params.row.center_id,
                                            in_created_by: params.row.created_by
                                        };
                                        setDeleteDepartment(data);
                                        setRemove(true);
                                    } else {
                                        setPermission(true);
                                    }
                                }}
                            >
                                <DeleteIcon sx={{ width: '1rem' }} />
                            </IconButton>
                        </div>
                    </>
                );
            }
        }
    ];

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');
    const [permission, setPermission] = useState(false);

    const [searchKey, setSearchKey] = useState(null);

    const [add, setAdd] = useState(false);
    const [newDepartment, setNewDepartment] = useState('');

    const [remove, setRemove] = useState(false);
    const [deleteDepartment, setDeleteDepartment] = useState();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [update, setUpdate] = useState(false);
    const [updateDepartment, setUpdateDepartment] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [departmentDetail, setDepartmentDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // DEPARTMENT-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.departmentGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data

                let row = [];

                for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
                    const n = {
                        id: data.centerDepartment[i].department_id,
                        institute_name: data.centerDepartment[i].institute_name,
                        center_name: data.centerDepartment[i].center_name,
                        department_name: data.centerDepartment[i].department_name,
                        department_decs: data.centerDepartment[i].department_decs,
                        active: data.centerDepartment[i].active,
                        created_by: data.centerDepartment[i].created_by,
                        center_id: data.centerDepartment[i].center_id,
                        institute_id: data.centerDepartment[i].institute_id,
                        department_id: data.centerDepartment[i].department_id
                    };
                    row.push(n);
                }
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialRender.current[0] === 0) fetchList();
    }, []);

    //COUNTRY-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(newDepartment);
                await api.departmentCreate({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.departmentGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    let row = [];

                    for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
                        const n = {
                            id: data.centerDepartment[i].department_id,
                            institute_name: data.centerDepartment[i].institute_name,
                            center_name: data.centerDepartment[i].center_name,
                            department_name: data.centerDepartment[i].department_name,
                            department_decs: data.centerDepartment[i].department_decs,
                            active: data.centerDepartment[i].active,
                            created_by: data.centerDepartment[i].created_by,
                            center_id: data.centerDepartment[i].center_id,
                            institute_id: data.centerDepartment[i].institute_id,
                            department_id: data.centerDepartment[i].department_id
                        };
                        row.push(n);
                    }

                    setRows(row);
                    setAdd(false);
                    setError('');
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);
                    // setError('Country already exists.');
                    setAdd(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data);
                setError(data.message);
                setAdd(true);
            }
        };

        if (initialRender.current[0] === 0) {
            initialRender.current[0] = 1;
        } else if (initialRender.current[0] === 1) {
            // initialRender.current[0] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [newDepartment]);

    //DEPARTMENT-SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.departmentGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data

                let row = [];

                for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
                    if (data.centerDepartment[i].department_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            id: data.centerDepartment[i].department_id,
                            institute_name: data.centerDepartment[i].institute_name,
                            center_name: data.centerDepartment[i].center_name,
                            department_name: data.centerDepartment[i].department_name,
                            department_decs: data.centerDepartment[i].department_decs,
                            active: data.centerDepartment[i].active,
                            created_by: data.centerDepartment[i].created_by,
                            center_id: data.centerDepartment[i].center_id,
                            institute_id: data.centerDepartment[i].institute_id,
                            department_id: data.centerDepartment[i].department_id
                        };
                        row.push(n);
                    }
                }
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialRender.current[1] === 0) {
            initialRender.current[1] = 1;
        } else if (initialRender.current[1] === 1) {
            // initialRender.current[1] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [searchKey]);

    // COUNTRY-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(updateDepartment);
                const decryptedData = crypt.encryptData(updateDepartment);
                await api.departmentUpdate({ data: decryptedData });
                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.departmentGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
                        const n = {
                            id: data.centerDepartment[i].department_id,
                            institute_name: data.centerDepartment[i].institute_name,
                            center_name: data.centerDepartment[i].center_name,
                            department_name: data.centerDepartment[i].department_name,
                            department_decs: data.centerDepartment[i].department_decs,
                            active: data.centerDepartment[i].active,
                            created_by: data.centerDepartment[i].created_by,
                            center_id: data.centerDepartment[i].center_id,
                            institute_id: data.centerDepartment[i].institute_id,
                            department_id: data.centerDepartment[i].department_id
                        };
                        row.push(n);
                    }
                    setRows(row);
                    setError('');
                    setUpdate(false);
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);
                    // setError('Country already exists.');
                    setUpdate(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data);
                setError(data.message);
                setUpdate(true);
            }
        };
        if (initialRender.current[2] === 0) {
            initialRender.current[2] = 1;
        } else if (initialRender.current[2] === 1) {
            // initialRender.current[2] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [updateConfirmation]);

    // COUNTRY-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(toggleUpdate);
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.departmentUpdate({ data: decryptedData });
                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.departmentGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    let row = [];

                    for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
                        const n = {
                            id: data.centerDepartment[i].department_id,
                            institute_name: data.centerDepartment[i].institute_name,
                            center_name: data.centerDepartment[i].center_name,
                            department_name: data.centerDepartment[i].department_name,
                            department_decs: data.centerDepartment[i].department_decs,
                            active: data.centerDepartment[i].active,
                            created_by: data.centerDepartment[i].created_by,
                            center_id: data.centerDepartment[i].center_id,
                            institute_id: data.centerDepartment[i].institute_id,
                            department_id: data.centerDepartment[i].department_id
                        };
                        row.push(n);
                    }
                    setRows(row);
                    setError('');
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);
                    // setError('Country already exists.');
                    // setUpdate(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);
                // setError('Country already exists.');
                // setUpdate(true);
            }
        };

        if (initialRender.current[4] === 0) {
            initialRender.current[4] = 1;
        } else if (initialRender.current[4] === 1) {
            // initialRender.current[4] = 2;
            fetchList();
        } else {
            console.log('inside useeffect');
            // fetchList();
        }
    }, [toggleUpdate]);

    // COUNTRY-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(deleteDepartment);
                const decryptedData = crypt.encryptData(deleteDepartment);
                await api.departmentDelete({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.departmentGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
                        const n = {
                            id: data.centerDepartment[i].department_id,
                            institute_name: data.centerDepartment[i].institute_name,
                            center_name: data.centerDepartment[i].center_name,
                            department_name: data.centerDepartment[i].department_name,
                            department_decs: data.centerDepartment[i].department_decs,
                            active: data.centerDepartment[i].active,
                            created_by: data.centerDepartment[i].created_by,
                            center_id: data.centerDepartment[i].center_id,
                            institute_id: data.centerDepartment[i].institute_id,
                            department_id: data.centerDepartment[i].department_id
                        };
                        row.push(n);
                    }
                    setRows(row);
                    setError('');
                    setRemove(false);
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);
                    setRemove(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data);
                setError(data.message);
                setRemove(true);
            }
        };
        if (initialRender.current[3] === 0) {
            initialRender.current[3] = 1;
        } else if (initialRender.current[3] === 1) {
            // initialRender.current[3] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [deleteConfirmation]);

    useEffect(() => {
        if (showSuccess === true) {
            setSuccess('Done Successfully');
            setTimeout(() => {
                setShowSuccess(false);
                setSuccess('');
            }, 2000);
        }
    }, [showSuccess]);

    const addDepartmentHandler = (name) => {
        setNewDepartment(name);
    };

    const searchDepartment = (event) => {
        setSearchKey(event.target.value);
    };

    const updateDepartmentHandler = (data) => {
        setUpdateDepartment((state) => {
            return {
                ...state,
                in_department_name: data.in_department_name,
                in_department_decs: data.in_department_decs,
                in_center_id: data.in_center_id,
                in_active: data.in_active,
                in_created_by: data.in_created_by
            };
        });
        setUpdateConfirmation((state) => !state);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchDepartment} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('Department', 'add') === 1) {
                                    setAdd(true);
                                } else {
                                    setPermission(true);
                                }
                            }}
                        >
                            Add
                        </Button>
                    </div>

                    <Box
                        sx={{
                            height: 465,
                            width: '100%',
                            mt: '0.2rem',
                            '& .super-app-theme--header': {
                                backgroundColor: '#85CDFD'
                            }
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            editMode="row"
                            columns={columns}
                            rowHeight={20}
                            headerHeight={30}
                            components={{
                                NoRowsOverlay: () => (
                                    // <Stack height="100%" alignItems="center" justifyContent="center">
                                    <Box
                                        sx={{
                                            position: 'fixed',
                                            left: 0,
                                            bottom: 0,
                                            width: '30%',
                                            zIndex: 2222
                                        }}
                                    >
                                        <Alert
                                            severity="error"
                                            sx={{
                                                backgroundColor: 'lightred',
                                                color: 'red'
                                            }}
                                        >
                                            No Department Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            // getRowId={(row) => row.department_id}
                        />
                    </Box>

                    {add && <AddDepartment addDepartmentHandler={addDepartmentHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}

                    {update && (
                        <UpdateDepartment
                            updateDepartmentHandler={updateDepartmentHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateDepartment={updateDepartment}
                        />
                    )}
                    {details && <DepartmentDetails setDetails={setDetails} departmentDetail={departmentDetail} />}

                    {permission && <AllowedBox setPermission={setPermission} />}

                    {showSuccess && (
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '30%',
                                zIndex: 2222
                            }}
                        >
                            <Alert
                                severity="success"
                                sx={{
                                    color: 'darkgreen'
                                }}
                                onClose={() => {
                                    // setError('');
                                    setSuccess('');
                                    setShowSuccess(false);
                                }}
                            >
                                {success}
                            </Alert>
                        </Box>
                    )}
                </div>
            )}
        </>
    );
};

export default Department;
