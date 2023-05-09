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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import AddDoctor from './add-form/AddDoctor.js';
import UpdateDoctor from './update-form/UpdateDoctor';
import DoctorDetails from './details-form/DoctorDetails';
import AllowedBox from '../AllowedBox';
import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import operationCheck from '../../utils/operationCheck';
import Delete from './delete-form/Delete.js';
import '../configuration/configuration.css';

const Doctor = () => {
    const [rows, setRows] = useState([]);
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('Doctor', 'delete') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_institute_id: params.row.institute_id,
                    in_center_id: params.row.center_id,
                    in_center_name: params.row.center_name,
                    in_department_id: params.row.department_id,
                    in_department_name: params.row.department_name,
                    in_city_id: params.row.city_id,
                    in_country_id: params.row.country_id,
                    in_state_id: params.row.state_id,
                    in_city_name: params.row.city_name,
                    in_user_name: params.row.user_name,
                    in_user_type_name: params.row.user_type_name,
                    // in_user_type_id: params.row.user_type_id,
                    in_user_mobile: params.row.user_mobile,
                    in_city_name: params.row.city_name,
                    in_user_email: params.row.user_email,
                    in_active: params.row.active,
                    in_created_by: params.row.created_by,
                    in_user_type: params.row.user_type,
                    in_user_group_id: params.row.user_group_id,
                    in_user_id: params.row.user_id,
                    in_user_address: params.row.user_address
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
            field: 'user_name',
            headerName: 'Doctor',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'user_mobile',
            headerName: 'Contact Number',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'center_name',
            headerName: 'Center Name',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'city_name',
            headerName: 'City Name',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'department_name',
            headerName: 'Department',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'user_type_name',
            headerName: 'Designation',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'active',
            headerName: 'Active',
            // flex: 0.4,
            width: 70,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <ToggleComponent params={params} />
        },
        {
            field: 'actions',
            headerName: 'Actions',
            // flex: 0.7,
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
                                    if (operationCheck('Doctor', 'view') === 1) {
                                        const data = {
                                            city_name: params.row.city_name,
                                            state_name: params.row.state_name,
                                            state_id: params.row.state_id,
                                            country_name: params.row.country_name,
                                            user_name: params.row.user_name,
                                            user_mobile: params.row.user_mobile,
                                            user_email: params.row.user_email,
                                            user_address: params.row.user_address,
                                            department_name: params.row.department_name,
                                            center_name: params.row.center_name,
                                            // in_user_type_name: params.row.user_type_name,
                                            // in_user_type: params.row.user_type,
                                            user_type_name: params.row.user_type_name,
                                            in_institute_id: params.row.institute_id
                                        };
                                        setDoctorDetail(data);
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
                                    if (operationCheck('Doctor', 'update') === 1) {
                                        const data = {
                                            in_institute_id: params.row.institute_id,
                                            in_center_id: params.row.center_id,
                                            in_center_name: params.row.center_name,
                                            in_department_id: params.row.department_id,
                                            in_department_name: params.row.department_name,
                                            in_country_id: params.row.country_id,
                                            in_country_name: params.row.country_name,
                                            in_state_id: params.row.state_id,
                                            in_state_name: params.row.state_name,
                                            in_city_id: params.row.city_id,
                                            in_city_name: params.row.city_name,
                                            in_user_name: params.row.user_name,
                                            in_user_mobile: params.row.user_mobile,
                                            in_city_name: params.row.city_name,
                                            in_user_email: params.row.user_email,
                                            in_user_type_name: params.row.user_type_name,
                                            in_user_id: params.row.user_id,
                                            in_created_by: params.row.created_by,
                                            in_user_type: params.row.user_type,
                                            in_user_group_id: params.row.user_group_id,
                                            in_user_address: params.row.user_address,
                                            in_active: params.row.active
                                        };
                                        console.log('data find');
                                        console.log(data);
                                        setUpdateDoctor(data);
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
                                    if (operationCheck('Doctor', 'delete') === 1) {
                                        const data = {
                                            in_institute_id: params.row.institute_id,
                                            in_center_id: params.row.center_id,
                                            in_center_name: params.row.center_name,
                                            in_department_id: params.row.department_id,
                                            in_department_name: params.row.department_name,
                                            in_city_id: params.row.city_id,
                                            in_country_id: params.row.country_id,
                                            in_state_id: params.row.state_id,
                                            in_city_name: params.row.city_name,
                                            in_user_name: params.row.user_name,
                                            in_user_type_name: params.row.user_type_name,
                                            in_user_id: params.row.user_id,
                                            in_user_mobile: params.row.user_mobile,
                                            in_city_name: params.row.city_name,
                                            in_user_email: params.row.user_email,
                                            in_active: params.row.active,
                                            in_created_by: params.row.created_by,
                                            in_user_type: params.row.user_type,
                                            in_user_group_id: params.row.user_group_id,
                                            in_user_address: params.row.user_address
                                            // in_is_doctor: 1
                                        };
                                        console.log(data);
                                        console.log(params.row);
                                        setDeleteDoctor(data);
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
    const [newDoctor, setNewDoctor] = useState('');

    const [remove, setRemove] = useState(false);
    const [deleteDoctor, setDeleteDoctor] = useState();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [update, setUpdate] = useState(false);
    const [updateDoctor, setUpdateDoctor] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [doctorDetail, setDoctorDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // DOCTOR-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_is_doctor: 1, in_center_id: user_info.out_center_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.userGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log('data data');
                console.log(data);

                let row = [];

                for (let i = 0; i < Object.values(data.user).length; i++) {
                    const n = {
                        id: data.user[i].user_id,
                        institute_id: data.user[i].institute_id,
                        center_id: data.user[i].center_id,
                        center_name: data.user[i].center_name,
                        department_id: data.user[i].department_id,
                        department_name: data.user[i].department_name,
                        city_id: data.user[i].city_id,
                        city_name: data.user[i].city_name,
                        country_id: data.user[i].country_id,
                        country_name: data.user[i].country_name,
                        state_id: data.user[i].state_id,
                        state_name: data.user[i].state_name,
                        user_name: data.user[i].user_name,
                        user_type_name: data.user[i].user_type_name,
                        // user_type_id: data.user[i].user_type_id,
                        user_mobile: data.user[i].user_mobile,
                        active: data.user[i].active,
                        created_by: data.user[i].created_by,
                        user_email: data.user[i].user_email,
                        user_type: data.user[i].user_type,
                        user_group_id: data.user[i].user_group_id,
                        user_address: data.user[i].user_address,
                        user_id: data.user[i].user_id
                    };
                    row.push(n);
                }
                console.log('get data country ');
                console.log(row);
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialRender.current[0] === 0) fetchList();
    }, []);

    //DOCTOR-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(newDoctor);

                const decryptedData = crypt.encryptData(newDoctor);
                await api.userCreate({ data: decryptedData });

                try {
                    // const institute = { in_institute_id: user_info.out_institute_id, in_user_id: user_info.out_userid, in_is_doctor: 1 };
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_is_doctor: 1,
                        in_center_id: user_info.out_center_id
                    };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.user).length; i++) {
                        const n = {
                            id: data.user[i].user_id,
                            user_id: data.user[i].user_id,
                            institute_id: data.user[i].institute_id,
                            center_id: data.user[i].center_id,
                            center_name: data.user[i].center_name,
                            department_id: data.user[i].department_id,
                            department_name: data.user[i].department_name,

                            country_id: data.user[i].country_id,
                            country_name: data.user[i].country_name,
                            state_id: data.user[i].state_id,
                            state_name: data.user[i].state_name,
                            city_id: data.user[i].city_id,
                            city_name: data.user[i].city_name,
                            user_name: data.user[i].user_name,
                            user_type_name: data.user[i].user_type_name,
                            // user_type_id: data.user[i].user_type_id,
                            user_mobile: data.user[i].user_mobile,
                            active: data.user[i].active,
                            created_by: data.user[i].created_by,
                            user_email: data.user[i].user_email,
                            user_type: data.user[i].user_type,
                            user_group_id: data.user[i].user_group_id,
                            user_address: data.user[i].user_address
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
            initialRender.current[0] = 2;
            fetchList();
        } else {
            fetchList();
        }
    }, [newDoctor]);

    // DOCTOR-SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                // const institute = { in_institute_id: user_info.out_institute_id, in_is_doctor: 1 };
                // const institute = { in_institute_id: user_info.out_institute_id, in_user_id: user_info.out_userid, in_is_doctor: 1 };
                const institute = { in_institute_id: user_info.out_institute_id, in_is_doctor: 1, in_center_id: user_info.out_center_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.userGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data

                let row = [];

                for (let i = 0; i < Object.values(data.user).length; i++) {
                    if (data.user[i].user_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            id: data.user[i].user_id,
                            institute_id: data.user[i].institute_id,
                            center_id: data.user[i].center_id,
                            center_name: data.user[i].center_name,
                            department_id: data.user[i].department_id,
                            department_name: data.user[i].department_name,
                            city_id: data.user[i].city_id,
                            city_name: data.user[i].city_name,
                            country_id: data.user[i].country_id,
                            state_id: data.user[i].state_id,
                            user_name: data.user[i].user_name,
                            user_type_name: data.user[i].user_type_name,
                            // user_type_id: data.user[i].user_type_id,
                            user_mobile: data.user[i].user_mobile,
                            active: data.user[i].active,
                            created_by: data.user[i].created_by,
                            user_email: data.user[i].user_email,
                            user_type: data.user[i].user_type,
                            user_group_id: data.user[i].user_group_id,
                            user_address: data.user[i].user_address,
                            user_id: data.user[i].user_id
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

    // DOCTOR-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(updateDoctor);
                const decryptedData = crypt.encryptData(updateDoctor);
                await api.userUpdate({ data: decryptedData });
                try {
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_is_doctor: 1,
                        in_center_id: user_info.out_center_id
                    };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.user).length; i++) {
                        const n = {
                            id: data.user[i].user_id,
                            user_id: data.user[i].user_id,
                            institute_id: data.user[i].institute_id,
                            center_id: data.user[i].center_id,
                            center_name: data.user[i].center_name,
                            department_id: data.user[i].department_id,
                            department_name: data.user[i].department_name,
                            city_id: data.user[i].city_id,
                            city_name: data.user[i].city_name,
                            country_id: data.user[i].country_id,
                            country_name: data.user[i].country_name,
                            state_id: data.user[i].state_id,
                            state_name: data.user[i].state_name,
                            user_name: data.user[i].user_name,
                            user_type_name: data.user[i].user_type_name,
                            // user_type_id: data.user[i].user_type_id,
                            user_mobile: data.user[i].user_mobile,
                            active: data.user[i].active,
                            created_by: data.user[i].created_by,
                            user_email: data.user[i].user_email,
                            user_type: data.user[i].user_type,
                            user_group_id: data.user[i].user_group_id,
                            user_address: data.user[i].user_address,

                            in_is_doctor: 1
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

    // DOCTOR-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.userUpdate({ data: decryptedData });
                try {
                    // const institute = { in_institute_id: user_info.out_institute_id, in_is_doctor: 1 };
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_is_doctor: 1,
                        in_center_id: user_info.out_center_id
                    };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.user).length; i++) {
                        const n = {
                            id: data.user[i].user_id,
                            institute_id: data.user[i].institute_id,
                            center_id: data.user[i].center_id,
                            center_name: data.user[i].center_name,
                            department_id: data.user[i].department_id,
                            department_name: data.user[i].department_name,
                            city_id: data.user[i].city_id,
                            city_name: data.user[i].city_name,
                            country_id: data.user[i].country_id,
                            state_id: data.user[i].state_id,
                            user_name: data.user[i].user_name,
                            user_type_name: data.user[i].user_type_name,
                            user_type_id: data.user[i].user_type_id,
                            user_mobile: data.user[i].user_mobile,
                            active: data.user[i].active,
                            created_by: data.user[i].created_by,
                            user_email: data.user[i].user_email,
                            user_type: data.user[i].user_type,
                            user_group_id: data.user[i].user_group_id,
                            user_address: data.user[i].user_address,
                            user_id: data.user[i].user_id
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
            initialRender.current[4] = 2;
            fetchList();
        } else {
            console.log('inside useeffect');
            fetchList();
        }
    }, [toggleUpdate]);

    // DOCTOR-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deleteDoctor);
                await api.userDelete({ data: decryptedData });

                try {
                    // const institute = { in_institute_id: user_info.out_institute_id, in_is_doctor: 1 };
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_is_doctor: 1,
                        in_center_id: user_info.out_center_id
                    };

                    // const institute = { in_institute_id: 1 };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.userGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.user).length; i++) {
                        const n = {
                            id: data.user[i].user_id,
                            institute_id: data.user[i].institute_id,
                            center_id: data.user[i].center_id,
                            center_name: data.user[i].center_name,
                            department_id: data.user[i].department_id,
                            department_name: data.user[i].department_name,
                            city_id: data.user[i].city_id,
                            city_name: data.user[i].city_name,
                            country_id: data.user[i].country_id,
                            state_id: data.user[i].state_id,
                            user_name: data.user[i].user_name,
                            user_type_name: data.user[i].user_type_name,
                            // user_type_id: data.user[i].user_type_id,
                            user_mobile: data.user[i].user_mobile,
                            active: data.user[i].active,
                            created_by: data.user[i].created_by,
                            user_email: data.user[i].user_email,
                            user_type: data.user[i].user_type,
                            user_group_id: data.user[i].user_group_id,
                            user_address: data.user[i].user_address,
                            user_id: data.user[i].user_id
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

    const addDoctorHandler = (name) => {
        console.log('name....', name);
        setNewDoctor(name);
    };

    const searchDoctor = (event) => {
        setSearchKey(event.target.value);
    };

    const updateDoctorHandler = (data) => {
        setUpdateDoctor((state) => {
            return {
                ...state,
                in_department_name: data.in_department_name,
                in_institute_id: data.in_institute_id,
                in_center_id: data.in_center_id,
                in_center_name: data.in_center_name,
                in_department_id: data.in_department_id,
                in_department_name: data.in_department_name,
                in_city_id: data.in_city_id,
                in_country_id: data.in_country_id,
                in_state_id: data.in_state_id,
                in_city_name: data.in_city_name,
                in_user_name: data.in_user_name,
                in_user_type_name: data.in_user_type_name,
                in_user_id: data.in_user_id,
                in_user_mobile: data.in_user_mobile,
                in_city_name: data.in_city_name,
                in_user_email: data.in_user_email,
                in_active: data.in_active,
                in_created_by: data.in_created_by,
                in_user_type: data.in_user_type,
                in_user_group_id: data.in_user_group_id,
                in_user_address: data.in_user_address,
                in_is_doctor: 1,

                in_active: data.in_active
            };
        });
        setUpdateConfirmation((state) => !state);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchDoctor} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('Doctor', 'add') === 1) {
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
                                            No Doctor Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            // getRowId={(row) => row.department_id}
                        />
                    </Box>

                    {add && <AddDoctor addDoctorHandler={addDoctorHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}
                    {details && <DoctorDetails setDetails={setDetails} doctorDetail={doctorDetail} />}
                    {update && (
                        <UpdateDoctor
                            updateDoctorHandler={updateDoctorHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateDoctor={updateDoctor}
                        />
                    )}
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

export default Doctor;
