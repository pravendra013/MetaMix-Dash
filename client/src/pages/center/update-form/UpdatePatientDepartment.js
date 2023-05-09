/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import { Alert } from '@mui/material';

const styles = {
    input: {
        marginBottom: '0.7rem',
        width: '100%',
        height: '1.8rem'
    },
    select: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: 'auto',
        marginTop: '0.5rem'
    }
};

const UpdatePatientDepartment = ({ updateDetailHandler, setUpdate, error, setError, updateDetail, setUpdateDetail }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const [department, setDepartment] = useState(updateDetail.in_department_id);
    const [list, setList] = useState();
    const [showDepartment, setShowDepartment] = useState(false);
    const initialRender = useRef(0);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
                console.log(updateDetail.in_department_name);
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.departmentList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data.centerDepartmentList);
                let row = [];

                for (let i = 0; i < Object.keys(data.centerDepartmentList).length; i++) {
                    const n = {
                        department_id: data.centerDepartmentList[i].department_id,
                        department_name: data.centerDepartmentList[i].department_name
                    };
                    row.push(n);
                }
                setShowDepartment(true);

                setList(row);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialRender.current === 0) {
            fetchList();
            initialRender.current++;
        }
    }, []);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const departmentHandler = (event) => {
        event.preventDefault();
        updateDetailHandler({ in_department_id: department });
    };

    const selectDepartmentHandler = (event) => {
        setDepartment(event.target.value);
        for (let i = 0; i < list.length; i++) {
            if (list[i].department_name === event.target.value) {
                setDepartment(list[i].department_id);
            }
        }
    };

    const handleReset = () => {
        setCountry(updateCountry.in_country_name);
    };

    return (
        <>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setError('');
                    setUpdate(false);
                }}
                onBackdropClick={() => {
                    setError('');
                    setUpdate(false);
                }}
                onEscapeKeyDown={() => {
                    setError('');
                    setUpdate(false);
                }}
            >
                {/* <form onSubmit={departmentHandler}>
                 */}
                <form>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Department
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
                                setError('');
                                setUpdate(false);
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Department"
                                onChange={selectDepartmentHandler}
                                defaultValue={updateDetail.in_department_name}
                                style={{ fontSize: '10px' }}
                            >
                                {showDepartment &&
                                    list.map((name) => (
                                        <MenuItem
                                            className="menu-item"
                                            value={name.department_name}
                                            style={{ fontSize: '10px', height: '1.1rem' }}
                                        >
                                            {name.department_name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.7rem' }}>
                        <Button variant="contained" size="small" color="primary" type="submit" onClick={departmentHandler}>
                            Submit
                        </Button>
                        <Button variant="contained" size="small" color="error" onClick={() => console.log(list)}>
                            Reset
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {error && (
                <Box sx={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2222 }}>
                    <Alert
                        severity="error"
                        sx={{
                            backgroundColor: 'lightred',
                            color: 'red'
                        }}
                        onClose={() => {
                            setError('');
                        }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default UpdatePatientDepartment;
