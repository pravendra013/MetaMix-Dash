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
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import AddCity from './add-form/AddCity.js';
import DeleteCity from './delete-form/DeleteCity.js';
import UpdateCity from './update-form/UpdateCity.js';
import CityDetails from './details-form/CityDetails.js';
import Switch from '@mui/material/Switch';
import AllowedBox from 'pages/AllowedBox.js';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import './configuration.css';
import operationCheck from '../../utils/operationCheck';

// const { security_option, user_info } = JSON.parse(window.sessionStorage.getItem('user'));

const City = () => {
    const [rows, setRows] = useState([]);
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('City', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_city_name: params.row.city_name,
                    in_state_id: params.row.state_id,
                    in_active: params.row.active,
                    in_city_id: params.row.city_id
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
            field: 'city_name',
            headerName: 'City Name',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'state_name',
            headerName: 'State Name',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'country_name',
            headerName: 'Country Name',
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
            // flex: 0.4,
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
                                    if (operationCheck('City', 'view') === 1) {
                                        const data = {
                                            city_name: params.row.city_name,
                                            state_name: params.row.state_name,
                                            country_name: params.row.country_name
                                        };
                                        setCityDetail(data);
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
                                    if (operationCheck('City', 'update') === 1) {
                                        const data = {
                                            in_city_id: params.row.city_id,
                                            in_city_name: params.row.city_name,
                                            in_state_id: params.row.state_id,
                                            in_state_name: params.row.state_name,
                                            in_country_id: params.row.country_id,
                                            in_country_name: params.row.country_name,
                                            in_active: params.row.active
                                        };
                                        setUpdateCity(data);
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
                                    if (operationCheck('City', 'delete') === 1) {
                                        const data = {
                                            in_city_id: params.row.city_id,
                                            in_city_name: params.row.city_name,
                                            in_state_id: params.row.state_id
                                        };
                                        setDeleteCity(data);
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
    const [newCity, setNewCity] = useState('');

    const [update, setUpdate] = useState(false);
    const [updateCity, setUpdateCity] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [deleteCity, setDeleteCity] = useState();
    const [remove, setRemove] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [cityDetail, setCityDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // COUNTRY-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.cityGet();
                const data = crypt.decryptData(encryptedData); //Decryption of Data
                let row = [];

                for (let i = 0; i < Object.values(data.city).length; i++) {
                    const n = {
                        city_id: data.city[i].city_id,
                        city_name: data.city[i].city_name,
                        state_id: data.city[i].state_id,
                        state_name: data.city[i].state_name,
                        country_id: data.city[i].country_id,
                        country_name: data.city[i].country_name,
                        active: data.city[i].active,
                        id: data.city[i].country_id
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

    //CITY-CREATE
    useEffect(() => {
        const fetchList = async () => {
            console.log(newCity);
            try {
                const decryptedData = crypt.encryptData(newCity);
                await api.cityCreate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.cityGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];

                    for (let i = 0; i < Object.values(data.city).length; i++) {
                        const n = {
                            city_id: data.city[i].city_id,
                            city_name: data.city[i].city_name,
                            state_id: data.city[i].state_id,
                            state_name: data.city[i].state_name,
                            country_id: data.city[i].country_id,
                            country_name: data.city[i].country_name,
                            active: data.city[i].active,
                            id: data.city[i].country_id
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
    }, [newCity]);

    //COUNTRY-GET/SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.cityGet();
                const data = crypt.decryptData(encryptedData);
                var row = [];
                for (let i = 0; i < Object.keys(data.city).length; i++) {
                    if (data.city[i].city_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            city_id: data.city[i].city_id,
                            city_name: data.city[i].city_name,
                            state_id: data.city[i].state_id,
                            state_name: data.city[i].state_name,
                            country_id: data.city[i].country_id,
                            country_name: data.city[i].country_name,
                            active: data.city[i].active,
                            id: data.city[i].country_id
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

    // City-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(updateCity);
                await api.cityUpdate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.cityGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.city).length; i++) {
                        const n = {
                            city_id: data.city[i].city_id,
                            city_name: data.city[i].city_name,
                            state_id: data.city[i].state_id,
                            state_name: data.city[i].state_name,
                            country_id: data.city[i].country_id,
                            country_name: data.city[i].country_name,
                            active: data.city[i].active,
                            id: data.city[i].country_id
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

    // City-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.cityUpdate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.cityGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.city).length; i++) {
                        const n = {
                            city_id: data.city[i].city_id,
                            city_name: data.city[i].city_name,
                            state_id: data.city[i].state_id,
                            state_name: data.city[i].state_name,
                            country_id: data.city[i].country_id,
                            country_name: data.city[i].country_name,
                            active: data.city[i].active,
                            id: data.city[i].country_id
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

    // COUNTRY-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deleteCity);
                await api.cityDelete({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.cityGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.city).length; i++) {
                        const n = {
                            city_id: data.city[i].city_id,
                            city_name: data.city[i].city_name,
                            state_id: data.city[i].state_id,
                            state_name: data.city[i].state_name,
                            country_id: data.city[i].country_id,
                            country_name: data.city[i].country_name,
                            active: data.city[i].active,
                            id: data.city[i].country_id
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

    const addCityHandler = (name) => {
        setNewCity(name);
    };

    const updateCityHandler = (data) => {
        setUpdateCity((state) => {
            return { ...state, in_city_name: data.in_city_name, in_state_id: data.in_state_id, in_active: data.in_active };
        });
        setUpdateConfirmation((state) => !state);
    };

    const searchCity = (event) => {
        setSearchKey(event.target.value);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchCity} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('City', 'add') === 1) {
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
                                            No City Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            disableSelectionOnClick
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            getRowId={(row) => row.city_id}
                        />
                    </Box>

                    {add && <AddCity addCityHandler={addCityHandler} setAdd={setAdd} error={error} setError={setError} />}
                    {update && (
                        <UpdateCity
                            updateCityHandler={updateCityHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateCity={updateCity}
                        />
                    )}
                    {remove && (
                        <DeleteCity setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}
                    {details && <CityDetails setDetails={setDetails} cityDetail={cityDetail} />}

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

export default City;
