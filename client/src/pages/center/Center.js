import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import AddCenter from './add-form/AddCenter.js';
import CenterDetails from './detail-form/CenterDetails';
import UpdateCenter from './update-form/UpdateCenter';

import Delete from './delete-form/Delete.js';

import Switch from '@mui/material/Switch';
import AllowedBox from 'pages/AllowedBox.js';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import '../configuration/configuration.css';

import operationCheck from '../../utils/operationCheck';
// import CreateInstitute from './CreateInstitute.js';

// const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

const Center = () => {
    const [rows, setRows] = useState([]);
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('Center', 'delete') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_institute_id: params.row.institute_id,
                    in_center_id: params.row.id,
                    in_center_name: params.row.center_name,
                    in_city_id: params.row.city_id,
                    in_city_name: params.row.city_name,
                    in_country_id: params.row.country_id,
                    in_state_id: params.row.state_id,
                    in_user_name: params.row.user_name,
                    in_user_mobile: params.row.user_mobile,
                    in_user_email: params.row.user_email,
                    in_created_by: params.row.created_by,
                    in_user_id: params.row.user_id,
                    in_center_address: params.row.center_address,
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
                />
            </div>
        );
    };
    const columns = [
        {
            field: 'center_name',
            headerName: 'Center',
            flex: 0.8,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'institute_name',
            headerName: 'Institute',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
            // renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'user_name',
            headerName: 'User',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'user_mobile',
            headerName: 'Mobile',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
        },
        // {
        //     field: 'center_address',
        //     headerName: 'Center Address',
        //     flex: 0.8,
        //     headerClassName: 'super-app-theme--header'
        // },
        {
            field: 'user_email',
            headerName: 'User Email',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
        },

        // {
        //     field: 'country_name',
        //     headerName: 'Country',
        //     flex: 0.8,
        //     headerClassName: 'super-app-theme--header'
        // },
        {
            field: 'state_name',
            headerName: 'State',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'city_name',
            headerName: 'City',
            flex: 0.8,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'active',
            headerName: 'Active',
            flex: 0.4,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <ToggleComponent params={params} />
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.8,
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
                                    if (operationCheck('Center', 'view') === 1) {
                                        const data = {
                                            in_institute_id: params.row.institute_id,
                                            in_institute_name: params.row.institute_name,
                                            in_center_id: params.row.center_id,
                                            in_center_name: params.row.center_name,
                                            in_city_id: params.row.city_id,
                                            in_city_name: params.row.city_name,
                                            in_country_id: params.row.country_id,
                                            in_country_name: params.row.country_name,
                                            in_state_id: params.row.state_id,
                                            in_state_name: params.row.state_name,
                                            in_user_name: params.row.user_name,
                                            in_user_mobile: params.row.user_mobile,
                                            in_user_email: params.row.user_email,
                                            in_created_by: params.row.created_by,
                                            // in_user_id: params.row.user_id,
                                            in_center_address: params.row.center_address
                                        };
                                        setCenterDetail(data);
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
                                    if (operationCheck('Center', 'update') === 1) {
                                        console.log('hhh..', params.row);
                                        const data = {
                                            in_institute_id: params.row.institute_id,
                                            in_institute_name: params.row.institute_name,
                                            in_center_id: params.row.id,
                                            in_center_id: params.row.center_id,
                                            in_center_name: params.row.center_name,
                                            in_city_id: params.row.city_id,
                                            in_city_name: params.row.city_name,
                                            in_country_id: params.row.country_id,
                                            in_country_name: params.row.country_name,
                                            in_state_id: params.row.state_id,
                                            in_state_name: params.row.state_name,
                                            in_user_name: params.row.user_name,
                                            in_user_mobile: params.row.user_mobile,
                                            in_user_email: params.row.user_email,
                                            in_created_by: params.row.created_by,
                                            // in_institute_id: params.row.institute_id,
                                            // in_institute_name: params.row.institute_name,
                                            // in_center_id: params.row.center_id,
                                            // in_center_name: params.row.center_name,
                                            // in_city_id: params.row.city_id,
                                            // in_city_name: params.row.city_name,
                                            // in_country_id: params.row.country_id,
                                            // in_country_name: params.row.country_name,
                                            // in_state_id: params.row.state_id,
                                            // in_state_name: params.row.state_name,
                                            // in_user_name: params.row.user_name,
                                            // in_user_mobile: params.row.user_mobile,
                                            // in_user_email: params.row.user_email,
                                            // in_created_by: params.row.created_by,
                                            in_center_address: params.row.center_address,
                                            in_active: params.row.active
                                        };
                                        setUpdateCenter(data);
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
                                    if (operationCheck('Center', 'delete') === 1) {
                                        const data = {
                                            in_institute_id: params.row.institute_id,
                                            in_institute_name: params.row.institute_name,
                                            in_center_id: params.row.center_id,
                                            in_center_id: params.row.id,
                                            in_center_name: params.row.center_name,
                                            in_city_id: params.row.city_id,
                                            in_city_name: params.row.city_name,
                                            in_country_id: params.row.country_id,
                                            in_country_name: params.row.country_name,
                                            in_state_id: params.row.state_id,
                                            in_state_name: params.row.state_name,
                                            in_user_name: params.row.user_name,
                                            in_user_mobile: params.row.user_mobile,
                                            in_user_email: params.row.user_email,
                                            in_created_by: params.row.created_by,
                                            in_center_address: params.row.center_address,
                                            in_active: params.row.active
                                        };
                                        console.log(data);
                                        console.log(params.row);
                                        setDeleteCenter(data);
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
    const [newCenter, setNewCenter] = useState('');
    const [add, setAdd] = useState(false);

    const [searchKey, setSearchKey] = useState(null);
    const [update, setUpdate] = useState(false);
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateCenter, setUpdateCenter] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);
    const [centerDetail, setCenterDetail] = useState('');
    const [details, setDetails] = useState(false);
    // const [add, setAdd] = useState(false);
    // const [newInstitute, setNewInstitute] = useState('');
    const [remove, setRemove] = useState(false);
    const [deleteCenter, setDeleteCenter] = useState();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // Center-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = {
                    in_institute_id: user_info.out_institute_id,
                    in_center_id: user_info.out_center_id,
                    in_center_name: user_info.out_center_name
                };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log('data data');
                console.log(data);

                let row = [];

                for (let i = 0; i < Object.values(data.center).length; i++) {
                    const n = {
                        id: data.center[i].center_id,
                        institute_id: data.center[i].institute_id,
                        institute_name: data.center[i].institute_name,
                        city_id: data.center[i].city_id,
                        center_id: data.center[i].center_id,
                        state_id: data.center[i].state_id,
                        country_id: data.center[i].country_id,
                        city_name: data.center[i].city_name,
                        state_name: data.center[i].state_name,
                        country_name: data.center[i].country_name,
                        center_name: data.center[i].center_name,
                        center_address: data.center[i].center_address,
                        user_name: data.center[i].user_name,
                        user_email: data.center[i].user_email,
                        user_mobile: data.center[i].user_mobile,
                        created_by: data.center[i].created_by,

                        active: data.center[i].active
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

    //search
    useEffect(() => {
        const fetchList = async () => {
            try {
                // const institute = { in_institute_id: user_info.out_institute_id };
                const institute = {
                    in_institute_id: user_info.out_institute_id,
                    in_center_id: user_info.out_center_id,
                    in_center_name: user_info.out_center_name
                };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log('data data');
                console.log(data);

                let row = [];

                for (let i = 0; i < Object.values(data.center).length; i++) {
                    if (data.center[i].center_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            institute_id: data.center[i].institute_id,
                            institute_name: data.center[i].institute_name,
                            center_id: data.center[i].center_id,
                            city_id: data.center[i].city_id,
                            state_id: data.center[i].state_id,
                            country_id: data.center[i].country_id,
                            city_name: data.center[i].city_name,
                            state_name: data.center[i].state_name,
                            country_name: data.center[i].country_name,
                            center_name: data.center[i].center_name,
                            center_address: data.center[i].center_address,
                            user_name: data.center[i].user_name,
                            user_email: data.center[i].user_email,
                            user_mobile: data.center[i].user_mobile,
                            created_by: data.center[i].created_by,

                            active: data.center[i].active,
                            id: data.center[i].center_id
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

    // Center create

    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log('input center');
                console.log(newCenter);

                const decryptedData = crypt.encryptData(newCenter);
                await api.centerCreate({ data: decryptedData });

                try {
                    // const institute = { in_institute_id: user_info.out_institute_id };
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_center_id: user_info.out_center_id,
                        in_center_name: user_info.out_center_name
                    };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.center).length; i++) {
                        const n = {
                            institute_id: data.center[i].institute_id,
                            institute_name: data.center[i].institute_name,
                            center_id: data.center[i].center_id,
                            city_id: data.center[i].city_id,
                            state_id: data.center[i].state_id,
                            country_id: data.center[i].country_id,
                            city_name: data.center[i].city_name,
                            state_name: data.center[i].state_name,
                            country_name: data.center[i].country_name,
                            center_name: data.center[i].center_name,
                            center_address: data.center[i].center_address,
                            user_name: data.center[i].user_name,
                            user_email: data.center[i].user_email,
                            user_mobile: data.center[i].user_mobile,
                            created_by: data.center[i].created_by,

                            active: data.center[i].active,
                            id: data.center[i].center_id
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
    }, [newCenter]);

    // DOCTOR-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.centerUpdate({ data: decryptedData });
                try {
                    // const institute = { in_institute_id: user_info.out_institute_id };
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_center_id: user_info.out_center_id,
                        in_center_name: user_info.out_center_name
                    };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.user).length; i++) {
                        const n = {
                            institute_id: data.center[i].institute_id,
                            center_id: data.center[i].center_id,
                            institute_name: data.center[i].institute_name,
                            city_id: data.center[i].city_id,
                            state_id: data.center[i].state_id,
                            country_id: data.center[i].country_id,
                            city_name: data.center[i].city_name,
                            state_name: data.center[i].state_name,
                            country_name: data.center[i].country_name,
                            center_name: data.center[i].center_name,
                            center_address: data.center[i].center_address,
                            user_name: data.center[i].user_name,
                            user_email: data.center[i].user_email,
                            user_mobile: data.center[i].user_mobile,
                            created_by: data.center[i].created_by,

                            active: data.center[i].active,
                            id: data.center[i].center_id
                        };
                        row.push(n);
                    }
                    setRows(row);
                    setError('');
                    setShowSuccess(true);
                    // setShowSuccess(true);
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

        if (initialRender.current[2] === 0) {
            initialRender.current[2] = 1;
        } else if (initialRender.current[2] === 1) {
            // initialRender.current[2] = 2;
            fetchList();
        } else {
            console.log('inside useeffect');
            // fetchList();
        }
    }, [toggleUpdate]);

    // delete
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deleteCenter);
                await api.centerDelete({ data: decryptedData });

                try {
                    // const institute = { in_institute_id: user_info.out_institute_id };
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_center_id: user_info.out_center_id,
                        in_center_name: user_info.out_center_name
                    };
                    // const institute = { in_institute_id: 1 };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.center).length; i++) {
                        const n = {
                            institute_id: data.center[i].institute_id,
                            institute_name: data.center[i].institute_name,
                            center_id: data.center[i].center_id,
                            city_id: data.center[i].city_id,
                            state_id: data.center[i].state_id,
                            country_id: data.center[i].country_id,
                            city_name: data.center[i].city_name,
                            state_name: data.center[i].state_name,
                            country_name: data.center[i].country_name,
                            center_name: data.center[i].center_name,
                            center_address: data.center[i].center_address,
                            user_name: data.center[i].user_name,
                            user_email: data.center[i].user_email,
                            user_mobile: data.center[i].user_mobile,
                            created_by: data.center[i].created_by,
                            active: data.center[i].active,
                            id: data.center[i].center_id
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
                console.log('Here ');
                console.log(error);
                const decryptedData = error.response.data;
                console.log(decryptedData);
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

    // Center-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(updateCenter);
                const decryptedData = crypt.encryptData(updateCenter);
                await api.centerUpdate({ data: decryptedData });
                try {
                    // const institute = {
                    //     in_institute_id: user_info.out_institute_id
                    //     // in_user_id: user_info.out_userid,
                    // };
                    const institute = {
                        in_institute_id: user_info.out_institute_id,
                        in_center_id: user_info.out_center_id,
                        in_center_name: user_info.out_center_name
                    };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);
                    let row = [];

                    for (let i = 0; i < Object.values(data.center).length; i++) {
                        const n = {
                            institute_id: data.center[i].institute_id,
                            institute_name: data.center[i].institute_name,
                            city_id: data.center[i].city_id,
                            state_id: data.center[i].state_id,
                            country_id: data.center[i].country_id,
                            city_name: data.center[i].city_name,
                            state_name: data.center[i].state_name,
                            country_name: data.center[i].country_name,
                            center_name: data.center[i].center_name,
                            center_address: data.center[i].center_address,
                            user_name: data.center[i].user_name,
                            user_email: data.center[i].user_email,
                            user_mobile: data.center[i].user_mobile,
                            created_by: data.center[i].created_by,

                            active: data.center[i].active,
                            id: data.center[i].center_id
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
        if (initialRender.current[4] === 0) {
            initialRender.current[4] = 1;
        } else if (initialRender.current[4] === 1) {
            // initialRender.current[4] = 2;
            fetchList();
        } else {
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

    const searchInstitute = (event) => {
        setSearchKey(event.target.value);
    };

    const addCenterHandler = (name) => {
        console.log('name....', name);
        setNewCenter(name);
    };

    // const addCenterHandler = (name) => {
    //     setNewInstitute(name);
    // };

    const updateCenterHandler = (data) => {
        setUpdateCenter((state) => {
            return {
                ...state,

                in_institute_id: data.in_institute_id,
                in_center_id: data.in_center_id,
                in_center_name: data.in_center_name,
                in_city_id: data.in_city_id,
                in_country_id: data.in_country_id,
                in_state_id: data.in_state_id,
                in_city_name: data.in_city_name,
                in_user_name: data.in_user_name,
                in_user_id: data.in_user_id,
                in_user_mobile: data.in_user_mobile,
                in_city_name: data.in_city_name,
                in_user_email: data.in_user_email,
                in_active: data.in_active,
                in_created_by: data.in_created_by,
                in_center_address: data.in_center_address,
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
                        <Search searchChange={searchInstitute} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('Center', 'add') === 1) {
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
                            columns={columns}
                            rows={rows}
                            editMode="row"
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
                                            No Center Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            disableSelectionOnClick
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                        />
                    </Box>

                    {add && <AddCenter addCenterHandler={addCenterHandler} setAdd={setAdd} error={error} setError={setError} />}
                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}

                    {details && <CenterDetails setDetails={setDetails} centerDetail={centerDetail} />}

                    {update && (
                        <UpdateCenter
                            updateCenterHandler={updateCenterHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateCenter={updateCenter}
                            // setDetails={setDetails}
                            centerDetail={centerDetail}
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

export default Center;
