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
import TableForm from './add-form/AddCountry.js';
import DeleteCountry from './delete-form/DeleteCountry.js';
import UpdateCountry from './update-form/UpdateCountry.js';
import AllowedBox from 'pages/AllowedBox.js';
import CountryDetails from './details-form/CountryDetails.js';
import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import './configuration.css';
import operationCheck from '../../utils/operationCheck';

// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//     root: {
//         '& .MuiDataGrid-row:nth-of-type(odd)': {
//             backgroundColor: 'red'
//         }
//     }
// });

const Country = () => {
    // const classes = useStyles();
    const [rows, setRows] = useState([]);
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('Country', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({ in_country_name: params.row.country_name, in_country_id: params.row.id, in_active: params.row.active });
            } else {
                setPermission(true);
            }
        };

        return (
            <div>
                <Switch
                    size="small"
                    // size="large"
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
            field: 'country_name',
            headerName: 'Country Name',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'active',
            headerName: 'Active',
            // flex: 0.12,
            width: 70,
            // width: '50rem',
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <ToggleComponent params={params} />
        },

        {
            field: 'actions',
            headerName: 'Actions',
            // flex: 0.14,
            width: 100,

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
                                onClick={() => {
                                    if (operationCheck('Country', 'view') === 1) {
                                        setCountryDetail(params.row.country_name);
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
                                    if (operationCheck('Country', 'update') === 1) {
                                        const data = {
                                            in_country_id: params.row.id,
                                            in_country_name: params.row.country_name,
                                            in_active: params.row.active
                                        };
                                        setUpdateCountry(data);
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
                                    if (operationCheck('Country', 'delete') === 1) {
                                        const data = {
                                            in_country_id: params.row.id,
                                            in_country_name: params.row.country_name,
                                            in_active: params.row.active
                                        };
                                        setDeleteCountry(data);
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
    const [newCountry, setNewCountry] = useState('');

    const [remove, setRemove] = useState(false);
    const [deleteCountry, setDeleteCountry] = useState();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [update, setUpdate] = useState(false);
    const [updateCountry, setUpdateCountry] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [countryDetail, setCountryDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);

    // COUNTRY-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.countryGet();
                const data = crypt.decryptData(encryptedData); //Decryption of Data
                console.log('inside country check');
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.country).length; i++) {
                    const n = {
                        country_name: data.country[i].country_name,
                        id: data.country[i].country_id,
                        active: data.country[i].active
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
                const country = { in_country_name: newCountry };
                const decryptedData = crypt.encryptData(country);
                await api.countryCreate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.countryGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];

                    for (let i = 0; i < Object.values(data.country).length; i++) {
                        const n = {
                            country_name: data.country[i].country_name,
                            id: data.country[i].country_id,
                            active: data.country[i].active
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
        // if (initialRender.current[0] === 2) fetchList();
    }, [newCountry]);

    //COUNTRY-GET/SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.countryGet();
                const data = crypt.decryptData(encryptedData);

                let row = [];
                for (let i = 0; i < Object.keys(data.country).length; i++) {
                    if (data.country[i].country_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            country_name: data.country[i].country_name,
                            id: data.country[i].country_id,
                            active: data.country[i].active
                        };
                        row.push(n);
                    }
                }
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialRender.current[4] === 0) {
            initialRender.current[4] = 1;
        } else if (initialRender.current[4] === 1) {
            initialRender.current[4] = 2;
            // fetchList();
        } else {
            fetchList();
        }
        // if (initialRender.current[0] === 2) fetchList();
    }, [searchKey]);

    // COUNTRY-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(updateCountry);
                await api.countryUpdate({ data: decryptedData });
                try {
                    const { data: encryptedData } = await api.countryGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.country).length; i++) {
                        const n = {
                            country_name: data.country[i].country_name,
                            id: data.country[i].country_id,
                            active: data.country[i].active
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
            // initialRender.current[2] = 2;
            fetchList();
        } else {
            // fetchList();
        }
        // if (initialRender.current[0] === 2) fetchList();
    }, [updateConfirmation]);

    // COUNTRY-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.countryUpdate({ data: decryptedData });
                try {
                    const { data: encryptedData } = await api.countryGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.country).length; i++) {
                        const n = {
                            country_name: data.country[i].country_name,
                            id: data.country[i].country_id,
                            active: data.country[i].active
                        };
                        row.push(n);
                        // }
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

        if (initialRender.current[1] === 0) {
            initialRender.current[1] = 1;
        } else if (initialRender.current[1] === 1) {
            // initialRender.current[1] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [toggleUpdate]);

    // COUNTRY-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deleteCountry);
                await api.countryDelete({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.countryGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.country).length; i++) {
                        const n = {
                            country_name: data.country[i].country_name,
                            id: data.country[i].country_id,
                            active: data.country[i].active
                        };
                        row.push(n);
                    }
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

    const addCountryHandler = (name) => {
        setNewCountry(name);
    };

    const searchCountry = (event) => {
        setSearchKey(event.target.value);
    };

    const updateCountryHandler = (data) => {
        setUpdateCountry((state) => {
            return { ...state, in_country_name: data.in_country_name, in_active: data.in_active };
        });
        setUpdateConfirmation((state) => !state);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchCountry} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('Country', 'add') === 1) {
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
                            // className={classes.root}
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
                                            No Country Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            // getRowClassName={(params) => `custom-class-${params.row.id}`}
                        />
                    </Box>

                    {add && <TableForm addCountryHandler={addCountryHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {remove && (
                        <DeleteCountry
                            setDeleteConfirmation={setDeleteConfirmation}
                            error={error}
                            setError={setError}
                            setRemove={setRemove}
                        />
                    )}

                    {update && (
                        <UpdateCountry
                            updateCountryHandler={updateCountryHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateCountry={updateCountry}
                        />
                    )}

                    {details && <CountryDetails setDetails={setDetails} countryName={countryDetail} />}
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

export default Country;
