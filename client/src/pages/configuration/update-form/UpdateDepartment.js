// /* eslint-disable */
// import React, { useEffect, useRef, useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// // import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import { Switch } from '@mui/material';
// import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

// const styles = {
//     input: {
//         marginBottom: '1.5rem',
//         width: '100%',
//         height: '1.8rem'
//     },
//     select: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'start',
//         height: 'auto',
//         marginTop: '0.5rem'
//     }
// };

// // if (sessionStorage.getItem('user')) {
// //     const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// // }
// // const { user_info } = JSON.parse(sessionStorage.getItem('user'));

// const UpdateDepartment = ({ updateDepartmentHandler, setUpdate, error, setError, updateDepartment }) => {
//     const { user_info } = JSON.parse(sessionStorage.getItem('user'));
//     const [department, setDepartment] = useState(updateDepartment.in_department_name);
//     const [description, setDescription] = useState(updateDepartment.in_department_decs);
//     const [active, setActive] = useState(updateDepartment.in_active);

//     useEffect(() => {
//         if (error !== '') {
//             setTimeout(() => {
//                 setError('');
//             }, 2000);
//         }
//     }, [error]);

//     const storeDepartment = (event) => {
//         setDepartment(event.target.value);
//     };

//     const storeDescription = (event) => {
//         setDescription(event.target.value);
//     };

//     const activeHandler = (event) => {
//         setActive(event.target.checked === true ? 1 : 0);
//     };

//     const handleReset = () => {
//         setDescription(updateDepartment.in_department_name);
//         setDepartment(updateDepartment.in_department_decs);
//         setActive(updateDepartment.in_active);
//     };

//     const departmentHandler = (event) => {
//         event.preventDefault();
//         const data = {
//             in_department_name: department,
//             in_department_decs: description,
//             in_institute_id: updateDepartment.in_institute_id,
//             in_center_id: updateDepartment.in_center_id,
//             // in_center_id: center,
//             in_created_by: user_info.out_userid,
//             in_active: active
//         };
//         updateDepartmentHandler(data);
//     };

//     return (
//         <>
//             <Dialog
//                 open={open}
//                 maxWidth="xs"
//                 fullWidth
//                 onClose={() => {
//                     setError('');
//                     setUpdate(false);
//                 }}
//                 onBackdropClick={() => {
//                     setError('');
//                     setUpdate(false);
//                 }}
//                 onEscapeKeyDown={() => {
//                     setError('');
//                     setUpdate(false);
//                 }}
//             >
//                 <form onSubmit={departmentHandler}>
//                     <DialogTitle
//                         sx={{
//                             fontWeight: '900',
//                             p: '5px',
//                             backgroundColor: '#ECF2FF'
//                         }}
//                     >
//                         Department
//                     </DialogTitle>
//                     <Box
//                         sx={{
//                             position: 'absolute',
//                             top: '0',
//                             right: '0'
//                         }}
//                     >
//                         <IconButton
//                             onClick={() => {
//                                 setError('');
//                                 setUpdate(false);
//                             }}
//                         >
//                             <CancelRoundedIcon />
//                         </IconButton>
//                     </Box>

//                     <DialogContent sx={{ height: 'auto' }}>
//                         {/* <FormControl fullWidth style={{ marginBottom: '1rem' }}> */}
//                         <TextField
//                             id="center-name-input"
//                             label="Center Name"
//                             variant="outlined"
//                             sx={styles.input}
//                             value={updateDepartment.in_center_name}
//                             InputProps={{
//                                 style: { fontSize: '10px' }
//                             }}
//                         />

//                         {/* </FormControl> */}

//                         {/* <FormControl fullWidth style={{ marginBottom: '1rem' }}> */}
//                         <TextField
//                             id="institute-name-input"
//                             label="Institute Name"
//                             variant="outlined"
//                             sx={styles.input}
//                             value={user_info.out_institute_name}
//                             InputProps={{
//                                 style: { fontSize: '10px' }
//                             }}
//                         />
//                         {/* </FormControl> */}
//                         {/* <FormControl fullWidth style={{ marginBottom: '1rem' }}> */}
//                         <TextField
//                             id="country-name-input"
//                             label="Department"
//                             variant="outlined"
//                             sx={styles.input}
//                             onChange={storeDepartment}
//                             value={department}
//                             InputProps={{
//                                 style: { fontSize: '10px' }
//                             }}
//                         />
//                         {/* </FormControl> */}
//                         {/* <FormControl fullWidth style={{ marginBottom: 0 }}> */}
//                         <TextField
//                             id="country-name-input"
//                             label="Description"
//                             variant="outlined"
//                             sx={styles.input}
//                             onChange={storeDescription}
//                             value={description}
//                             InputProps={{
//                                 style: { fontSize: '10px' }
//                             }}
//                         />
//                         {/* </FormControl> */}

//                         <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem' }}>
//                             <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
//                             <Switch onChange={activeHandler} defaultChecked={updateDepartment.in_active} />
//                         </Box>
//                     </DialogContent>

//                     <DialogActions sx={{ width: '96%', height: 'auto', mt: '-2.5rem' }}>
//                         <Button variant="contained" size="small" color="primary" type="submit">
//                             Submit
//                         </Button>
//                         <Button variant="contained" size="small" color="error" onClick={handleReset}>
//                             Reset
//                         </Button>
//                     </DialogActions>
//                 </form>
//             </Dialog>
//             {error && (
//                 <Box sx={{ position: 'absolute', left: 0, bottom: 0, zIndex: 2222 }}>
//                     <Alert
//                         severity="error"
//                         onClose={() => {
//                             setError('');
//                         }}
//                     >
//                         {error}
//                     </Alert>
//                 </Box>
//             )}
//         </>
//     );
// };

// export default UpdateDepartment;

/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Close } from '../../../../node_modules/@mui/icons-material/index.js';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Switch } from '@mui/material';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const styles = {
    input: {
        marginBottom: '1.5rem',
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

// if (sessionStorage.getItem('user')) {
//     var { user_info } = JSON.parse(sessionStorage.getItem('user'));
// }
// const { user_info } = JSON.parse(sessionStorage.getItem('user'));
if (sessionStorage.getItem('user')) {
    // var { user_info } = JSON.parse(sessionStorage.getItem('user'));
    var { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
}

const UpdateDepartment = ({ updateDepartmentHandler, setUpdate, error, setError, updateDepartment }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const [department, setDepartment] = useState(updateDepartment.in_department_name);
    const [description, setDescription] = useState(updateDepartment.in_department_decs);
    const [active, setActive] = useState(updateDepartment.in_active);
    const [fixedCenter, setFixedCenter] = useState(true);
    const [center, setCenter] = useState(updateDepartment.in_center_id);
    const [centerName, setCenterName] = useState(updateDepartment.in_center_name);
    const [list, setList] = useState({ center: [] });

    const stopRender = useRef(false);
    if (user_info.out_center_id === null && !stopRender.current) {
        stopRender.current = true;
        setFixedCenter(false);
    }

    useEffect(() => {
        const fetchList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id };
                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.centerList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data

                let center = [];
                for (let i = 0; i < Object.values(data.centerList).length; i++) {
                    center.push({ id: data.centerList[i].center_id, name: data.centerList[i].center_name });
                }

                setList(() => {
                    return { center: center };
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchList();
    }, []);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const storeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    const storeDescription = (event) => {
        setDescription(event.target.value);
    };

    const selectCenterHandler = (event) => {
        for (let i = 0; i < Object.values(list.center).length; i++) {
            if (list.center[i].name === event.target.value) {
                setCenterName(list.center[i].name);
                setCenter(list.center[i].id);
                break;
            }
        }
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    const handleReset = () => {
        setDescription(updateDepartment.in_department_decs);
        setDepartment(updateDepartment.in_department_name);
        setActive(updateDepartment.in_active);
    };

    const departmentHandler = (event) => {
        event.preventDefault();
        const data = {
            in_department_name: department,
            in_department_decs: description,
            // in_institute_id: updateDepartment.in_institute_id,
            in_institute_id: user_info.out_institute_id,
            // in_center_id: updateDepartment.in_center_id,
            in_center_id: center,
            in_created_by: user_info.out_userid,
            in_active: active
        };
        updateDepartmentHandler(data);
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
                <form onSubmit={departmentHandler}>
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
                            <CancelRoundedIcon />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        {/* </FormControl> */}

                        {/* <FormControl fullWidth style={{ marginBottom: '1rem' }}> */}
                        <TextField
                            id="institute-name-input"
                            label="Institute Name"
                            variant="outlined"
                            sx={styles.input}
                            value={user_info.out_institute_name}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />

                        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                            {/* <FormControl fullWidth style={{ marginBottom: '0.5rem' }}> */}
                            <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={centerName}
                                label="Center"
                                onChange={fixedCenter ? null : selectCenterHandler}
                                disabled={fixedCenter}
                                style={{ fontSize: '10px' }}
                            >
                                {list.center.map((name) => (
                                    <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                        {name.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* </FormControl> */}
                        {/* <FormControl fullWidth style={{ marginBottom: '1rem' }}> */}
                        <TextField
                            id="country-name-input"
                            label="Department"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeDepartment}
                            value={department}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                        {/* </FormControl> */}
                        {/* <FormControl fullWidth style={{ marginBottom: 0 }}> */}
                        <TextField
                            id="country-name-input"
                            label="Description"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeDescription}
                            value={description}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                        {/* </FormControl> */}

                        <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem', mt: '-2rem' }}>
                            <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                            <Switch onChange={activeHandler} defaultChecked={updateDepartment.in_active} />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-2.5rem' }}>
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

export default UpdateDepartment;
