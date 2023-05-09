/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Alert } from '@mui/material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';

import Switch from '@mui/material/Switch';
import AllowedBox from 'pages/AllowedBox.js';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import '../configuration/configuration.css';

import operationCheck from '../../utils/operationCheck';
import CreateInstitute from './CreateInstitute.js';

const Institute = () => {
    const [rows, setRows] = useState([]);
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('Institute', 'update') === 1) {
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
                />
            </div>
        );
    };
    const columns = [
        {
            field: 'institute_name',
            headerName: 'Institute',
            flex: 0.8,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
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
        {
            field: 'institute_address',
            headerName: 'Institute Address',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
        },

        {
            field: 'country_name',
            headerName: 'Country Name',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'state_name',
            headerName: 'State Name',
            flex: 0.8,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'city_name',
            headerName: 'City Name',
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
                                    if (operationCheck('Institute', 'view') === 1) {
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
                                    if (operationCheck('Institute', 'update') === 1) {
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
                                    if (operationCheck('Institute', 'delete') === 1) {
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
    const [newInstitute, setNewInstitute] = useState('');

    const initialRender = useRef([0, 0, 0, 0]);

    // INSTITUTE-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.instituteGet();
                const data = crypt.decryptData(encryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.institute).length; i++) {
                    const n = {
                        city_id: data.institute[i].city_id,
                        state_id: data.institute[i].state_id,
                        country_id: data.institute[i].country_id,
                        institute_id: data.institute[i].institute_id,

                        city_name: data.institute[i].city_name,
                        state_name: data.institute[i].state_name,
                        country_name: data.institute[i].country_name,
                        institute_name: data.institute[i].institute_name,
                        institute_address: data.institute[i].institute_address,

                        user_name: data.institute[i].user_name,
                        user_email: data.institute[i].user_email,
                        user_mobile: data.institute[i].user_mobile,

                        active: data.institute[i].active,
                        id: data.institute[i].institute_id
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

    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.instituteGet();
                const data = crypt.decryptData(encryptedData); //Decryption of Data
                let row = [];

                for (let i = 0; i < Object.values(data.institute).length; i++) {
                    if (data.institute[i].institute_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            city_id: data.institute[i].city_id,
                            state_id: data.institute[i].state_id,
                            country_id: data.institute[i].country_id,
                            institute_id: data.institute[i].institute_id,

                            city_name: data.institute[i].city_name,
                            state_name: data.institute[i].state_name,
                            country_name: data.institute[i].country_name,
                            institute_name: data.institute[i].institute_name,
                            institute_address: data.institute[i].institute_address,

                            user_name: data.institute[i].user_name,
                            user_email: data.institute[i].user_email,
                            user_mobile: data.institute[i].user_mobile,

                            active: data.institute[i].active,
                            id: data.institute[i].institute_id
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
            fetchList();
        }
    }, [searchKey]);

    const searchInstitute = (event) => {
        setSearchKey(event.target.value);
    };

    const addInstituteHandler = (name) => {
        setNewInstitute(name);
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
                                if (operationCheck('Institute', 'add') === 1) {
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
                            disableSelectionOnClick
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
                                            No Institute Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                        />
                    </Box>

                    {add && <CreateInstitute addInstituteHandler={addInstituteHandler} setAdd={setAdd} error={error} setError={setError} />}
                    {/* {update && (
                        <UpdateCity
                            updateCityHandler={updateCityHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateCity={updateCity}
                        />
                    )} */}
                    {/* {remove && (
                        <DeleteCity setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )} */}
                    {/* {details && <CityDetails setDetails={setDetails} cityDetail={cityDetail} />} */}

                    {permission && <AllowedBox setPermission={setPermission} />}

                    {/* {showSuccess && (
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
                    )} */}
                </div>
            )}
        </>
    );
};

export default Institute;
