/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert } from '@mui/material';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
// import TableForm from './add-form/AddCountry.js';
// import DeleteCountry from './delete-form/DeleteCountry.js';
// import UpdateCountry from './update-form/UpdateCountry.js';
// import AllowedBox from 'pages/AllowedBox.js';
// import CountryDetails from './details-form/CountryDetails.js';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
// import './configuration.css';
import operationCheck from '../../utils/operationCheck';
import UpdatePatientDepartment from './update-form/UpdatePatientDepartment.js';
import PatientDepartmentAdd from './add-form/PatientDepartmentAdd.js';
import PatientDepartmentDetail from './detail-form/PatientDepartmentDetail.js';
// import { minHeight } from '../../../../../../AppData/Local/Microsoft/TypeScript/4.9/node_modules/@mui/system/index.js';
import '../configuration/configuration.css';

const PatientDepartment = ({ patientDetail }) => {
    const [rows, setRows] = useState([]);
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const columns = [
        {
            field: 'department_name',
            headerName: 'Department',
            flex: 0.25,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'center_name',
            headerName: 'Center',
            flex: 0.25,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'user_name',
            headerName: 'Doctor',
            flex: 0.25,
            headerClassName: 'super-app-theme--header'
            // renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'patient_name',
            headerName: 'Patient',
            flex: 0.25,
            headerClassName: 'super-app-theme--header'
            // renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.18,

            headerClassName: 'super-app-theme--header',

            renderCell: (params) => {
                return (
                    <>
                        <div style={{ display: 'flex' }}>
                            <IconButton
                                aria-label="visibility"
                                size="small"
                                // disabled
                                color="primary"
                                onClick={() => {
                                    console.log(params.row);
                                    setDepartmentDetail(params.row);
                                    setDetails(true);
                                }}
                            >
                                <VisibilityIcon sx={{ width: '1rem' }} />
                            </IconButton>
                            <IconButton
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => {
                                    if (operationCheck('Country', 'update') === 1) {
                                        const data = {
                                            in_patient_department_id: params.row.patient_department_id,

                                            in_department_name: params.row.department_name,
                                            in_department_id: params.row.department_id,

                                            in_patient_id: params.row.patient_id,
                                            in_patient_name: params.row.patient_name,

                                            in_user_id: params.row.user_id,
                                            in_user_name: params.row.user_name
                                        };
                                        setUpdateDetail(data);
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

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');
    const [permission, setPermission] = useState(false);

    const [searchKey, setSearchKey] = useState(null);

    const [add, setAdd] = useState(false);
    const [newDepartment, setNewDepartment] = useState('');

    const [update, setUpdate] = useState(false);
    const [updateDetail, setUpdateDetail] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [departmentDetail, setDepartmentDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0]);

    // Department-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = {
                    in_patient_id: patientDetail.in_patient_id
                    // in_department_id: patientDetail.in_department_id
                };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.patientDepartmentGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.patientDepartmentMapping).length; i++) {
                    // if (data.patientDepartmentMapping[i].department_name.toLowerCase().includes(searchKey.toLowerCase())) {
                    const n = {
                        id: data.patientDepartmentMapping[i].patient_department_id,
                        patient_department_id: data.patientDepartmentMapping[i].patient_department_id,

                        department_name: data.patientDepartmentMapping[i].department_name,
                        department_id: data.patientDepartmentMapping[i].department_id,
                        center_name: data.patientDepartmentMapping[i].center_name,
                        center_id: data.patientDepartmentMapping[i].center_id,

                        patient_id: data.patientDepartmentMapping[i].patient_id,
                        patient_name: data.patientDepartmentMapping[i].patient_name,

                        user_id: data.patientDepartmentMapping[i].user_id,
                        user_name: data.patientDepartmentMapping[i].user_name,

                        active: data.patientDepartmentMapping[i].active
                    };
                    row.push(n);
                    // }
                }
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, []);

    //COUNTRY-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(newDepartment);

                const decryptedData = crypt.encryptData(newDepartment);
                await api.patientDepartmentCreate({ data: decryptedData });

                try {
                    const institute = {
                        in_patient_id: patientDetail.in_patient_id
                        // in_department_id: patientDetail.in_department_id
                    };
                    console.log(institute);
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.patientDepartmentGet({ data: encryptedData });
                    console.log(decryptedData);
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.patientDepartmentMapping).length; i++) {
                        // if (data.patientDepartmentMapping[i].department_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            id: data.patientDepartmentMapping[i].patient_department_id,
                            patient_department_id: data.patientDepartmentMapping[i].patient_department_id,

                            department_name: data.patientDepartmentMapping[i].department_name,
                            department_id: data.patientDepartmentMapping[i].department_id,
                            // center_name: user_info.out_center_name,
                            center_name: data.patientDepartmentMapping[i].center_name,
                            center_id: data.patientDepartmentMapping[i].center_id,

                            patient_id: data.patientDepartmentMapping[i].patient_id,
                            patient_name: data.patientDepartmentMapping[i].patient_name,

                            user_id: data.patientDepartmentMapping[i].user_id,
                            user_name: data.patientDepartmentMapping[i].user_name,

                            active: data.patientDepartmentMapping[i].active
                        };
                        row.push(n);
                        // }
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
                setError(data.message);
                // setError('Country already exists.');
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

    //COUNTRY-GET/SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = {
                    in_patient_id: patientDetail.in_patient_id
                    // in_department_id: patientDetail.in_department_id
                    // in_user_id: user_info.out_userid
                };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.patientDepartmentGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.patientDepartmentMapping).length; i++) {
                    if (data.patientDepartmentMapping[i].department_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            id: data.patientDepartmentMapping[i].patient_department_id,
                            patient_department_id: data.patientDepartmentMapping[i].patient_department_id,

                            department_name: data.patientDepartmentMapping[i].department_name,
                            department_id: data.patientDepartmentMapping[i].department_id,
                            center_name: data.patientDepartmentMapping[i].center_name,
                            center_id: data.patientDepartmentMapping[i].center_id,
                            patient_id: data.patientDepartmentMapping[i].patient_id,
                            patient_name: data.patientDepartmentMapping[i].patient_name,

                            user_id: data.patientDepartmentMapping[i].user_id,
                            user_name: data.patientDepartmentMapping[i].user_name

                            // active: data. patientDepartmentMapping[i].active,
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
                console.log(updateDetail);
                const decryptedData = crypt.encryptData(updateDetail);
                await api.patientDepartmentUpdate({ data: decryptedData });
                try {
                    const institute = {
                        in_patient_id: patientDetail.in_patient_id
                        // in_department_id: patientDetail.in_department_id
                    };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.patientDepartmentGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    let row = [];

                    for (let i = 0; i < Object.values(data.patientDepartmentMapping).length; i++) {
                        const n = {
                            id: data.patientDepartmentMapping[i].patient_department_id,
                            patient_department_id: data.patientDepartmentMapping[i].patient_department_id,

                            department_name: data.patientDepartmentMapping[i].department_name,
                            department_id: data.patientDepartmentMapping[i].department_id,
                            center_name: data.patientDepartmentMapping[i].center_name,
                            center_id: data.patientDepartmentMapping[i].center_id,
                            patient_id: data.patientDepartmentMapping[i].patient_id,
                            patient_name: data.patientDepartmentMapping[i].patient_name,

                            user_id: data.patientDepartmentMapping[i].user_id,
                            user_name: data.patientDepartmentMapping[i].user_name

                            // active: data. patientDepartmentMapping[i].active,
                        };
                        row.push(n);
                        setRows(row);
                        setError('');
                        setUpdate(false);
                        setShowSuccess(true);
                    }
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
            // initialRender.current[2] = 2;
            fetchList();
        } else {
            console.log('calling update api function');
            // fetchList();
        }
    }, [updateConfirmation]);

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
        // const data = { in_patient_id: patientDetail.in_patient_id, in_user_id: user_info.out_userid, in_department_id: name };
        const data = { in_patient_id: patientDetail.in_patient_id, in_user_id: 5, in_department_id: name };

        console.log(data);
        setNewDepartment(data);
    };

    const searchCountry = (event) => {
        setSearchKey(event.target.value);
    };

    const updateDetailHandler = (data) => {
        console.log('inside here');
        setUpdateDetail((state) => {
            return { ...state, in_department_id: data.in_department_id };
        });
        setUpdateConfirmation((state) => !state);
    };

    return (
        <>
            {loader && (
                <div>
                    <h2 style={{ alignItems: 'center' }}>Department</h2>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem', height: 'auto' }}>
                        <Search searchChange={searchCountry} />

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
                            height: rows.length > 0 ? (rows.length * 20 + 45 <= 465 ? rows.length * 20 + 45 : 465) : 100,
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
                            // autoHeight={true}
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
                            // sx={(minHeight = '10%')}
                            // getRowHeight={() => 'auto'}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                        />
                    </Box>

                    {add && (
                        <PatientDepartmentAdd
                            addDepartmentHandler={addDepartmentHandler}
                            setAdd={setAdd}
                            error={error}
                            setError={setError}
                        />
                    )}

                    {/* {remove && (
                        <DeleteCountry
                            setDeleteConfirmation={setDeleteConfirmation}
                            error={error}
                            setError={setError}
                            setRemove={setRemove}
                        />
                    )} */}

                    {update && (
                        <UpdatePatientDepartment
                            updateDetailHandler={updateDetailHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateDetail={updateDetail}
                            setUpdateDetail={setUpdateDetail}
                        />
                    )}
                    {details && <PatientDepartmentDetail setDetails={setDetails} department={departmentDetail} />}
                    {/* {permission && <AllowedBox setPermission={setPermission} />} */}

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

export default PatientDepartment;
