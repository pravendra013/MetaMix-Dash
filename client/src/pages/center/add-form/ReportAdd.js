/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import * as api from '../../../api/index.js';
import axios from 'axios';
import * as crypt from '../../../utils/crypto.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
// import { MenuItemUnstyled } from '../../../../../../../AppData/Local/Microsoft/TypeScript/4.9/node_modules/@mui/base/index.js';

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

const ReportAdd = ({ addReportHandler, setAdd, error, setError, updatePatient }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const [department, setDepartment] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [showList, setShowList] = useState();
    const [getDepartmentList, setGetDepartmentList] = useState();

    const [doctor, setDoctor] = useState();
    const [doctorList, setDoctorList] = useState();
    const [showDoctorList, setShowDoctorList] = useState();
    const [getDoctorList, setGetDoctorList] = useState();
    const [flag, setFlag] = useState(false);

    const [center, setCenter] = useState();
    const [centerList, setCenterList] = useState();
    const [showCenterList, setShowCenterList] = useState();

    const [documentType, setDocumentType] = useState();
    const [documentTypeName, setDocumentTypeName] = useState();
    const [documentTypeList, setDocumentTypeList] = useState();
    const [showDocumentTypeList, setShowDocumentTypeList] = useState();

    const [file, setFile] = useState();

    const [dimHeight, setDimHeight] = useState('');
    const [dimWidth, setDimWidth] = useState();
    const [dimLength, setDimLength] = useState();

    const [spacingHeight, setSpacingHeight] = useState('');
    const [spacingWidth, setSpacingWidth] = useState();
    const [spacingLength, setSpacingLength] = useState();

    const [isRaw, setIsRaw] = useState();
    const [showSelectFile, setShowSelectFile] = useState();

    const [description, setDescription] = useState('');

    const render = useRef(0);

    useEffect(() => {
        const fetchCenterList = async () => {
            try {
                const institute = { in_institute_id: updatePatient.in_institute_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.centerGet({ data: encryptedData });
                const data = crypt.decryptData(decryptedData);

                console.log(data);

                let row = [];
                for (let i = 0; i < Object.values(data.center).length; i++) {
                    row.push({ id: data.center[i].center_id, name: data.center[i].center_name });
                }

                setCenterList(row);
                setShowCenterList(true);
                // setGetCenterList(false);
            } catch (error) {
                console.log(crypt.decryptData(error));
            }
        };

        //Department List
        const fetchDepartmentList = async () => {
            try {
                const institute = { in_institute_id: updatePatient.in_institute_id, in_center_id: center };
                console.log('DEpartment List..', institute);
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.departmentList({ data: encryptedData });

                // const detail = { in_patient_id: updatePatient.in_patient_id };
                // const encryptedData = crypt.encryptData(institute);
                // const { data: decryptedData } = await api.departmentList({ data: encryptedData });

                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.centerDepartmentList).length; i++) {
                    const n = {
                        id: data.centerDepartmentList[i].department_id,
                        name: data.centerDepartmentList[i].department_name
                    };
                    row.push(n);
                }

                // for (let i = 0; i < Object.values(data.patientDepartmentMapping).length; i++) {
                //     const n = {
                //         id: data.patientDepartmentMapping[i].department_id,
                //         name: data.patientDepartmentMapping[i].department_name
                //     };
                //     row.push(n);
                // }
                setDepartmentList(row);
                setShowList(true);
            } catch (error) {
                console.log(crypt.decryptData(error.response.data));
            }
        };

        //DocumentType List
        const fetchDocumentTypeList = async () => {
            console.log('Document ', render.current);
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id, in_is_doctor: 1 };
                console.log(institute);
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.reportDocumentTypeList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.reportDocumentTypeList).length; i++) {
                    const n = {
                        id: data.reportDocumentTypeList[i].document_type_id,
                        name: data.reportDocumentTypeList[i].document_type_name
                    };
                    row.push(n);
                }
                setDocumentTypeList(row);
                setShowDocumentTypeList(true);
            } catch (error) {
                console.log(crypt.decryptData(error.response.data));
            }
        };

        if (render.current === 0) {
            fetchCenterList();
            // fetchDepartmentList();
            fetchDocumentTypeList();
            render.current = 1;
        } else if (render.current == 1) {
            console.log(render.current);
            render.current = 2;
        } else if (render.current == 2) {
            console.log(render.current);
            fetchDepartmentList();
        }
    }, [getDepartmentList]);

    useEffect(() => {
        const fetchDoctorList = async () => {
            console.log('Doctor ', render.current);
            try {
                const institute = {
                    in_institute_id: updatePatient.in_institute_id,
                    in_center_id: center,
                    in_is_doctor: 1,
                    in_department_id: department
                };

                console.log(institute);
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.userList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];

                for (let i = 0; i < Object.values(data.userList).length; i++) {
                    const n = {
                        id: data.userList[i].user_id,
                        name: data.userList[i].user_name
                    };
                    row.push(n);
                }
                setDoctorList(row);
                setShowDoctorList(true);
            } catch (error) {
                setDoctorList([]);
                console.log(crypt.decryptData(error.response.data));
            }
        };

        if (flag) fetchDoctorList();
    }, [getDoctorList]);
    // //Doctor List
    // useEffect(() => {
    //     const fetchDoctorList = async () => {
    //         console.log('Doctor ', render.current);
    //         try {
    //             const institute = {
    //                 in_institute_id: user_info.out_institute_id,
    //                 in_center_id: user_info.out_center_id,
    //                 in_is_doctor: 1,
    //                 in_department_id: department
    //             };

    //             console.log(institute);
    //             const encryptedData = crypt.encryptData(institute);
    //             const { data: decryptedData } = await api.userList({ data: encryptedData });
    //             const data = crypt.decryptData(decryptedData); //Decryption of Data
    //             console.log(data);
    //             let row = [];

    //             for (let i = 0; i < Object.values(data.userList).length; i++) {
    //                 const n = {
    //                     id: data.userList[i].user_id,
    //                     name: data.userList[i].user_name
    //                 };
    //                 row.push(n);
    //             }
    //             setDoctorList(row);
    //             setShowDoctorList(true);
    //         } catch (error) {
    //             console.log(crypt.decryptData(error.response.data));
    //         }
    //     };

    //     if (render.current === 1) fetchDoctorList();
    // }, [getDoctorList]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeReportDescription = (event) => {
        setDescription(event.target.value);
    };

    const selectCenterHandler = (event) => {
        for (let i = 0; i < Object.values(centerList).length; i++) {
            if (centerList[i].name === event.target.value) {
                setCenter(centerList[i].id);
                break;
            }
        }
        setDoctorList([]);
        setGetDepartmentList((state) => !state);
    };

    const selectDepartmentHandler = (event) => {
        for (let i = 0; i < Object.values(departmentList).length; i++) {
            if (departmentList[i].name === event.target.value) {
                setDepartment(departmentList[i].id);
                break;
            }
        }
        setFlag(true);
        setGetDoctorList((state) => !state);
    };

    const selectDoctorHandler = (event) => {
        for (let i = 0; i < Object.values(doctorList).length; i++) {
            if (doctorList[i].name === event.target.value) {
                setDoctor(doctorList[i].id);
                break;
            }
        }
    };

    const selectDocumentTypeHandler = (event) => {
        //Getting document type ID
        for (let i = 0; i < Object.values(documentTypeList).length; i++) {
            if (documentTypeList[i].name === event.target.value) {
                setDocumentType(documentTypeList[i].id);
                setDocumentTypeName(event.target.value);
                break;
            }
        }

        //Deciding Uploading Option
        if (event.target.value === 'RAW') setIsRaw(true);
        else setIsRaw(false);

        setShowSelectFile(true);
    };

    const selectedFileHandler = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    };

    const storeDimHeight = (event) => {
        setDimHeight(event.target.value);
    };

    const storeDimWidth = (event) => {
        setDimWidth(event.target.value);
    };

    const storeDimLength = (event) => {
        setDimLength(event.target.value);
    };

    const storeSpacingHeight = (event) => {
        setSpacingHeight(event.target.value);
    };

    const storeSpacingWidth = (event) => {
        setSpacingWidth(event.target.value);
    };

    const storeSpacingLength = (event) => {
        setSpacingLength(event.target.value);
    };

    const reportHandler = async (event) => {
        event.preventDefault();

        // let data = {
        // in_department_id: department,
        // in_document_type_id: documentType,
        // in_report_desc: description,
        // in_user_id: doctor
        // };

        // data.append()

        let data = new FormData();

        if (documentTypeName === 'MR' || documentTypeName === 'CT' || documentTypeName === 'PAT CT') {
            let dicomResponse = await axios.post('http://metamix.tech:8042/instances', file, {
                headers: {
                    'Content-Type':
                        file.name.includes('.zip') && file.name.split('.zip')[file.name.split('.zip').length - 1].length < 1
                            ? 'application/zip'
                            : 'application/octet-stream'
                }
            });

            let studyResponse = await axios.get(
                `http://metamix.tech:8042/studies/${dicomResponse.data[0].ParentStudy}`
                // {
                //   headers: {
                //     "Content-Type": "application/x-www-form-urlencoded",
                //   },
                // }
            );

            const details = {
                studyId: studyResponse.data.ID,
                instanceUID: studyResponse?.data?.MainDicomTags?.StudyInstanceUID
            };

            const d = crypt.encryptData(
                JSON.stringify({
                    in_department_id: department,
                    in_document_type_id: documentType,
                    in_report_desc: description,
                    in_user_id: doctor,
                    in_pacs_path: details,
                    in_raw_dim_size: '0 0 0',
                    in_element_spacing: '0 0 0',
                    in_patient_id: updatePatient.in_patient_id,
                    in_created_by: user_info.out_userid
                })
            );
            addReportHandler({ data: d }, 'application/json');
        } else if (documentTypeName === 'RAW') {
            const encryptedData = crypt.encryptData(
                JSON.stringify({
                    in_department_id: department,
                    in_document_type_id: documentType,
                    in_report_desc: description,
                    in_user_id: doctor,
                    in_pacs_path: file,
                    in_raw_dim_size: `${dimLength} ${dimWidth} ${dimHeight}`,
                    in_element_spacing: `${spacingLength} ${spacingWidth} ${spacingHeight}`,
                    in_patient_id: updatePatient.in_patient_id,
                    in_created_by: user_info.out_userid
                })
            );
            data.append('data', encryptedData);
            data.append('file', file);
            addReportHandler(data, 'multipart/form-data');
        } else {
            const encryptedData = crypt.encryptData(
                JSON.stringify({
                    in_department_id: department,
                    in_document_type_id: documentType,
                    in_report_desc: description,
                    in_user_id: doctor,
                    in_pacs_path: file,
                    in_raw_dim_size: '0 0 0',
                    in_element_spacing: '0 0 0',
                    in_patient_id: updatePatient.in_patient_id,
                    in_created_by: user_info.out_userid
                })
            );
            data.append('data', encryptedData);
            data.append('file', file);
            console.log('foem data is ....', data);
            for (var key of data.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            // data = { ...data, in_pacs_path: file, in_raw_dim_size: '0 0 0', in_element_spacing: '0 0 0' };
            // const encryptedData = crypt.encryptData(data);
            addReportHandler(data, 'multipart/form-data');
        }

        // console.log(data);
    };

    const handleReset = () => {
        // setCountry('');
    };

    return (
        <>
            <Dialog
                open={true}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setError('');
                    setAdd(false);
                }}
                onBackdropClick={() => {
                    setError('');
                    setAdd(false);
                }}
                onEscapeKeyDown={() => {
                    setError('');
                    setAdd(false);
                }}
            >
                <form onSubmit={reportHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Report
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
                                setAdd(false);
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Center"
                                style={{ fontSize: '10px' }}
                                onChange={selectCenterHandler}
                            >
                                {showCenterList && centerList && centerList.length != 0 ? (
                                    centerList.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Country"
                                style={{ fontSize: '10px' }}
                                onChange={selectDepartmentHandler}
                            >
                                {showList && departmentList && departmentList.length != 0 ? (
                                    departmentList.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select Center</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Country"
                                style={{ fontSize: '10px' }}
                                onChange={selectDoctorHandler}
                            >
                                {showDoctorList && doctorList && doctorList.length != 0 ? (
                                    doctorList.map((name) => (
                                        <MenuItem value={name.name} className="menu-item" style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem style={{ fontSize: '10px', height: '1.1rem' }}>Select Department</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Report Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Country"
                                style={{ fontSize: '10px' }}
                                onChange={selectDocumentTypeHandler}
                            >
                                {showDocumentTypeList &&
                                    documentTypeList.map((name) => (
                                        <MenuItem value={name.name} className="menu-item" style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            {/* <input type='"text' onChange={storeReportDescription} value={description} />*/}
                            <TextField
                                id="country-name-input"
                                label="Description"
                                variant="outlined"
                                // sx={styles.input}
                                onChange={storeReportDescription}
                                value={description}
                                InputProps={{
                                    style: { fontSize: '10px' }
                                }}
                            />
                        </FormControl>

                        {showSelectFile && !isRaw && (
                            <>
                                <input type="file" style={{ marginBottom: '1rem' }} onChange={selectedFileHandler} />
                            </>
                        )}
                        {showSelectFile && isRaw && (
                            <>
                                <input type="file" style={{ marginBottom: '1rem' }} onChange={selectedFileHandler} />
                                {/* <input type='"text' onChange={storeHeight} value={height} /> */}
                                {/* <input type='"text' onChange={storeWidth} value={width} /> */}
                                {/* <input type='"text' onChange={storeSpacing} value={spacing} /> */}
                                <Box sx={{ display: 'flex', gap: '1rem', mb: '0.7rem', mt: '0.7' }}>
                                    <TextField
                                        id="country-name-input"
                                        label="Dim Length"
                                        variant="outlined"
                                        sx={styles.input}
                                        onChange={storeDimLength}
                                        value={dimLength}
                                        InputProps={{
                                            style: { fontSize: '10px' }
                                        }}
                                    />

                                    <TextField
                                        id="country-name-input"
                                        label="Dim Width"
                                        variant="outlined"
                                        sx={styles.input}
                                        onChange={storeDimWidth}
                                        value={dimWidth}
                                        InputProps={{
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', gap: '1rem', mb: '0.7rem' }}>
                                    <TextField
                                        id="country-name-input"
                                        label="Dim Height"
                                        variant="outlined"
                                        sx={styles.input}
                                        onChange={storeDimHeight}
                                        value={dimHeight}
                                        InputProps={{
                                            style: { fontSize: '10px' }
                                        }}
                                    />

                                    <TextField
                                        id="country-name-input"
                                        label="Spacing Length"
                                        variant="outlined"
                                        sx={styles.input}
                                        onChange={storeSpacingLength}
                                        value={spacingLength}
                                        InputProps={{
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', gap: '1rem' }}>
                                    <TextField
                                        id="country-name-input"
                                        label="Spacing Width"
                                        variant="outlined"
                                        sx={styles.input}
                                        onChange={storeSpacingWidth}
                                        value={spacingWidth}
                                        InputProps={{
                                            style: { fontSize: '10px' }
                                        }}
                                    />

                                    <TextField
                                        id="country-name-input"
                                        label="Spacing Height"
                                        variant="outlined"
                                        sx={styles.input}
                                        onChange={storeSpacingHeight}
                                        value={spacingHeight}
                                        InputProps={{
                                            style: { fontSize: '10px' }
                                        }}
                                    />
                                </Box>
                            </>
                        )}

                        {/* <input type="file" onChange={selectedFileHandler} /> */}

                        {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="report-detail-input"
                                label="Report Description"
                                variant="outlined"
                                sx={styles.input}
                                onChange={storeReportDescription}
                                value={description}
                                // InputProps={{
                                //     style: { fontSize: '10px' }
                                // }}
                            />
                        </FormControl> */}
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.7rem' }}>
                        <Button variant="contained" size="small" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="contained" size="small" color="error" onClick={handleReset}>
                            Reset
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {error && (
                // <Box sx={{ position: 'absolute', top: '0.5rem', width: '30%', left: '45%', transform: 'translate(-15%)', zIndex: 2222 }}>
                <Box sx={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2222 }}>
                    <Alert
                        severity="error"
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

export default ReportAdd;
