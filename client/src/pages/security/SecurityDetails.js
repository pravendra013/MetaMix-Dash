/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogContent, DialogTitle, IconButton, Checkbox } from '@mui/material';
// import { Close } from '../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import * as api from '../../api/index.js';
import * as crypt from '../../utils/crypto.js';
import { makeStyles } from '@mui/styles';
import '../configuration/configuration.css';

const useStyles = makeStyles({
    input: {
        width: '100%',
        marginBottom: '1rem'
        // pointerEvents: 'none'
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        // pointerEvents: 'none'
    }
});

const SecurityDetails = ({ setDetails, securityDetail }) => {
    const [securitydata, setSecurityData] = useState({ securityOptions: [] });

    const classes = useStyles();

    const data = [];

    const rows = securitydata.securityOptions.map((row) => ({
        id: row.security_option_id,
        security_option_name: row.security_option_name,
        all: row.all,
        add: row.add,
        view: row.view,
        update: row.update,
        delete: row.delete
    }));

    const columns = [
        {
            field: 'security_option_name',
            headerName: 'Security Options',
            flex: 1,
            editable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <strong>{params.value}</strong>
        },
        {
            field: 'all',
            headerName: 'All',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <Checkbox size="small" checked={params.row.all} />
        },
        {
            field: 'add',
            headerName: 'Add',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <Checkbox size="small" checked={params.row.add} />
        },
        {
            field: 'view',
            headerName: 'View',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <Checkbox size="small" checked={params.row.view} />
        },
        {
            field: 'update',
            headerName: 'Update',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <Checkbox size="small" checked={params.row.update} />
        },
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => <Checkbox size="small" checked={params.row.delete} />
        }
    ];

    useEffect(() => {
        const fetchList = async () => {
            try {
                const userGroup = { in_user_group_id: securityDetail.user_group_id };
                const encryptedData = crypt.encryptData(userGroup);
                const { data: decryptedData } = await api.getUserGroupSecurity({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log('data consoling');
                console.log(Object.values(data.userGroupSecurity).length);
                console.log(data.userGroupSecurity[0].security_option_id);
                const securityOptions = [];
                for (let i = 0; i < Object.values(data.userGroupSecurity).length; i++) {
                    if (
                        data.userGroupSecurity[i].view +
                            data.userGroupSecurity[i].add +
                            data.userGroupSecurity[i].update +
                            data.userGroupSecurity[i].delete ==
                        4
                    ) {
                        var all = 1;
                    } else {
                        var all = 0;
                    }
                    securityOptions.push({
                        security_option_id: data.userGroupSecurity[i].security_option_id,
                        security_option_name: data.userGroupSecurity[i].security_option_name,
                        view: data.userGroupSecurity[i].view,
                        add: data.userGroupSecurity[i].add,
                        update: data.userGroupSecurity[i].update,
                        delete: data.userGroupSecurity[i].delete,
                        all: all
                    });
                }
                setSecurityData(() => {
                    return { securityOptions: securityOptions };
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, []);

    console.log('beside');
    console.log(securitydata);

    return (
        <>
            <Dialog
                open={open}
                maxWidth="sm"
                fullWidth
                // style={{ pointerEvents: 'none' }}
                onClose={() => {
                    setDetails(false);
                }}
                onBackdropClick={() => {
                    setDetails(false);
                }}
                onEscapeKeyDown={() => {
                    setDetails(false);
                }}
            >
                <form>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        View Security
                    </DialogTitle>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0',
                            right: '0'
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setDetails(false);
                            }}
                        >
                            <CancelRoundedIcon />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        <div className={classes.flexContainer}>
                            <TextField
                                id="details"
                                label="Center Name"
                                variant="outlined"
                                className={classes.input}
                                value={securityDetail.center_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                            <TextField
                                id="details"
                                label="User Group Name"
                                variant="outlined"
                                className={classes.input}
                                value={securityDetail.user_group_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </div>
                        <Box
                            sx={{
                                height: 340,
                                width: '100%',
                                mt: '1rem',

                                '& .super-app-theme--header': {
                                    backgroundColor: '#85CDFD'
                                }
                            }}
                        >
                            <DataGrid
                                rows={rows}
                                disableSelectionOnClick
                                rowHeight={22}
                                headerHeight={30}
                                columns={columns}
                                checkboxSelection={false}
                                style={{ pointerEvents: 'none' }}
                            />
                        </Box>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default SecurityDetails;
