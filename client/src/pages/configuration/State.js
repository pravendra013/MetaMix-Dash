/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import Switch from '@mui/material/Switch';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert } from '@mui/material';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import AddState from './add-form/Stateform.js';
import DeleteState from './delete-form/DeleteState.js';
import UpdateState from './update-form/UpdateState.js';
import AllowedBox from 'pages/AllowedBox.js';
import StateDetails from './details-form/StateDetails.js';
import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import './configuration.css';
import operationCheck from '../../utils/operationCheck';

const State = () => {
    const [rows, setRows] = useState([]);
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('State', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_state_name: params.row.state_name,
                    in_state_id: params.row.state_id,
                    in_active: params.row.active,
                    in_country_id: params.row.country_id
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
            field: 'state_name',
            headerName: 'State Name',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'country_name',
            headerName: 'Country Name',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'toggle_btn',
            headerName: 'Active',
            // flex: 0.2,
            width: 70,
            headerClassName: 'super-app-theme--header',

            renderCell: (params) => <ToggleComponent params={params} />
        },

        {
            field: 'actions',
            headerName: 'Actions',
            // flex: 0.25,
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
                                    if (operationCheck('State', 'view') === 1) {
                                        const data = { state_name: params.row.state_name, country_name: params.row.country_name };
                                        setStateDetail(data);
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
                                    if (operationCheck('State', 'update') === 1) {
                                        const data = {
                                            in_state_id: params.row.state_id,
                                            in_state_name: params.row.state_name,
                                            in_country_id: params.row.country_id,
                                            in_country_name: params.row.country_name,
                                            in_active: params.row.active
                                        };
                                        setUpdateState(data);
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
                                    if (operationCheck('State', 'delete') === 1) {
                                        const data = {
                                            in_state_name: params.row.state_name,
                                            in_state_id: params.row.state_id,
                                            in_country_name: params.row.country_name,
                                            in_country_id: params.row.country_id
                                        };
                                        setDeleteState(data);
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
    const [newState, setNewState] = useState('');

    const [update, setUpdate] = useState(false);
    const [updateState, setUpdateState] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [deleteState, setDeleteState] = useState();
    const [remove, setRemove] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [stateDetail, setStateDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // COUNTRY-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.stateGet();
                const data = crypt.decryptData(encryptedData); //Decryption of Data
                let row = [];

                for (let i = 0; i < Object.values(data.state).length; i++) {
                    const n = {
                        state_id: data.state[i].state_id,
                        state_name: data.state[i].state_name,
                        country_id: data.state[i].country_id,
                        country_name: data.state[i].country_name,
                        active: data.state[i].active,
                        id: data.state[i].state_id
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

    //State-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(newState);
                await api.stateCreate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.stateGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];

                    for (let i = 0; i < Object.values(data.state).length; i++) {
                        const n = {
                            state_id: data.state[i].state_id,
                            state_name: data.state[i].state_name,
                            country_id: data.state[i].country_id,
                            country_name: data.state[i].country_name,
                            active: data.state[i].active,
                            id: data.state[i].country_id
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
    }, [newState]);

    //COUNTRY-GET/SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.stateGet();
                const data = crypt.decryptData(encryptedData);
                var row = [];
                for (let i = 0; i < Object.keys(data.state).length; i++) {
                    if (data.state[i].state_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            state_id: data.state[i].state_id,
                            state_name: data.state[i].state_name,
                            country_id: data.state[i].country_id,
                            country_name: data.state[i].country_name,
                            active: data.state[i].active,
                            id: data.state[i].country_id
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

    // State-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(updateState);
                await api.stateUpdate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.stateGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.state).length; i++) {
                        const n = {
                            state_id: data.state[i].state_id,
                            state_name: data.state[i].state_name,
                            country_id: data.state[i].country_id,
                            country_name: data.state[i].country_name,
                            active: data.state[i].active,
                            id: data.state[i].country_id
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
    }, [updateConfirmation]);

    // STATE_TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.stateUpdate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.stateGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.state).length; i++) {
                        const n = {
                            state_id: data.state[i].state_id,
                            state_name: data.state[i].state_name,
                            country_id: data.state[i].country_id,
                            country_name: data.state[i].country_name,
                            active: data.state[i].active,
                            id: data.state[i].country_id
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
                }
            } catch (error) {
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);
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
    }, [toggleUpdate]);

    // STATE-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deleteState);
                await api.stateDelete({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.stateGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.state).length; i++) {
                        const n = {
                            state_id: data.state[i].state_id,
                            state_name: data.state[i].state_name,
                            country_id: data.state[i].country_id,
                            country_name: data.state[i].country_name,
                            active: data.state[i].active,
                            id: data.state[i].country_id
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

    const addStateHandler = (name) => {
        setNewState(name);
    };

    const updateStateHandler = (data) => {
        setUpdateState((state) => {
            return { ...state, in_state_name: data.in_state_name, in_country_id: data.in_country_id, in_active: data.in_active };
        });
        setUpdateConfirmation((state) => !state);
    };

    const searchState = (event) => {
        setSearchKey(event.target.value);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchState} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('State', 'add') === 1) {
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
                                            No State Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            disableSelectionOnClick
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            getRowId={(row) => row.state_id}
                        />
                    </Box>

                    {add && <AddState addStateHandler={addStateHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {update && (
                        <UpdateState
                            updateStateHandler={updateStateHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateState={updateState}
                        />
                    )}

                    {remove && (
                        <DeleteState
                            setDeleteConfirmation={setDeleteConfirmation}
                            error={error}
                            setError={setError}
                            setRemove={setRemove}
                        />
                    )}

                    {details && <StateDetails setDetails={setDetails} stateDetail={stateDetail} />}

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

export default State;
