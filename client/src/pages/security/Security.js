/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert } from '@mui/material';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import AddSecurity from './SecurityForm';
import UpdateSecurity from './UpdateSecurity';
import AllowedBox from 'pages/AllowedBox.js';
import SecurityDetails from './SecurityDetails';
import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
// import './configuration.css';
import '../configuration/configuration.css';
import operationCheck from '../../utils/operationCheck';

// if (sessionStorage.getItem('user')) {
//     // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
//     var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
// }
// const { user_info } = JSON.parse(sessionStorage.getItem('user'));

const Security = () => {
    const [rows, setRows] = useState([]);
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const columns = [
        {
            field: 'user_group_name',
            headerName: 'User Group Name',
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
            field: 'actions',
            headerName: 'Actions',
            flex: 0.2,
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
                                    if (operationCheck('User Group', 'view') === 1) {
                                        const data = {
                                            user_group_name: params.row.user_group_name,
                                            center_name: params.row.center_name,
                                            user_group_id: params.row.user_group_id
                                        };
                                        console.log(data);
                                        setSecurityDetail(data);
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
                                color="primary"
                                size="small"
                                onClick={() => {
                                    if (operationCheck('User Group', 'update') === 1) {
                                        const data = {
                                            in_user_group_id: params.row.user_group_id,
                                            in_institute_id: params.row.institute_id,
                                            in_center_id: params.row.center_id,
                                            in_center_name: params.row.center_name,
                                            in_user_group_name: params.row.user_group_name
                                        };
                                        setUpdateSecurity(data);
                                        setUpdate(true);
                                    } else {
                                        setPermission(true);
                                    }
                                }}
                            >
                                <EditIcon sx={{ width: '1rem' }} />
                            </IconButton>
                        </div>
                    </>
                );
            }
        }
    ];

    // const [loader, setLoader] = useState(true);
    const loader = true;
    const [error, setError] = useState('');
    const [permission, setPermission] = useState(false);

    const [searchKey, setSearchKey] = useState(null);

    const [add, setAdd] = useState(false);
    const [newSecurity, setNewSecurity] = useState('');

    const [update, setUpdate] = useState(false);
    const [updateSecurity, setUpdateSecurity] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [securityDetail, setSecurityDetail] = useState('');
    const [details, setDetails] = useState(false);

    // const [centerId, setCenterId] = useState(user_info.out_center_id);

    // const stopRender = useRef(false);
    // if (user_info.out_center_id === null && !stopRender.current) {
    //     stopRender.current = true;
    //     setCenterId(null);
    // }

    const initialRender = useRef([0, 0, 0, 0]);

    // SECURITY-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                // const institute = { in_institute_id: user_info.out_institute_id, in_center_id: centerId };
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.userGroupGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                let row = [];

                for (let i = 0; i < Object.values(data.userGroup).length; i++) {
                    const n = {
                        user_group_id: data.userGroup[i].user_group_id,
                        center_id: data.userGroup[i].center_id,
                        center_name: data.userGroup[i].center_name,
                        institute_name: data.userGroup[i].institute_name,
                        institute_id: data.userGroup[i].institute_id,
                        user_group_name: data.userGroup[i].user_group_name,
                        id: data.userGroup[i].user_group_id
                    };
                    row.push(n);
                }
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, []);

    //SECURITY-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(newSecurity);
                await api.userGroupCreate({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userGroupGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    let row = [];

                    for (let i = 0; i < Object.values(data.userGroup).length; i++) {
                        const n = {
                            user_group_id: data.userGroup[i].user_group_id,
                            center_id: data.userGroup[i].center_id,
                            center_name: data.userGroup[i].center_name,
                            institute_name: data.userGroup[i].institute_name,
                            institute_id: data.userGroup[i].institute_id,
                            user_group_name: data.userGroup[i].user_group_name,
                            id: data.userGroup[i].user_group_id
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
            // initialRender.current[0] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [newSecurity]);

    // SECURITY-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(updateSecurity);
                await api.userGroupUpdate({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userGroupGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.userGroup).length; i++) {
                        const n = {
                            user_group_id: data.userGroup[i].user_group_id,
                            center_id: data.userGroup[i].center_id,
                            center_name: data.userGroup[i].center_name,
                            institute_name: data.userGroup[i].institute_name,
                            institute_id: data.userGroup[i].institute_id,
                            user_group_name: data.userGroup[i].user_group_name,
                            id: data.userGroup[i].user_group_id
                        };
                        row.push(n);
                    }

                    setRows(row);
                    setUpdate(false);
                    setError('');
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);
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
        // eslint-disable-next-line
    }, [updateConfirmation]);

    //SECURITY-GET/SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.userGroupGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData);
                var row = [];
                for (let i = 0; i < Object.keys(data.userGroup).length; i++) {
                    if (data.userGroup[i].user_group_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            user_group_id: data.userGroup[i].user_group_id,
                            center_id: data.userGroup[i].center_id,
                            center_name: data.userGroup[i].center_name,
                            institute_name: data.userGroup[i].institute_name,
                            institute_id: data.userGroup[i].institute_id,
                            user_group_name: data.userGroup[i].user_group_name,
                            id: data.userGroup[i].user_group_id
                        };
                        row.push(n);
                    }
                }
                setRows(row);
            } catch (error) {}
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

    //Success Message
    useEffect(() => {
        if (showSuccess === true) {
            setSuccess('Done Successfully');
            setTimeout(() => {
                setShowSuccess(false);
                setSuccess('');
            }, 2000);
        }
    }, [showSuccess]);

    const addSecurityHandler = (name) => {
        setNewSecurity(name);
    };

    const updateSecurityHandler = (data) => {
        setUpdateSecurity((security) => {
            return {
                ...security,
                in_user_group_name: data.in_user_group_name,
                in_center_id: data.in_center_id,
                securityOptions: data.securityOptions
            };
        });
        setUpdateConfirmation((security) => !security);
    };

    const searchSecurity = (event) => {
        setSearchKey(event.target.value);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchSecurity} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('User Group', 'add') === 1) {
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
                                            No Security Option Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            disableSelectionOnClick
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            getRowId={(row) => row.id}
                        />
                    </Box>

                    {add && <AddSecurity addSecurityHandler={addSecurityHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {update && (
                        <UpdateSecurity
                            updateSecurityHandler={updateSecurityHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateSecurity={updateSecurity}
                        />
                    )}

                    {details && <SecurityDetails setDetails={setDetails} securityDetail={securityDetail} />}

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

export default Security;
