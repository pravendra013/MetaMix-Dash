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
import AddReportType from './add-form/ReportTypeForm';
import Delete from './delete-form/Delete';
import UpdateReportType from './update-form/UpdateReportType';
import AllowedBox from 'pages/AllowedBox.js';
import ReportTypeDetails from './details-form/ReportTypeDetails';
import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import './configuration.css';
import operationCheck from '../../utils/operationCheck';

const ReportType = () => {
    const [rows, setRows] = useState([]);
    const ToggleComponent = ({ params }) => {
        const switchActiveStatus = () => {
            if (operationCheck('Report Type', 'update') === 1) {
                params.row.active = 1 - params.row.active;
                setToggleUpdate({
                    in_document_type_id: params.row.document_type_id,
                    in_document_type_name: params.row.document_type_name,
                    in_document_type_extension: params.row.document_type_extension,
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
            field: 'document_type_name',
            headerName: 'Document Type Name',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'document_type_extension',
            headerName: 'Document Type Extension',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'active',
            headerName: 'Active',
            // flex: 0.18,
            width: 70,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <ToggleComponent params={params} />
        },
        {
            field: 'actions',
            headerName: 'Actions',
            // flex: 0.28,
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
                                    if (operationCheck('Report Type', 'view') === 1) {
                                        const data = {
                                            id: params.row.document_type_id,
                                            document_type_name: params.row.document_type_name,
                                            document_type_extension: params.row.document_type_extension
                                        };
                                        setReportTypeDetail(data);
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
                                    if (operationCheck('Report Type', 'update') === 1) {
                                        const data = {
                                            in_document_type_id: params.row.document_type_id,
                                            in_document_type_name: params.row.document_type_name,
                                            in_document_type_extension: params.row.document_type_extension,
                                            in_active: params.row.active
                                        };
                                        setUpdateReportType(data);
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
                                    if (operationCheck('Report Type', 'delete') === 1) {
                                        const data = {
                                            in_document_type_id: params.row.document_type_id,
                                            in_document_type_name: params.row.document_type_name,
                                            in_document_type_extension: params.row.document_type_extension
                                        };
                                        setDeleteReportType(data);
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
    const [newReportType, setNewReportType] = useState('');

    const [update, setUpdate] = useState(false);
    const [updateReportType, setUpdateReportType] = useState();
    const [toggleUpdate, setToggleUpdate] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const [deleteReportType, setDeleteReportType] = useState();
    const [remove, setRemove] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const [reportTypeDetail, setReportTypeDetail] = useState('');
    const [details, setDetails] = useState(false);

    const initialRender = useRef([0, 0, 0, 0]);

    // REPORT TYPE-LIST
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.reportTypeGet();
                const data = crypt.decryptData(encryptedData); //Decryption of Data
                let row = [];
                console.log('inside report document type');
                console.log(data.ReportDocumentType[0].document_type_id);
                for (let i = 0; i < Object.values(data.ReportDocumentType).length; i++) {
                    const n = {
                        document_type_id: data.ReportDocumentType[i].document_type_id,
                        document_type_name: data.ReportDocumentType[i].document_type_name,
                        document_type_extension: data.ReportDocumentType[i].document_type_extension,
                        active: data.ReportDocumentType[i].active,
                        id: data.ReportDocumentType[i].document_type_id
                    };
                    row.push(n);
                    console.log(n);
                    console.log(row);
                }
                setRows(row);
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, []);

    //REPORT TYPE-GET/SEARCH
    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedData } = await api.reportTypeGet();
                const data = crypt.decryptData(encryptedData);

                let row = [];
                for (let i = 0; i < Object.keys(data.ReportDocumentType).length; i++) {
                    if (data.ReportDocumentType[i].document_type_name.toLowerCase().includes(searchKey.toLowerCase())) {
                        const n = {
                            document_type_id: data.ReportDocumentType[i].document_type_id,
                            document_type_name: data.ReportDocumentType[i].document_type_name,
                            document_type_extension: data.ReportDocumentType[i].document_type_extension,
                            active: data.ReportDocumentType[i].active,
                            id: data.ReportDocumentType[i].document_type_id
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

    // REPORT_TYPE-TOGGLE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(toggleUpdate);
                await api.reportTypeUpdate({ data: decryptedData });
                try {
                    const { data: encryptedData } = await api.reportTypeGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.ReportDocumentType).length; i++) {
                        const n = {
                            document_type_id: data.ReportDocumentType[i].document_type_id,
                            document_type_name: data.ReportDocumentType[i].document_type_name,
                            document_type_extension: data.ReportDocumentType[i].document_type_extension,
                            active: data.ReportDocumentType[i].active,
                            id: data.ReportDocumentType[i].document_type_id
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

        if (initialRender.current[4] === 0) {
            initialRender.current[4] = 1;
        } else if (initialRender.current[4] === 1) {
            // initialRender.current[4] = 2;
            fetchList();
        } else {
            // fetchList();
        }
    }, [toggleUpdate]);

    //REPORT-TYPE-CREATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(newReportType);
                await api.reportTypeCreate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.reportTypeGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];

                    for (let i = 0; i < Object.values(data.ReportDocumentType).length; i++) {
                        const n = {
                            document_type_id: data.ReportDocumentType[i].document_type_id,
                            document_type_name: data.ReportDocumentType[i].document_type_name,
                            document_type_extension: data.ReportDocumentType[i].document_type_extension,
                            active: data.ReportDocumentType[i].active,
                            id: data.ReportDocumentType[i].document_type_id
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
    }, [newReportType]);

    // REPORT-TYPE-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(updateReportType);
                await api.reportTypeUpdate({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.reportTypeGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    console.log('finding');
                    console.log(data);
                    for (let i = 0; i < Object.values(data.ReportDocumentType).length; i++) {
                        const n = {
                            document_type_id: data.ReportDocumentType[i].document_type_id,
                            document_type_name: data.ReportDocumentType[i].document_type_name,
                            document_type_extension: data.ReportDocumentType[i].document_type_extension,
                            active: data.ReportDocumentType[i].active,
                            id: data.ReportDocumentType[i].document_type_id
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

    // REPORT-TYPE-DELETE
    useEffect(() => {
        const fetchList = async () => {
            try {
                const decryptedData = crypt.encryptData(deleteReportType);
                await api.reportTypeDelete({ data: decryptedData });

                try {
                    const { data: encryptedData } = await api.reportTypeGet();
                    const data = crypt.decryptData(encryptedData);

                    let row = [];
                    for (let i = 0; i < Object.values(data.ReportDocumentType).length; i++) {
                        const n = {
                            document_type_id: data.ReportDocumentType[i].document_type_id,
                            document_type_name: data.ReportDocumentType[i].document_type_name,
                            document_type_extension: data.ReportDocumentType[i].document_type_extension,
                            active: data.ReportDocumentType[i].active,
                            id: data.ReportDocumentType[i].document_type_id
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

    const addReportTypeHandler = (name) => {
        setNewReportType(name);
    };

    const updateReportTypeHandler = (data) => {
        setUpdateReportType((reportType) => {
            return {
                ...reportType,
                in_document_type_name: data.in_document_type_name,
                in_document_type_extension: data.in_document_type_extension,
                in_active: data.in_active
            };
        });
        setUpdateConfirmation((reportType) => !reportType);
    };

    const searchReportType = (event) => {
        setSearchKey(event.target.value);
    };

    return (
        <>
            {loader && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                        <Search searchChange={searchReportType} />

                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: '1.8rem' }}
                            onClick={() => {
                                if (operationCheck('Report Type', 'add') === 1) {
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
                                            No ReportType Found
                                        </Alert>
                                    </Box>
                                    // {/* </Stack> */}
                                )
                            }}
                            disableSelectionOnClick
                            getRowClassName={(params) => (params.row && params.row.id % 2 === 0 ? 'even-row' : 'odd-row')}
                            getRowId={(row) => row.id}
                        />
                    </Box>

                    {add && <AddReportType addReportTypeHandler={addReportTypeHandler} setAdd={setAdd} error={error} setError={setError} />}

                    {update && (
                        <UpdateReportType
                            updateReportTypeHandler={updateReportTypeHandler}
                            setUpdate={setUpdate}
                            error={error}
                            setError={setError}
                            updateReportType={updateReportType}
                        />
                    )}

                    {remove && (
                        <Delete setDeleteConfirmation={setDeleteConfirmation} error={error} setError={setError} setRemove={setRemove} />
                    )}

                    {details && <ReportTypeDetails setDetails={setDetails} reportTypeDetail={reportTypeDetail} />}
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

export default ReportType;
