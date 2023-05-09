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
// import './configuration.css';
import operationCheck from '../../utils/operationCheck';
import AddAsset from './add-form/AddAsset.js';
import UpdateAsset from './update-form/AssetUpdate.js';
import AssetDetail from './detail-form/AssetDetail.js';
import Delete from './delete-form/Delete.js';
import AllowedBox from 'pages/AllowedBox.js';

import '../configuration/configuration.css';
import { useLocation, useNavigate } from '../../../node_modules/react-router-dom/dist/index.js';

const Asset = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    let { state } = useLocation();
    const location = useLocation();
    const [run, setRun] = useState(state);
    const updateRender = useRef(0);
    useEffect(() => {
        if (state && state.name && state.name === 'update') {
            const fetchList = async () => {
                try {
                    const decryptedData = crypt.encryptData(state.data);
                    await api.assetsUpdate({ data: decryptedData });
                    navigate('/asset');

                    try {
                        let institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };

                        const encryptedData = crypt.encryptData(institute);
                        const { data: decryptedData } = await api.assetsGet({ data: encryptedData });
                        const data = crypt.decryptData(decryptedData); //Decryption of Data
                        console.log(data);

                        let row = [];

                        for (let i = 0; i < Object.values(data.asset).length; i++) {
                            const n = {
                                id: data.asset[i].asset_id,

                                asset_id: data.asset[i].asset_id,
                                asset_type_id: data.asset[i].asset_type_id,
                                center_id: data.asset[i].center_id,
                                institute_id: data.asset[i].institute_id,
                                device_id: data.asset[i].device_id,

                                asset_type_name: data.asset[i].asset_type_name,
                                center_name: data.asset[i].center_name,
                                device_code: data.asset[i].device_code,
                                created_by: data.asset[i].created_by,
                                active: data.asset[i].active
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
                        // setUpdate(true);
                    }
                } catch (error) {
                    const decryptedData = error.response.data;
                    const data = crypt.decryptData(decryptedData);
                    // setError(data.message);
                    // setError('Country already exists.');
                    // setUpdate(true);
                }
            };

            fetchList();
            // setUpdateConfirmation((state) => !state);
        }
    }, []);

    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            // if (operationCheck('Department', 'delete')) {
            if (operationCheck('Asset', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_asset_id: params.row.asset_id,
                    in_asset_type_id: params.row.asset_type_id,
                    in_center_id: params.row.center_id,
                    in_institute_id: params.row.institute_id,
                    in_device_id: params.row.device_id,

                    in_asset_type_name: params.row.asset_type_name,
                    in_center_name: params.row.center_name,
                    in_device_code: params.row.device_code,
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
            field: 'center_name',
            headerName: 'Center',
            flex: 0.1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },

        {
            field: 'device_code',
            headerName: 'Device Code',
            flex: 0.1,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'device_id',
            headerName: 'device_id',
            flex: 0.1,
            headerClassName: 'super-app-theme--header'
        },
        // {
        //     field: 'created_by',
        //     headerName: 'Created By',
        //     flex: 0.15,
        //     headerClassName: 'super-app-theme--header'
        // },
        {
            field: 'asset_type_name',
            headerName: 'Asset Type',
            flex: 0.1,
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
            // flex: 0.05,
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
                                    if (operationCheck('Asset', 'view') === 1) {
                                        const data = {
                                            in_asset_id: params.row.asset_id,
                                            in_asset_type_id: params.row.asset_type_id,
                                            in_center_id: params.row.center_id,
                                            in_institute_id: params.row.institute_id,
                                            in_device_id: params.row.device_id,

                                            in_asset_type_name: params.row.asset_type_name,
                                            in_center_name: params.row.center_name,
                                            in_device_code: params.row.device_code,
                                            in_created_by: params.row.created_by,
                                            in_active: params.row.active
                                        };
                                        setAssetDetail(data);
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
                                    if (operationCheck('Asset', 'update') === 1) {
                                        const data = {
                                            in_asset_id: params.row.asset_id,
                                            in_asset_type_id: params.row.asset_type_id,
                                            in_center_id: params.row.center_id,
                                            in_institute_id: params.row.institute_id,
                                            in_device_id: params.row.device_id,

                                            in_asset_type_name: params.row.asset_type_name,
                                            in_center_name: params.row.center_name,
                                            in_device_code: params.row.device_code,
                                            in_created_by: params.row.created_by,
                                            in_active: params.row.active
                                        };
                                        setUpdateAsset(data);

                                        navigate('/assetupdate', {
                                            state: {
                                                patientsDetail: data
                                            }
                                        });
                                        // setUpdateAsset(data);
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
                                    if (operationCheck('Asset', 'delete') === 1) {
                                        const data = {
                                            in_asset_id: params.row.asset_id,
                                            in_asset_type_id: params.row.asset_type_id,
                                            in_center_id: params.row.center_id,
                                            in_institute_id: params.row.institute_id,
                                            in_device_id: params.row.device_id,

                                            in_asset_type_name: params.row.asset_type_name,
                                            in_center_name: params.row.center_name,
                                            in_device_code: params.row.device_code,
                                            in_created_by: params.row.created_by,
                                            in_active: params.row.active
                                        };
                                        setDeleteAsset(data);
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
    const [newAsset, setNewAsset] = useState('');

    const [toggleUpdate, setToggleUpdate] = useState();
    const [update, setUpdate] = useState(false);
    const [updateAsset, setUpdateAsset] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [deleteAsset, setDeleteAsset] = useState();
    const [remove, setRemove] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState();

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [assetDetail, setAssetDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // ASSET LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                let institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.assetsGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);

                let row = [];

                for (let i = 0; i < Object.values(data.asset).length; i++) {
                    const n = {
                        id: data.asset[i].asset_id,

                        asset_id: data.asset[i].asset_id,
                        asset_type_id: data.asset[i].asset_type_id,
                        center_id: data.asset[i].center_id,
                        institute_id: data.asset[i].institute_id,
                        device_id: data.asset[i].device_id,

                        asset_type_name: data.asset[i].asset_type_name,
                        center_name: data.asset[i].center_name,
                        device_code: data.asset[i].device_code,
                        created_by: data.asset[i].created_by,
                        active: data.asset[i].active
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

    //ASSET SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                let institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.assetsGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);

                let row = [];

                for (let i = 0; i < Object.values(data.asset).length; i++) {
                    if (
                        data.asset[i].device_code.toLowerCase().includes(searchKey.toLowerCase()) ||
                        data.asset[i].device_id.toLowerCase().includes(searchKey.toLowerCase())
                    ) {
                        const n = {
                            id: data.asset[i].asset_id,

                            asset_id: data.asset[i].asset_id,
                            asset_type_id: data.asset[i].asset_type_id,
                            center_id: data.asset[i].center_id,
                            institute_id: data.asset[i].institute_id,
                            device_id: data.asset[i].device_id,

                            asset_type_name: data.asset[i].asset_type_name,
                            center_name: data.asset[i].center_name,
                            device_code: data.asset[i].device_code,
                            created_by: data.asset[i].created_by,
                            active: data.asset[i].active
                        };
                        row.push(n);
                    }
                }
                console.log(row);
                setRows(row);
            } catch (error) {
                console.log(error);
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
    }, [searchKey]);

    //TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(toggleUpdate);
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.assetsUpdate({ data: decryptedData });
                try {
                    let institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.assetsGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);

                    let row = [];

                    for (let i = 0; i < Object.values(data.asset).length; i++) {
                        const n = {
                            id: data.asset[i].asset_id,

                            asset_id: data.asset[i].asset_id,
                            asset_type_id: data.asset[i].asset_type_id,
                            center_id: data.asset[i].center_id,
                            institute_id: data.asset[i].institute_id,
                            device_id: data.asset[i].device_id,

                            asset_type_name: data.asset[i].asset_type_name,
                            center_name: data.asset[i].center_name,
                            device_code: data.asset[i].device_code,
                            created_by: data.asset[i].created_by,
                            active: data.asset[i].active
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

        if (initialRender.current[1] === 0) {
            initialRender.current[1] = 1;
        } else if (initialRender.current[1] === 1) {
            // initialRender.current[1] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [toggleUpdate]);

    //UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(updateAsset);
                const decryptedData = crypt.encryptData(updateAsset);
                await api.assetsUpdate({ data: decryptedData });
                try {
                    let institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.assetsGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);

                    let row = [];

                    for (let i = 0; i < Object.values(data.asset).length; i++) {
                        const n = {
                            id: data.asset[i].asset_id,

                            asset_id: data.asset[i].asset_id,
                            asset_type_id: data.asset[i].asset_type_id,
                            center_id: data.asset[i].center_id,
                            institute_id: data.asset[i].institute_id,
                            device_id: data.asset[i].device_id,

                            asset_type_name: data.asset[i].asset_type_name,
                            center_name: data.asset[i].center_name,
                            device_code: data.asset[i].device_code,
                            created_by: data.asset[i].created_by,
                            active: data.asset[i].active
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
                setError(data.message);
                // setError('Country already exists.');
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

    //ASSET CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(newAsset);
                await api.assetsCreate({ data: decryptedData });

                try {
                    let institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.assetsGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);

                    let row = [];

                    for (let i = 0; i < Object.values(data.asset).length; i++) {
                        const n = {
                            id: data.asset[i].asset_id,

                            asset_id: data.asset[i].asset_id,
                            asset_type_id: data.asset[i].asset_type_id,
                            center_id: data.asset[i].center_id,
                            institute_id: data.asset[i].institute_id,
                            device_id: data.asset[i].device_id,

                            asset_type_name: data.asset[i].asset_type_name,
                            center_name: data.asset[i].center_name,
                            device_code: data.asset[i].device_code,
                            created_by: data.asset[i].created_by,
                            active: data.asset[i].active
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
    }, [newAsset]);

    //ASSET DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deleteAsset);
                await api.assetsDelete({ data: decryptedData });

                try {
                    let institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.assetsGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);

                    let row = [];

                    for (let i = 0; i < Object.values(data.asset).length; i++) {
                        const n = {
                            id: data.asset[i].asset_id,

                            asset_id: data.asset[i].asset_id,
                            asset_type_id: data.asset[i].asset_type_id,
                            center_id: data.asset[i].center_id,
                            institute_id: data.asset[i].institute_id,
                            device_id: data.asset[i].device_id,

                            asset_type_name: data.asset[i].asset_type_name,
                            center_name: data.asset[i].center_name,
                            device_code: data.asset[i].device_code,
                            created_by: data.asset[i].created_by,
                            active: data.asset[i].active
                        };
                        row.push(n);
                    }
                    setError('');
                    setRows(row);
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

    const searchHandler = (event) => {
        setSearchKey(event.target.value);
    };

    const addAssetHandler = (asset_detail) => {
        setNewAsset(asset_detail);
    };

    const updateAssetHandler = (data) => {
        console.log('runnning update handler....');
        setUpdateAsset((state) => {
            return {
                ...state,
                in_device_id: data.in_device_id,
                in_device_code: data.in_device_code,
                in_asset_type_id: data.in_asset_type_id,
                in_created_by: data.in_created_by,
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
                        <Search searchChange={searchHandler} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                // if (operationCheck('Department', 'add') === 1) {
                                if (operationCheck('Asset', 'add') === 1) {
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
                            // editMode="row"
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
                                            No Asset Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                        />
                    </Box>

                    {add && <AddAsset addAssetHandler={addAssetHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}

                    {update && (
                        <UpdateAsset
                            updateAssetHandler={updateAssetHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateAsset={updateAsset}
                        />
                    )}
                    {details && <AssetDetail setDetails={setDetails} assetDetail={assetDetail} />}

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

export default Asset;
