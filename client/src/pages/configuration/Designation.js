/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';
import Switch from '@mui/material/Switch';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddDesignation from './add-form/AddDesignation.js';
import DesignationDetails from './details-form/DesignationDetails.js';
import UpdateDesignation from './update-form/UpdateDesignation.js';
import AllowedBox from 'pages/AllowedBox.js';
import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import './configuration.css';
import operationCheck from '../../utils/operationCheck';
import Delete from './delete-form/Delete.js';

// if (sessionStorage.getItem('user')) {
//     // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
//     var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
// }
// const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

const Designation = () => {
    const [rows, setRows] = useState([]);
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('User Type', 'update')) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_user_type: params.row.user_type,
                    in_user_type_name: params.row.user_type_name,
                    in_institute_id: params.row.institute_id,
                    in_center_id: params.row.center_id,
                    in_created_by: user_info.out_userid,
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
            field: 'user_type_name',
            headerName: 'Designation',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'center_name',
            headerName: 'Center Name',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'institute_name',
            headerName: 'Institute Name',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'toggle_btn',
            headerName: 'Active',
            // flex: 0.3,
            width: 70,
            headerClassName: 'super-app-theme--header',

            renderCell: (params) => <ToggleComponent params={params} />
        },

        {
            field: 'actions',
            headerName: 'Actions',
            // flex: 0.4,
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
                                    if (operationCheck('User Type', 'view') === 1) {
                                        const data = {
                                            user_type_name: params.row.user_type_name,
                                            center_name: params.row.center_name,
                                            institute_name: params.row.institute_name
                                        };
                                        setDesignationDetail(data);
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
                                    // if (true) {
                                    if (operationCheck('User Type', 'update') === 1) {
                                        const data = {
                                            in_institute_id: params.row.institute_id,
                                            in_institute_name: params.row.institute_name,
                                            in_center_id: params.row.center_id,
                                            in_center_name: params.row.center_name,
                                            in_user_type: params.row.user_type,
                                            in_user_type_name: params.row.user_type_name,
                                            in_created_by: user_info.out_userid,
                                            in_active: params.row.active
                                        };
                                        setUpdateDesignation(data);
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
                                    // if (true) {
                                    if (operationCheck('User Type', 'delete') === 1) {
                                        const data = {
                                            in_institute_id: params.row.institute_id,
                                            in_institute_name: params.row.institute_name,
                                            in_center_id: params.row.center_id,
                                            in_center_name: params.row.center_name,
                                            in_user_type: params.row.user_type,
                                            in_user_type_name: params.row.user_type_name,
                                            in_created_by: user_info.out_userid
                                        };
                                        console.log(data);
                                        setDeleteDesignation(data);
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

    const [searchKey, setSearchKey] = useState();

    const [add, setAdd] = useState(false);
    const [newDesignation, setNewDesignation] = useState('');

    const [remove, setRemove] = useState(false);
    const [deleteDesignation, setDeleteDesignation] = useState();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [update, setUpdate] = useState(false);
    const [updateDesignation, setUpdateDesignation] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [designationDetail, setDesignationDetail] = useState('');
    const [details, setDetails] = useState(false);

    // const [centerId, setCenterId] = useState(user_info.out_center_id);

    // const stopRender = useRef(false);
    // if (user_info.out_center_id === null && !stopRender.current) {
    //     stopRender.current = true;
    //     setCenterId(null);
    // }

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // DESIGNATION-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                // const institute = { in_institute_id: user_info.out_institute_id, in_center_id: centerId };
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                // const institute = { in_institute_id: 1 };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.userTypeGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);

                let row = [];
                let count = 0;
                for (let i = 0; i < Object.values(data.userType).length; i++) {
                    const n = {
                        institute_id: data.userType[i].institute_id,
                        institute_name: data.userType[i].institute_name,
                        center_id: data.userType[i].center_id,
                        center_name: data.userType[i].center_name,
                        user_type: data.userType[i].user_type,
                        user_type_name: data.userType[i].user_type_name,
                        active: data.userType[i].active,

                        // id: data.userType[i].user_type
                        id: count++
                    };
                    row.push(n);
                }
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };

        console.log(user_info.out_institute_id);
        console.log(user_info.out_center_id);
        fetchList();
    }, []);

    //COUNTRY-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(newDesignation);

                const decryptedData = crypt.encryptData(newDesignation);
                await api.userTypeCreate({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    // const institute = { in_institute_id: 1 };
                    // const institute = { in_institute_id: user_info.out_institute_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userTypeGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data

                    let row = [];
                    let count = 0;
                    for (let i = 0; i < Object.values(data.userType).length; i++) {
                        const n = {
                            institute_id: data.userType[i].institute_id,
                            institute_name: data.userType[i].institute_name,
                            center_id: data.userType[i].center_id,
                            center_name: data.userType[i].center_name,
                            user_type: data.userType[i].user_type,
                            user_type_name: data.userType[i].user_type_name,
                            active: data.userType[i].active,

                            // id: data.userType[i].user_type
                            id: count++
                        };
                        row.push(n);
                    }
                    console.log(row);
                    setRows(row);
                    setAdd(false);
                    setError('');
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);

                    setAdd(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);

                setAdd(true);
            }
        };

        if (initialRender.current[0] === 0) {
            initialRender.current[0] = 1;
        } else if (initialRender.current[0] === 1) {
            initialRender.current[0] = 2;
            fetchList();
        } else {
            fetchList();
        }
    }, [newDesignation]);

    //DESIGNATION-SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.userTypeGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                let row = [];
                let count = 0;
                for (let i = 0; i < Object.values(data.userType).length; i++) {
                    if (data.userType[i].user_type_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            institute_id: data.userType[i].institute_id,
                            institute_name: data.userType[i].institute_name,
                            center_id: data.userType[i].center_id,
                            center_name: data.userType[i].center_name,
                            user_type: data.userType[i].user_type,
                            user_type_name: data.userType[i].user_type_name,
                            active: data.userType[i].active,

                            // id: data.userType[i].user_type
                            id: count++
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
            initialRender.current[1] = 2;
            fetchList();
        } else {
            fetchList();
        }
    }, [searchKey]);

    // COUNTRY-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(updateDesignation);
                await api.userTypeUpdate({ data: decryptedData });
                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userTypeGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    let row = [];
                    let count = 0;
                    for (let i = 0; i < Object.values(data.userType).length; i++) {
                        const n = {
                            institute_id: data.userType[i].institute_id,
                            institute_name: data.userType[i].institute_name,
                            center_id: data.userType[i].center_id,
                            center_name: data.userType[i].center_name,
                            user_type: data.userType[i].user_type,
                            user_type_name: data.userType[i].user_type_name,
                            active: data.userType[i].active,

                            // id: data.userType[i].user_type
                            id: count++
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

                    setUpdate(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);

                setUpdate(true);
            }
        };
        if (initialRender.current[2] === 0) {
            initialRender.current[2] = 1;
        } else if (initialRender.current[2] === 1) {
            initialRender.current[2] = 2;
            fetchList();
        } else {
            fetchList();
        }
    }, [updateConfirmation]);

    // // COUNTRY-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.userTypeUpdate({ data: decryptedData });
                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userTypeGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    let row = [];

                    for (let i = 0; i < Object.values(data.userType).length; i++) {
                        const n = {
                            institute_id: data.userType[i].institute_id,
                            institute_name: data.userType[i].institute_name,
                            center_id: data.userType[i].center_id,
                            center_name: data.userType[i].center_name,
                            user_type: data.userType[i].user_type,
                            user_type_name: data.userType[i].user_type_name,
                            active: data.userType[i].active,

                            id: data.userType[i].user_type
                            // id: count++
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

                    // setUpdate(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);

                // setUpdate(true);
            }
        };

        if (initialRender.current[4] === 0) {
            initialRender.current[4] = 1;
        } else if (initialRender.current[4] === 1) {
            initialRender.current[4] = 2;
            fetchList();
        } else {
            console.log('inside useeffect');
            fetchList();
        }
    }, [toggleUpdate]);

    // COUNTRY-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(deleteDesignation);
                const decryptedData = crypt.encryptData(deleteDesignation);
                await api.userTypeDelete({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userTypeGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.userType).length; i++) {
                        const n = {
                            institute_id: data.userType[i].institute_id,
                            institute_name: data.userType[i].institute_name,
                            center_id: data.userType[i].center_id,
                            center_name: data.userType[i].center_name,
                            user_type: data.userType[i].user_type,
                            user_type_name: data.userType[i].user_type_name,
                            active: data.userType[i].active,

                            id: data.userType[i].user_type
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
                setError(data.message);
                setRemove(true);
            }
        };
        if (initialRender.current[3] === 0) {
            initialRender.current[3] = 1;
        } else if (initialRender.current[3] === 1) {
            initialRender.current[3] = 2;
            fetchList();
        } else {
            fetchList();
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

    const addDesignationHandler = (name) => {
        setNewDesignation(name);
    };

    const searchDesignation = (event) => {
        setSearchKey(event.target.value);
    };

    const updateDesignationHandler = (data) => {
        setUpdateDesignation((state) => {
            return { ...state, in_user_type_name: data.in_user_type_name, in_center_id: data.in_center_id, in_active: data.in_active };
        });
        setUpdateConfirmation((state) => !state);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchDesignation} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                // if (true) {
                                if (operationCheck('User Type', 'add') === 1) {
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
                                            No Designation Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            // getRowId={(row) => row.department_id}
                        />
                    </Box>

                    {add && (
                        <AddDesignation addDesignationHandler={addDesignationHandler} setAdd={setAdd} error={error} setError={setError} />
                    )}

                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}

                    {update && (
                        <UpdateDesignation
                            updateDesignationHandler={updateDesignationHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateDesignation={updateDesignation}
                        />
                    )}
                    {details && <DesignationDetails setDetails={setDetails} designationDetail={designationDetail} />}
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

export default Designation;
