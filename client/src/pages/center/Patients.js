/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';
import Switch from '@mui/material/Switch';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';

import operationCheck from '../../utils/operationCheck';
import Delete from './delete-form/Delete.js';
import UpdatePatient from './update-form/UpdatePatient.js';
import AddPatient from './add-form/PatientAdd.js';
import AllowedBox from 'pages/AllowedBox.js';
import PatientsDetails from './detail-form/PatientsDetail.js';

import '../configuration/configuration.css';
import { useLocation, useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const Patients = () => {
    const [rows, setRows] = useState([]);
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const navigate = useNavigate();
    let { state } = useLocation();

    useEffect(() => {
        if (state && state.name && state.name === 'update') {
            const fetchList = async () => {
                try {
                    console.log(state.data, 'updating data.....');
                    const decryptedData = crypt.encryptData(state.data);
                    await api.patientUpdate({ data: decryptedData });
                    navigate('/patients');
                    try {
                        // navigate('/patients');

                        const institute = { in_institute_id: user_info.out_institute_id };
                        // const institute = { in_institute_id: 5 };

                        const encryptedData = crypt.encryptData(institute);
                        const { data: decryptedData } = await api.patientGet({ data: encryptedData });

                        const data = crypt.decryptData(decryptedData); //Decryption of Data

                        let row = [];

                        for (let i = 0; i < Object.values(data.patient).length; i++) {
                            const n = {
                                id: data.patient[i].patient_id,
                                patient_id: data.patient[i].patient_id,

                                institute_id: data.patient[i].institute_id,
                                center_id: data.patient[i].center_id,
                                department_id: data.patient[i].department_id,

                                city_id: data.patient[i].city_id,
                                state_id: data.patient[i].state_id,
                                country_id: data.patient[i].country_id,

                                city_name: data.patient[i].city_name,
                                state_name: data.patient[i].state_name,
                                country_name: data.patient[i].country_name,

                                uhid: data.patient[i].uhid,
                                govt_uhid: data.patient[i].govt_uhid,

                                patient_name: data.patient[i].patient_name,
                                patient_age: data.patient[i].patient_age,

                                // patient_gender: data.patient[i].patient_gender.toLowerCase() === 'Male' ? 'M' : 'F',
                                patient_gender: data.patient[i].patient_gender === 'M' ? 'Male' : 'Female',
                                patient_email: data.patient[i].patient_email,
                                patient_mobile: data.patient[i].patient_mobile,
                                patient_mobile_alt: data.patient[i].patient_mobile_alt,
                                patient_address: data.patient[i].patient_address,
                                department_name: data.patient[i].department_name,

                                active: data.patient[i].active,
                                created_by: data.patient[i].created_by
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
                        // setError('Country already exists.');
                        // setUpdate(true);
                    }
                } catch (error) {
                    console.log(error);
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);
                    // setError('Country already exists.');
                    // setUpdate(true);
                }
            };
            fetchList();
            // setUpdateConfirmation((state) => !state);
        }
    }, []);

    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('Patients', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_patient_id: params.row.patient_id,

                    in_institute_id: params.row.institute_id,
                    // in_center_id: params.row.center_id,
                    // in_department_id: params.row.department_id,

                    in_city_id: params.row.city_id,
                    in_state_id: params.row.state_id,
                    in_country_id: params.row.country_id,

                    in_city_name: params.row.city_name,
                    in_state_name: params.row.state_name,

                    in_uhid: params.row.uhid,
                    in_govt_uhid: params.row.govt_uhid,

                    in_patient_name: params.row.patient_name,
                    in_patient_age: params.row.patient_age,

                    in_patient_gender: params.row.patient_gender === 'Male' ? 'M' : 'F',
                    in_patient_email: params.row.patient_email,
                    in_patient_mobile: params.row.patient_mobile,
                    in_patient_mobile_alt: params.row.patient_mobile_alt,
                    in_patient_address: params.row.patient_address,
                    // in_department_name: params.row.department_name,

                    in_active: params.row.active,
                    in_created_by: params.row.created_by
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
            field: 'patient_name',
            headerName: 'Patient',
            flex: 0.15,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'patient_mobile',
            headerName: 'Contact Number',
            flex: 0.15,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'patient_age',
            headerName: 'Age',
            flex: 0.15,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'patient_gender',
            headerName: 'Gender',
            flex: 0.15,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'uhid',
            headerName: 'UHID',
            flex: 0.15,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'govt_uhid',
            headerName: 'Gov UHID',
            flex: 0.15,
            headerClassName: 'super-app-theme--header'
        },
        // {
        //     field: 'country_name',
        //     headerName: 'Country',
        //     flex: 0.15,
        //     headerClassName: 'super-app-theme--header'
        // },
        {
            field: 'state_name',
            headerName: 'State',
            flex: 0.15,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'city_name',
            headerName: 'City',
            flex: 0.15,
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
            // flex: 0.15,
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
                                    if (operationCheck('Patients', 'view') === 1) {
                                        const data = {
                                            in_patient_id: params.row.patient_id,

                                            in_institute_id: params.row.institute_id,
                                            // in_center_id: params.row.center_id,
                                            // in_department_id: params.row.department_id,

                                            in_city_id: params.row.city_id,
                                            in_state_id: params.row.state_id,
                                            in_country_id: params.row.country_id,

                                            in_city_name: params.row.city_name,
                                            in_state_name: params.row.state_name,
                                            in_country_name: params.row.country_name,

                                            in_uhid: params.row.uhid,
                                            in_govt_uhid: params.row.govt_uhid,

                                            in_patient_name: params.row.patient_name,
                                            in_patient_age: params.row.patient_age,

                                            // in_patient_gender: params.row.patient_gender === 'Male' ? 'M' : 'F',
                                            in_patient_gender: params.row.patient_gender,
                                            in_patient_email: params.row.patient_email,
                                            in_patient_mobile: params.row.patient_mobile,
                                            in_patient_mobile_alt: params.row.patient_mobile_alt,
                                            in_patient_address: params.row.patient_address,
                                            // in_department_name: params.row.department_name,

                                            in_active: params.row.active,
                                            in_created_by: params.row.created_by
                                        };
                                        setPatientsDetail(data);
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
                                    if (operationCheck('Patients', 'update') === 1) {
                                        const data = {
                                            in_patient_id: params.row.patient_id,

                                            in_institute_id: params.row.institute_id,
                                            in_center_id: params.row.center_id,
                                            in_department_id: params.row.department_id,

                                            in_city_id: params.row.city_id,
                                            in_state_id: params.row.state_id,
                                            in_country_id: params.row.country_id,

                                            in_city_name: params.row.city_name,
                                            in_state_name: params.row.state_name,
                                            in_country_name: params.row.country_name,

                                            in_uhid: params.row.uhid,
                                            in_govt_uhid: params.row.govt_uhid,

                                            in_patient_name: params.row.patient_name,
                                            in_patient_age: params.row.patient_age,

                                            // in_patient_gender: params.row.patient_gender === 'Male' ? 'M' : 'F',
                                            in_patient_gender: params.row.patient_gender,
                                            in_patient_email: params.row.patient_email,
                                            in_patient_mobile: params.row.patient_mobile,
                                            in_patient_mobile_alt: params.row.patient_mobile_alt,
                                            in_patient_address: params.row.patient_address,
                                            in_department_name: params.row.department_name,

                                            in_active: params.row.active,
                                            in_created_by: params.row.created_by
                                        };

                                        navigate('/updatepatient', {
                                            state: {
                                                patientsDetail: data
                                            }
                                        });
                                        // setUpdatePatient(data);
                                        // setUpdate(true);
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
                                    if (operationCheck('Patients', 'delete') === 1) {
                                        const data = {
                                            in_patient_id: params.row.patient_id,

                                            in_institute_id: params.row.institute_id,
                                            // in_center_id: params.row.center_id,
                                            // in_department_id: params.row.department_id,

                                            in_city_id: params.row.city_id,
                                            in_state_id: params.row.state_id,
                                            in_country_id: params.row.country_id,

                                            in_city_name: params.row.city_name,
                                            in_state_name: params.row.state_name,

                                            in_uhid: params.row.uhid,
                                            in_govt_uhid: params.row.govt_uhid,

                                            in_patient_name: params.row.patient_name,
                                            in_patient_age: params.row.patient_age,

                                            in_patient_gender: params.row.patient_gender === 'Male' ? 'M' : 'F',
                                            in_patient_email: params.row.patient_email,
                                            in_patient_mobile: params.row.patient_mobile,
                                            in_patient_mobile_alt: params.row.patient_mobile_alt,
                                            in_patient_address: params.row.patient_address,
                                            // in_department_name: params.row.department_name,

                                            in_active: params.row.active,
                                            in_created_by: params.row.created_by
                                        };
                                        setDeletePatient(data);
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
    const [newPatient, setNewPatient] = useState('');

    const [remove, setRemove] = useState(false);
    const [deletePatient, setDeletePatient] = useState();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [update, setUpdate] = useState(false);
    const [updatePatient, setUpdatePatient] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [patientsDetail, setPatientsDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // PATIENT LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const patient = { in_institute_id: user_info.out_institute_id };

                const encryptedData = crypt.encryptData(patient);
                const { data: decryptedData } = await api.patientGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.patient).length; i++) {
                    const n = {
                        id: data.patient[i].patient_id,
                        patient_id: data.patient[i].patient_id,

                        institute_id: data.patient[i].institute_id,
                        // center_id: data.patient[i].center_id,
                        // department_id: data.patient[i].department_id,

                        city_id: data.patient[i].city_id,
                        state_id: data.patient[i].state_id,
                        country_id: data.patient[i].country_id,

                        city_name: data.patient[i].city_name,
                        state_name: data.patient[i].state_name,
                        country_name: data.patient[i].country_name,

                        uhid: data.patient[i].uhid,
                        govt_uhid: data.patient[i].govt_uhid,

                        patient_name: data.patient[i].patient_name,
                        patient_age: data.patient[i].patient_age,

                        patient_gender: data.patient[i].patient_gender === 'M' ? 'Male' : 'Female',
                        patient_email: data.patient[i].patient_email,
                        patient_mobile: data.patient[i].patient_mobile,
                        patient_mobile_alt: data.patient[i].patient_mobile_alt,
                        patient_address: data.patient[i].patient_address,
                        // department_name: data.patient[i].department_name,

                        active: data.patient[i].active,
                        created_by: data.patient[i].created_by
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
                console.log(newPatient);

                const decryptedData = crypt.encryptData(newPatient);
                await api.patientCreate({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id };
                    // const institute = { in_institute_id: 5 };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.patientGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data

                    let row = [];
                    console.log(data);
                    for (let i = 0; i < Object.values(data.patient).length; i++) {
                        const n = {
                            id: data.patient[i].patient_id,
                            patient_id: data.patient[i].patient_id,

                            institute_id: data.patient[i].institute_id,
                            // center_id: data.patient[i].center_id,
                            // department_id: data.patient[i].department_id,

                            city_id: data.patient[i].city_id,
                            state_id: data.patient[i].state_id,
                            country_id: data.patient[i].country_id,

                            city_name: data.patient[i].city_name,
                            state_name: data.patient[i].state_name,
                            country_name: data.patient[i].country_name,

                            uhid: data.patient[i].uhid,
                            govt_uhid: data.patient[i].govt_uhid,

                            patient_name: data.patient[i].patient_name,
                            patient_age: data.patient[i].patient_age,

                            patient_gender: data.patient[i].patient_gender === 'M' ? 'Male' : 'Female',
                            patient_email: data.patient[i].patient_email,
                            patient_mobile: data.patient[i].patient_mobile,
                            patient_mobile_alt: data.patient[i].patient_mobile_alt,
                            patient_address: data.patient[i].patient_address,
                            // department_name: data.patient[i].department_name,

                            active: data.patient[i].active,
                            created_by: data.patient[i].created_by
                        };
                        row.push(n);
                    }
                    setRows(row);
                    setError('');
                    setAdd(false);
                    setShowSuccess(true);
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    setError(data.message);
                    // setError('Country already exists.');
                    setAdd(true);
                }
            } catch (error) {
                // console.log(error.response.data.message);
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
            fetchList();
        }
    }, [newPatient]);

    //PATIENT SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.patientGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.patient).length; i++) {
                    if (data.patient[i].patient_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            id: data.patient[i].patient_id,
                            patient_id: data.patient[i].patient_id,

                            institute_id: data.patient[i].institute_id,
                            // center_id: data.patient[i].center_id,
                            // department_id: data.patient[i].department_id,

                            city_id: data.patient[i].city_id,
                            state_id: data.patient[i].state_id,
                            country_id: data.patient[i].country_id,

                            city_name: data.patient[i].city_name,
                            state_name: data.patient[i].state_name,
                            country_name: data.patient[i].country_name,

                            uhid: data.patient[i].uhid,
                            govt_uhid: data.patient[i].govt_uhid,

                            patient_name: data.patient[i].patient_name,
                            patient_age: data.patient[i].patient_age,

                            patient_gender: data.patient[i].patient_gender === 'M' ? 'Male' : 'Female',
                            patient_email: data.patient[i].patient_email,
                            patient_mobile: data.patient[i].patient_mobile,
                            patient_mobile_alt: data.patient[i].patient_mobile_alt,
                            patient_address: data.patient[i].patient_address,
                            // department_name: data.patient[i].department_name,

                            active: data.patient[i].active,
                            created_by: data.patient[i].created_by
                        };
                        row.push(n);
                    }
                }

                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };

        // fetchList();

        if (initialRender.current[1] === 0) {
            initialRender.current[1] = 1;
        } else if (initialRender.current[1] === 1) {
            // initialRender.current[1] = 2;
            fetchList();
        } else {
            fetchList();
        }
    }, [searchKey]);

    // COUNTRY-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(updatePatient);
                const decryptedData = crypt.encryptData(updatePatient);
                await api.patientUpdate({ data: decryptedData });
                try {
                    // navigate('/patients');

                    const institute = { in_institute_id: user_info.out_institute_id };
                    // const institute = { in_institute_id: 5 };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.patientGet({ data: encryptedData });

                    const data = crypt.decryptData(decryptedData); //Decryption of Data

                    let row = [];

                    for (let i = 0; i < Object.values(data.patient).length; i++) {
                        const n = {
                            id: data.patient[i].patient_id,
                            patient_id: data.patient[i].patient_id,

                            institute_id: data.patient[i].institute_id,
                            center_id: data.patient[i].center_id,
                            department_id: data.patient[i].department_id,

                            city_id: data.patient[i].city_id,
                            state_id: data.patient[i].state_id,
                            country_id: data.patient[i].country_id,

                            city_name: data.patient[i].city_name,
                            state_name: data.patient[i].state_name,
                            country_name: data.patient[i].country_name,

                            uhid: data.patient[i].uhid,
                            govt_uhid: data.patient[i].govt_uhid,

                            patient_name: data.patient[i].patient_name,
                            patient_age: data.patient[i].patient_age,

                            // patient_gender: data.patient[i].patient_gender.toLowerCase() === 'Male' ? 'M' : 'F',
                            patient_gender: data.patient[i].patient_gender === 'M' ? 'Male' : 'Female',
                            patient_email: data.patient[i].patient_email,
                            patient_mobile: data.patient[i].patient_mobile,
                            patient_mobile_alt: data.patient[i].patient_mobile_alt,
                            patient_address: data.patient[i].patient_address,
                            department_name: data.patient[i].department_name,

                            active: data.patient[i].active,
                            created_by: data.patient[i].created_by
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
                    // setError('Country already exists.');
                    setUpdate(true);
                }
            } catch (error) {
                console.log(error);
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);
                // setError('Country already exists.');
                setUpdate(true);
            }
        };
        if (initialRender.current[2] === 0) {
            initialRender.current[2] = 1;
        } else if (initialRender.current[2] === 1) {
            // initialRender.current[2] = 2;
            fetchList();
        } else {
            fetchList();
        }
    }, [updateConfirmation]);

    // COUNTRY-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.patientUpdate({ data: decryptedData });
                try {
                    const institute = { in_institute_id: user_info.out_institute_id };
                    // const institute = { in_institute_id: 5 };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.patientGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.patient).length; i++) {
                        const n = {
                            id: data.patient[i].patient_id,
                            patient_id: data.patient[i].patient_id,

                            institute_id: data.patient[i].institute_id,
                            // center_id: data.patient[i].center_id,
                            // department_id: data.patient[i].department_id,

                            city_id: data.patient[i].city_id,
                            state_id: data.patient[i].state_id,
                            country_id: data.patient[i].country_id,

                            city_name: data.patient[i].city_name,
                            state_name: data.patient[i].state_name,
                            country_name: data.patient[i].country_name,

                            uhid: data.patient[i].uhid,
                            govt_uhid: data.patient[i].govt_uhid,

                            patient_name: data.patient[i].patient_name,
                            patient_age: data.patient[i].patient_age,

                            patient_gender: data.patient[i].patient_gender === 'M' ? 'Male' : 'Female',
                            patient_email: data.patient[i].patient_email,
                            patient_mobile: data.patient[i].patient_mobile,
                            patient_mobile_alt: data.patient[i].patient_mobile_alt,
                            patient_address: data.patient[i].patient_address,
                            // department_name: data.patient[i].department_name,

                            active: data.patient[i].active,
                            created_by: data.patient[i].created_by
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
            fetchList();
        }
    }, [toggleUpdate]);

    // COUNTRY-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deletePatient);
                await api.patientDelete({ data: decryptedData });

                try {
                    const institute = { in_institute_id: user_info.out_institute_id };
                    // const institute = { in_institute_id: 5 };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.patientGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.patient).length; i++) {
                        const n = {
                            id: data.patient[i].patient_id,
                            patient_id: data.patient[i].patient_id,

                            institute_id: data.patient[i].institute_id,
                            // center_id: data.patient[i].center_id,
                            // department_id: data.patient[i].department_id,

                            city_id: data.patient[i].city_id,
                            state_id: data.patient[i].state_id,
                            country_id: data.patient[i].country_id,

                            city_name: data.patient[i].city_name,
                            state_name: data.patient[i].state_name,
                            country_name: data.patient[i].country_name,

                            uhid: data.patient[i].uhid,
                            govt_uhid: data.patient[i].govt_uhid,

                            patient_name: data.patient[i].patient_name,
                            patient_age: data.patient[i].patient_age,

                            patient_gender: data.patient[i].patient_gender === 'M' ? 'Male' : 'Female',
                            patient_email: data.patient[i].patient_email,
                            patient_mobile: data.patient[i].patient_mobile,
                            patient_mobile_alt: data.patient[i].patient_mobile_alt,
                            patient_address: data.patient[i].patient_address,
                            // department_name: data.patient[i].department_name,

                            active: data.patient[i].active,
                            created_by: data.patient[i].created_by
                        };
                        row.push(n);
                    }
                    setRows(row);
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

    const addPatientHandler = (name) => {
        setNewPatient(name);
    };

    const searchPatient = (event) => {
        setSearchKey(event.target.value);
    };

    const updatePatientHandler = (data) => {
        console.log('Insode update handler in paetient component... ');
        setUpdatePatient(data);
        setUpdateConfirmation((state) => !state);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchPatient} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('Patients', 'add') === 1) {
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
                                            No Patient Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            // getRowHeight={() => 'auto'}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            // getRowId={(row) => row.department_id}
                        />
                    </Box>

                    {add && <AddPatient addPatientHandler={addPatientHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}

                    {update && (
                        <UpdatePatient
                            updatePatientHandler={updatePatientHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updatePatient={updatePatient}
                        />
                    )}

                    {details && <PatientsDetails setDetails={setDetails} patientsDetail={patientsDetail} />}

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

export default Patients;
