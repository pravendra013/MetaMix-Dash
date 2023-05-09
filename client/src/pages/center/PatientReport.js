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
import Typography from 'themes/overrides/Typography.js';

const PatientReport = ({ patientsDetail }) => {
    const [rows, setRows] = useState([]);
    const { user_info } = JSON.parse(sessionStorage.getItem('user'));
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
        }
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 0.18,

        //     headerClassName: 'super-app-theme--header',

        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 <div style={{ display: 'flex' }}>
        //                     {/* <IconButton
        //                         aria-label="visibility"
        //                         size="small"
        //                         // disabled
        //                         color="primary"
        //                         onClick={() => {
        //                             console.log(params.row);
        //                             setDepartmentDetail(params.row);
        //                             setDetails(true);
        //                         }}
        //                     >
        //                         <VisibilityIcon sx={{ width: '1rem' }} />
        //                     </IconButton> */}
        //                     <IconButton
        //                         aria-label="edit"
        //                         size="small"
        //                         color="primary"
        //                         onClick={() => {
        //                             if (operationCheck('Country', 'update') !== 1) {
        //                                 const data = {
        //                                     in_patient_department_id: params.row.patient_department_id,

        //                                     in_department_name: params.row.department_name,
        //                                     in_department_id: params.row.department_id,

        //                                     in_patient_id: params.row.patient_id,
        //                                     in_patient_name: params.row.patient_name,

        //                                     in_user_id: params.row.user_id,
        //                                     in_user_name: params.row.user_name
        //                                 };
        //                                 setUpdateDetail(data);
        //                                 setUpdate(true);
        //                             } else {
        //                                 setPermission(true);
        //                             }
        //                         }}
        //                     >
        //                         <EditIcon sx={{ width: '1rem' }} />
        //                     </IconButton>
        //                 </div>
        //             </>
        //         );
        //     }
        // }
    ];

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');
    const [permission, setPermission] = useState(false);

    const [searchKey, setSearchKey] = useState(null);

    const [toggleUpdate, setToggleUpdate] = useState();

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const initialRender = useRef([0, 0, 0]);

    //PATIENT REPORT
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

        console.log(patientsDetail);
        if (initialRender.current[0] === 0) get();
    }, []);

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
        if (initialRender.current[1] === 0) {
            initialRender.current[1] = 1;
        } else if (initialRender.current[1] === 1) {
            // initialRender.current[1] = 2;
            get();
        } else {
            // get();
        }
    }, [searchKey]);

    // Report Toggle
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

        if (initialRender.current[0] === 0) {
            initialRender.current[0] = 1;
        } else if (initialRender.current[0] === 1) {
            // initialRender.current[0] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [toggleUpdate]);

    useEffect(() => {
        if (showSuccess === true) {
            setSuccess('Done Successfully');
            setTimeout(() => {
                setShowSuccess(false);
                setSuccess('');
            }, 2000);
        }
    }, [showSuccess]);

    const searchCountry = (event) => {
        setSearchKey(event.target.value);
    };

    return (
        <>
            {loader && (
                <div>
                    <h3 style={{ alignItems: 'center' }}>Patient Report List</h3>

                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem', height: 'auto' }}>
                        <Search searchChange={searchCountry} />
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
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                        />
                    </Box>

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

export default PatientReport;
