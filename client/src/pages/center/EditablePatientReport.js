//  eslint-disable
import { useEffect, useRef, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert } from '@mui/material';
import Switch from '@mui/material/Switch';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';

// import * as dotenv from 'dotenv'
// dotenv.config()

// const BASE_URL = process.env.BASE_URL;

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import operationCheck from '../../utils/operationCheck';
import UpdatePatientDepartment from './update-form/UpdatePatientDepartment.js';
import PatientDepartmentAdd from './add-form/PatientDepartmentAdd.js';
import PatientDepartmentDetail from './detail-form/PatientDepartmentDetail.js';
import '../configuration/configuration.css';
import Typography from 'themes/overrides/Typography.js';
import ReportAdd from './add-form/ReportAdd.js';
import { update } from 'lodash';
import View3D from 'pages/3DView';

const EditablePatientReport = ({ updatePatient, patientsDetail }) => {
    const [rows, setRows] = useState([]);
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const [popup, setPopup] = useState(false);
    const [URL, setURL] = useState('');
    const [extension, setExtension] = useState('');

    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            // if (operationCheck('Department', 'delete')) {
            if (operationCheck('Report', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_report_id: params.row.report_id,

                    in_patient_id: params.row.patient_id,
                    in_user_id: params.row.user_id,
                    in_department_id: params.row.department_id,

                    in_department_name: params.row.department_name,
                    in_patient_name: params.row.patient_name,
                    in_user_name: params.row.user_name,

                    in_document_type_id: params.row.document_type_id,
                    in_document_type_name: params.row.document_type_name,

                    in_pacs_path: params.row.pacs_path,
                    in_raw_dim_size: params.row.raw_dim_size,
                    in_element_spacing: params.row.raw_element_spacing,
                    in_report_desc: params.row.report_desc,

                    in_active: params.row.active,
                    in_created_by: params.row.created_by,
                    in_document_type_extension: params.row.document_type_extension
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
                />
            </div>
        );
    };

    const columns = [
        {
            field: 'department_name',
            headerName: 'Department',
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
            field: 'document_type_name',
            headerName: 'Document Type',
            flex: 0.25,
            headerClassName: 'super-app-theme--header'
            // renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'report_desc',
            headerName: 'Description',
            flex: 0.25,
            headerClassName: 'super-app-theme--header'
            // renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'active',
            headerName: 'Active',
            // flex: 0.05,
            width: 70,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <ToggleComponent params={params} />
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
                                onClick={async () => {
                                    console.log(params.row);
                                    const url = `report_id--${params.row.report_id}--newfile${params.row.document_type_extension}`;
                                    if (params.row.document_type_extension == '.zip') {
                                        console.log('inside dicom...', params.row.pacs_path?.instanceUID);
                                        window.open(
                                            `http://${process.env.REACT_APP_DICOM_URL}/viewer/${params.row.pacs_path?.instanceUID}`,
                                            '_blank',
                                            'noreferrer'
                                        );
                                    } else if (
                                        params.row.document_type_extension == '.stl' ||
                                        params.row.document_type_extension == '.obj' ||
                                        params.row.document_type_extension == '.fbx' ||
                                        params.row.document_type_extension == '.mha'
                                    ) {
                                        // localStorage.setItem(
                                        //     'view',
                                        //     JSON.stringify(
                                        //         crypt.encryptData({
                                        //             url: `http://${process.env.REACT_APP_BASE_URL}/ftp/${url}`,
                                        //             extension: params.row.document_type_extension
                                        //         })
                                        //     )
                                        // );
                                        setURL(`http://${process.env.REACT_APP_BASE_URL}/ftp/${url}`);
                                        setExtension(params.row.document_type_extension);
                                        setPopup(true);
                                        // window.open('/3d-view', '_blank', 'noreferrer');
                                        // window.open('/3d-view');
                                    } else {
                                        // window.open(`http://192.168.15.170:9000/ftp/${url}`, '_blank', 'noreferrer');
                                        window.open(`http://${process.env.REACT_APP_BASE_URL}/ftp/${url}`, '_blank', 'noreferrer');
                                    }
                                }}
                            >
                                <VisibilityIcon sx={{ width: '1rem' }} />
                            </IconButton>
                            {/* <IconButton
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => {
                                    if (operationCheck('Country', 'update') !== 1) {
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
                            </IconButton> */}
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

    const [toggleUpdate, setToggleUpdate] = useState();

    const [add, setAdd] = useState(false);
    const [newReport, setNewReport] = useState('');

    // const [update, setUpdate] = useState(false);
    // const [updateDetail, setUpdateDetail] = useState();
    // const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [departmentDetail, setDepartmentDetail] = useState('');

    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0]);

    //PATIENT REPORT
    useEffect(() => {
        const get = async () => {
            try {
                const encryptedData = crypt.encryptData({
                    in_patient_id: updatePatient.in_patient_id
                    // in_department_id: updatePatient.in_department_id
                });

                // const encryptedData = crypt.encryptData({
                //     in_patient_id: 1,
                //     in_department_id: 5
                // });
                const { data: decryptedData } = await api.patientReportsGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.patientReports).length; i++) {
                    const n = {
                        id: data.patientReports[i].report_id,
                        report_id: data.patientReports[i].report_id,

                        patient_id: data.patientReports[i].patient_id,
                        user_id: data.patientReports[i].user_id,
                        department_id: data.patientReports[i].department_id,

                        department_name: data.patientReports[i].department_name,
                        patient_name: data.patientReports[i].patient_name,
                        user_name: data.patientReports[i].user_name,

                        document_type_id: data.patientReports[i].document_type_id,
                        document_type_name: data.patientReports[i].document_type_name,
                        document_type_extension: data.patientReports[i].document_type_extension,

                        pacs_path: data.patientReports[i].pacs_path,
                        raw_dim_size: data.patientReports[i].raw_dim_size,
                        raw_element_spacing: data.patientReports[i].raw_element_spacing,
                        report_desc: data.patientReports[i].report_desc,

                        active: data.patientReports[i].active,
                        created_by: data.patientReports[i].created_by
                    };
                    row.push(n);
                }
                setRows(row);
            } catch (error) {
                console.log(error);
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data);
            }
        };
        if (initialRender.current[0] === 0) {
            get();
            initialRender.current[0] = 1;
        } else if (initialRender.current[0] === 1) {
            initialRender.current[0] = 2;
            console.log('currennt....get .... ', initialRender.current[0]);
            // initialRender.current[0] = 3;
        } else {
            fetchList();
        }
    }, []);

    //COUNTRY-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log('New Report....', newReport);

                // const decryptedData = crypt.encryptData(newReport.name);
                // const decryptedData = crypt.encryptData(newReport.name);
                const content = newReport.text;
                await api.patientReportsCreate(newReport.name, content);

                try {
                    const encryptedData = crypt.encryptData({
                        in_patient_id: patientsDetail.in_patient_id
                        // in_department_id: patientsDetail.in_department_id
                    });

                    // const encryptedData = crypt.encryptData({
                    //     in_patient_id: 1,
                    //     in_department_id: 5
                    // });
                    const { data: decryptedData } = await api.patientReportsGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.patientReports).length; i++) {
                        const n = {
                            id: data.patientReports[i].report_id,
                            report_id: data.patientReports[i].report_id,

                            patient_id: data.patientReports[i].patient_id,
                            user_id: data.patientReports[i].user_id,
                            department_id: data.patientReports[i].department_id,

                            department_name: data.patientReports[i].department_name,
                            patient_name: data.patientReports[i].patient_name,
                            user_name: data.patientReports[i].user_name,

                            document_type_id: data.patientReports[i].document_type_id,
                            document_type_name: data.patientReports[i].document_type_name,
                            document_type_extension: data.patientReports[i].document_type_extension,

                            pacs_path: data.patientReports[i].pacs_path,
                            raw_dim_size: data.patientReports[i].raw_dim_size,
                            raw_element_spacing: data.patientReports[i].raw_element_spacing,
                            report_desc: data.patientReports[i].report_desc,

                            active: data.patientReports[i].active,
                            created_by: data.patientReports[i].created_by
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
                console.log(error);
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data.message);
                setError(data.message);
                // setError('Country already exists.');
                setAdd(true);
            }
        };

        if (initialRender.current[1] === 0) {
            initialRender.current[1] = 1;
        } else if (initialRender.current[1] === 1) {
            initialRender.current[1] = 2;
            // fetchList();
        } else {
            fetchList();
        }
        // if (initialRender.current[0] === 3) fetchList();
    }, [newReport]);

    //Report-GET/SEARCH
    useEffect(() => {
        const get = async () => {
            try {
                const encryptedData = crypt.encryptData({
                    in_patient_id: patientsDetail.in_patient_id
                    // in_department_id: patientsDetail.in_department_id
                });

                // const encryptedData = crypt.encryptData({
                //     in_patient_id: 1,
                //     in_department_id: 5
                // });
                const { data: decryptedData } = await api.patientReportsGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.patientReports).length; i++) {
                    if (data.patientReports[i].department_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            id: data.patientReports[i].report_id,
                            report_id: data.patientReports[i].report_id,

                            patient_id: data.patientReports[i].patient_id,
                            user_id: data.patientReports[i].user_id,
                            department_id: data.patientReports[i].department_id,

                            department_name: data.patientReports[i].department_name,
                            patient_name: data.patientReports[i].patient_name,
                            user_name: data.patientReports[i].user_name,

                            document_type_id: data.patientReports[i].document_type_id,
                            document_type_name: data.patientReports[i].document_type_name,
                            document_type_extension: data.patientReports[i].document_type_extension,

                            pacs_path: data.patientReports[i].pacs_path,
                            raw_dim_size: data.patientReports[i].raw_dim_size,
                            raw_element_spacing: data.patientReports[i].raw_element_spacing,
                            report_desc: data.patientReports[i].report_desc,

                            active: data.patientReports[i].active,
                            created_by: data.patientReports[i].created_by
                        };
                        row.push(n);
                    }
                }
                setRows(row);
            } catch (error) {
                console.log(error);
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data);
            }
        };
        if (initialRender.current[2] === 0) {
            initialRender.current[2] = 1;
        } else if (initialRender.current[2] === 1) {
            initialRender.current[2] = 2;
            // get();
        } else {
            get();
        }
    }, [searchKey]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(toggleUpdate);
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.patientReportsUpdate({ data: decryptedData });
                try {
                    const encryptedData = crypt.encryptData({
                        in_patient_id: patientsDetail.in_patient_id
                        // in_department_id: patientsDetail.in_department_id
                    });

                    // const encryptedData = crypt.encryptData({
                    //     in_patient_id: 1,
                    //     in_department_id: 5
                    // });
                    const { data: decryptedData } = await api.patientReportsGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.patientReports).length; i++) {
                        const n = {
                            id: data.patientReports[i].report_id,
                            report_id: data.patientReports[i].report_id,

                            patient_id: data.patientReports[i].patient_id,
                            user_id: data.patientReports[i].user_id,
                            department_id: data.patientReports[i].department_id,

                            department_name: data.patientReports[i].department_name,
                            patient_name: data.patientReports[i].patient_name,
                            user_name: data.patientReports[i].user_name,

                            document_type_id: data.patientReports[i].document_type_id,
                            document_type_name: data.patientReports[i].document_type_name,
                            document_type_extension: data.patientReports[i].document_type_extension,

                            pacs_path: data.patientReports[i].pacs_path,
                            raw_dim_size: data.patientReports[i].raw_dim_size,
                            raw_element_spacing: data.patientReports[i].raw_element_spacing,
                            report_desc: data.patientReports[i].report_desc,

                            active: data.patientReports[i].active,
                            created_by: data.patientReports[i].created_by
                        };
                        row.push(n);
                    }
                    setRows(row);
                    setError('');
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    console.log(data.message);

                    // setError(data.message);
                    // setError('Country already exists.');
                    // setUpdate(true);
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data.message);
                // setError(data.message);
                // setError('Country already exists.');
                // setUpdate(true);
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
    }, [toggleUpdate]);

    // // COUNTRY-UPDATE
    // useEffect(() => {
    //     const fetchList = async () => {
    //         try {
    //             console.log(updateDetail);
    //             const decryptedData = crypt.encryptData(updateDetail);
    //             await api.patientDepartmentUpdate({ data: decryptedData });
    //             try {
    //                 const institute = {
    //                     in_patient_id: patientDetail.in_patient_id
    //                     // in_department_id: patientDetail.in_department_id
    //                 };
    //                 const encryptedData = crypt.encryptData(institute);
    //                 const { data: decryptedData } = await api.patientDepartmentGet({ data: encryptedData });
    //                 const data = crypt.decryptData(decryptedData); //Decryption of Data
    //                 let row = [];

    //                 for (let i = 0; i < Object.values(data.patientDepartmentMapping).length; i++) {
    //                     const n = {
    //                         id: data.patientDepartmentMapping[i].patient_department_id,
    //                         patient_department_id: data.patientDepartmentMapping[i].patient_department_id,

    //                         department_name: data.patientDepartmentMapping[i].department_name,
    //                         department_id: data.patientDepartmentMapping[i].department_id,

    //                         patient_id: data.patientDepartmentMapping[i].patient_id,
    //                         patient_name: data.patientDepartmentMapping[i].patient_name,

    //                         user_id: data.patientDepartmentMapping[i].user_id,
    //                         user_name: data.patientDepartmentMapping[i].user_name

    //                         // active: data. patientDepartmentMapping[i].active,
    //                     };
    //                     row.push(n);
    //                     setRows(row);
    //                     setError('');
    //                     setUpdate(false);
    //                     setShowSuccess(true);
    //                 }
    //             } catch (error) {
    //                 const decryptedData = error.response.data;
    //                 const data = crypt.decryptData(decryptedData);
    //                 setError(data.message);
    //                 setUpdate(true);
    //             }
    //         } catch (error) {
    //             const decryptedData = error.response.data;
    //             const data = crypt.decryptData(decryptedData);
    //             setError(data.message);
    //             setUpdate(true);
    //         }
    //     };
    //     if (initialRender.current[2] === 0) {
    //         initialRender.current[2] = 1;
    //     } else if (initialRender.current[2] === 1) {
    //         initialRender.current[2] = 2;
    //     } else {
    //         console.log('calling update api function');
    //         fetchList();
    //     }
    // }, [updateConfirmation]);

    useEffect(() => {
        if (showSuccess === true) {
            setSuccess('Done Successfully');
            setTimeout(() => {
                setShowSuccess(false);
                setSuccess('');
            }, 2000);
        }
    }, [showSuccess]);

    const addReportHandler = (name, text) => {
        // console.log('report handle....', data);
        // setNewDepartment(data);
        setNewReport({ name: name, text: text });
    };

    const searchReports = (event) => {
        setSearchKey(event.target.value);
    };

    // const updateDetailHandler = (data) => {
    //     console.log('inside here');
    //     setUpdateDetail((state) => {
    //         return { ...state, in_department_id: data.in_department_id };
    //     });
    //     setUpdateConfirmation((state) => !state);
    // };s

    return (
        <>
            {loader && (
                <div>
                    <h3 style={{ alignItems: 'center' }}>Patient Report List</h3>
                    {/* <Typography>Patient Report List</Typography> */}

                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem', height: 'auto' }}>
                        <Search searchChange={searchReports} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('Reports', 'add') === 1) {
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
                                            No Report Found
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
                        <ReportAdd
                            addReportHandler={addReportHandler}
                            setAdd={setAdd}
                            error={error}
                            setError={setError}
                            updatePatient={updatePatient}
                        />
                    )}

                    {popup && <View3D setPopup={setPopup} URL={URL} extension={extension} />}

                    {/* {remove && (
                        <DeleteCountry
                            setDeleteConfirmation={setDeleteConfirmation}
                            error={error}
                            setError={setError}
                            setRemove={setRemove}
                        />
                    )} */}

                    {/* {update && (
                        <UpdatePatientDepartment
                            updateDetailHandler={updateDetailHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateDetail={updateDetail}
                            setUpdateDetail={setUpdateDetail}
                        />
                    )} */}
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

export default EditablePatientReport;
