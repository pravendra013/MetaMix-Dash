/* eslint-disable */
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

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
// import './configuration.css';
import operationCheck from '../../utils/operationCheck';
import AddAsset from './add-form/AddAsset.js';
import UpdateAsset from './update-form/AssetUpdate.js';
import AssetDetail from './detail-form/AssetDetail.js';
import AssetUserAdd from './add-form/AssetUserAdd.js';
import Delete from './delete-form/Delete.js';
import AssetUserDetail from './detail-form/AssetUserDetail.js';
import AllowedBox from 'pages/AllowedBox.js';

import '../configuration/configuration.css';

const Asset = ({ asset_id, updateAsset }) => {
    const [rows, setRows] = useState([]);
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            // if (operationCheck('Department', 'delete')) {
            if (true) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_asset_user_id: params.row.asset_user_id,
                    in_asset_id: params.row.asset_id,
                    in_user_id: params.row.user_id,

                    in_user_name: params.row.user_name,
                    in_user_email: params.row.user_email,
                    in_user_mobile: params.row.user_mobile,
                    in_user_pin: params.row.user_pin,

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
            field: 'user_name',
            headerName: 'User',
            flex: 0.25,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },

        {
            field: 'user_mobile',
            headerName: 'Mobile',
            flex: 0.25,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'user_pin',
            headerName: 'User Pin',
            flex: 0.25,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'active',
            headerName: 'Active',
            flex: 0.15,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <ToggleComponent params={params} />
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.15,

            headerClassName: 'super-app-theme--header',

            renderCell: (params) => {
                return (
                    <>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <IconButton
                                aria-label="visibility"
                                size="small"
                                color="primary"
                                onClick={() => {
                                    if (true) {
                                        const data = {
                                            in_asset_user_id: params.row.asset_user_id,
                                            in_asset_id: params.row.asset_id,
                                            in_user_id: params.row.user_id,

                                            in_user_name: params.row.user_name,
                                            in_user_email: params.row.user_email,
                                            in_user_mobile: params.row.user_mobile,
                                            in_user_pin: params.row.user_pin,

                                            in_created_by: params.row.created_by,
                                            in_active: params.row.active
                                        };
                                        setAssetDetail(data);
                                        setDetails(true);
                                    }
                                }}
                            >
                                <VisibilityIcon sx={{ width: '1rem' }} />
                            </IconButton>

                            <IconButton
                                aria-label="delete"
                                size="small"
                                color="error"
                                onClick={() => {
                                    // if (operationCheck('Department', 'delete') === 1) {
                                    if (true) {
                                        const data = {
                                            in_asset_user_id: params.row.asset_user_id,
                                            in_asset_id: params.row.asset_id,
                                            in_user_id: params.row.user_id,

                                            in_user_name: params.row.user_name,
                                            in_user_email: params.row.user_email,
                                            in_user_mobile: params.row.user_mobile,
                                            in_user_pin: params.row.user_pin,

                                            in_created_by: params.row.created_by,
                                            in_active: params.row.active
                                        };
                                        setDeleteUser(data);
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

    const [deleteUser, setDeleteUser] = useState();
    const [remove, setRemove] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState();

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [assetDetail, setAssetDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0]);

    // USER LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_asset_id: asset_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.assetUserMappingGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);

                let row = [];

                for (let i = 0; i < Object.values(data.assetUserMapping).length; i++) {
                    const n = {
                        id: data.assetUserMapping[i].asset_user_id,

                        asset_user_id: data.assetUserMapping[i].asset_user_id,
                        asset_id: data.assetUserMapping[i].asset_id,
                        user_id: data.assetUserMapping[i].user_id,

                        user_name: data.assetUserMapping[i].user_name,
                        user_email: data.assetUserMapping[i].user_email,
                        user_mobile: data.assetUserMapping[i].user_mobile,
                        user_pin: data.assetUserMapping[i].user_pin,

                        created_by: data.assetUserMapping[i].created_by,
                        active: data.assetUserMapping[i].active
                    };
                    row.push(n);
                }
                setRows(row);
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                console.log(data.message);
            }
        };
        if (initialRender.current[0] === 0) fetchList();
    }, []);

    //ASSET SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_asset_id: asset_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.assetUserMappingGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data

                let row = [];

                for (let i = 0; i < Object.values(data.assetUserMapping).length; i++) {
                    console.log('inside loop...');
                    if (data.assetUserMapping[i].user_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            id: data.assetUserMapping[i].asset_user_id,

                            asset_user_id: data.assetUserMapping[i].asset_user_id,
                            asset_id: data.assetUserMapping[i].asset_id,
                            user_id: data.assetUserMapping[i].user_id,

                            user_name: data.assetUserMapping[i].user_name,
                            user_email: data.assetUserMapping[i].user_email,
                            user_mobile: data.assetUserMapping[i].user_mobile,
                            user_pin: data.assetUserMapping[i].user_pin,

                            created_by: data.assetUserMapping[i].created_by,
                            active: data.assetUserMapping[i].active
                        };
                        row.push(n);
                    }
                }
                setRows(row);
            } catch (error) {
                console.log(error);
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
    }, [searchKey]);

    //TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(toggleUpdate);
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.assetUserMappingUpdate({ data: decryptedData });
                try {
                    const institute = { in_asset_id: asset_id };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.assetUserMappingGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);

                    let row = [];

                    for (let i = 0; i < Object.values(data.assetUserMapping).length; i++) {
                        const n = {
                            id: data.assetUserMapping[i].asset_user_id,

                            asset_user_id: data.assetUserMapping[i].asset_user_id,
                            asset_id: data.assetUserMapping[i].asset_id,
                            user_id: data.assetUserMapping[i].user_id,

                            user_name: data.assetUserMapping[i].user_name,
                            user_email: data.assetUserMapping[i].user_email,
                            user_mobile: data.assetUserMapping[i].user_mobile,
                            user_pin: data.assetUserMapping[i].user_pin,

                            created_by: data.assetUserMapping[i].created_by,
                            active: data.assetUserMapping[i].active
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

    //USER CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(newAsset);

                const decryptedData = crypt.encryptData(newAsset);
                await api.assetUserMappingCreate({ data: decryptedData });

                try {
                    const institute = { in_asset_id: asset_id };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.assetUserMappingGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);

                    let row = [];

                    for (let i = 0; i < Object.values(data.assetUserMapping).length; i++) {
                        const n = {
                            id: data.assetUserMapping[i].asset_user_id,

                            asset_user_id: data.assetUserMapping[i].asset_user_id,
                            asset_id: data.assetUserMapping[i].asset_id,
                            user_id: data.assetUserMapping[i].user_id,

                            user_name: data.assetUserMapping[i].user_name,
                            user_email: data.assetUserMapping[i].user_email,
                            user_mobile: data.assetUserMapping[i].user_mobile,
                            user_pin: data.assetUserMapping[i].user_pin,

                            created_by: data.assetUserMapping[i].created_by,
                            active: data.assetUserMapping[i].active
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

        if (initialRender.current[2] === 0) {
            initialRender.current[2] = 1;
        } else if (initialRender.current[2] === 1) {
            // initialRender.current[2] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [newAsset]);

    //USER DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log(deleteUser);
                const decryptedData = crypt.encryptData(deleteUser);
                await api.assetUserMappingDelete({ data: decryptedData });

                try {
                    const institute = { in_asset_id: asset_id };

                    const encryptedData = crypt.encryptData(institute);
                    const { data: decryptedData } = await api.assetUserMappingGet({ data: encryptedData });
                    const data = crypt.decryptData(decryptedData); //Decryption of Data
                    console.log(data);

                    let row = [];

                    for (let i = 0; i < Object.values(data.assetUserMapping).length; i++) {
                        const n = {
                            id: data.assetUserMapping[i].asset_user_id,

                            asset_user_id: data.assetUserMapping[i].asset_user_id,
                            asset_id: data.assetUserMapping[i].asset_id,
                            user_id: data.assetUserMapping[i].user_id,

                            user_name: data.assetUserMapping[i].user_name,
                            user_email: data.assetUserMapping[i].user_email,
                            user_mobile: data.assetUserMapping[i].user_mobile,
                            user_pin: data.assetUserMapping[i].user_pin,

                            created_by: data.assetUserMapping[i].created_by,
                            active: data.assetUserMapping[i].active
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

    const searchHandler = (event) => {
        setSearchKey(event.target.value);
    };

    const addUserHandler = (asset_detail) => {
        setNewAsset(asset_detail);
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
                                if (true) {
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
                                            No User Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            rowHeight={20}
                            headerHeight={30}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                        />
                    </Box>

                    {add && (
                        <AssetUserAdd
                            addUserHandler={addUserHandler}
                            setAdd={setAdd}
                            error={error}
                            setError={setError}
                            asset_id={asset_id}
                            updateAsset={updateAsset}
                        />
                    )}

                    {details && <AssetUserDetail setDetails={setDetails} assetUserDetail={assetDetail} />}

                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
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

export default Asset;
