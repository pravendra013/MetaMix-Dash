// import React, { useEffect, useRef, useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Switch from '@mui/material/Switch';
// import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import * as api from '../../api/index.js';
// import * as crypt from '../../utils/crypto.js';
// import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

// const styles = {
//     input: {
//         marginBottom: '1.3rem',
//         // marginTop: '0.5rem',
//         width: '100%',
//         height: '1.8rem'
//     },
//     select: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'start',
//         height: 'auto',
//         marginTop: '0.7rem'
//     }
// };
// // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// if (sessionStorage.getItem('user')) {
//     var { user_info } = JSON.parse(sessionStorage.getItem('user'));
// }

// const ProfileView = ({ updateDoctorHandler, setUpdate, error, setError, updateDoctor }) => {
//     const [doctor, setDoctor] = useState(updateDoctor.in_user_name);
//     const [contact, setContact] = useState(updateDoctor.in_user_mobile);
//     const [email, setEmail] = useState(updateDoctor.in_user_email);
//     const [address, setAddress] = useState(updateDoctor.in_user_address);
//     const [center, setCenter] = useState(updateDoctor.in_center_id);
//     const [designation, setDesignation] = useState(updateDoctor.in_user_type);
//     const [department, setDepartment] = useState(updateDoctor.in_department_id);
//     const [country, setCountry] = useState(updateDoctor.in_country_id);
//     const [state, setState] = useState(updateDoctor.in_state_id);
//     const [city, setCity] = useState(updateDoctor.in_city_id);

//     const [countryList, setCountryList] = useState({ country: [] });
//     const [stateList, setStateList] = useState({ state: [] });
//     const [cityList, setCityList] = useState({ city: [] });
//     const [centerlist, setCenterList] = useState({ center: [] });
//     const [departmentlist, setDepartmentList] = useState({ department: [] });
//     const [designationlist, setDesignationlist] = useState({ designation: [] });

//     const [showCityList, setShowCityList] = useState();
//     const [showCountryList, setShowCountryList] = useState();
//     const [showStateList, setShowStateList] = useState();
//     const [showDepartment, setShowDepartment] = useState(false);
//     const [showCenterList, setShowCenterList] = useState();

//     // const [getCountryList, setGetCountryList] = useState(true);
//     const [getStateList, setGetStateList] = useState(false);
//     const [getCenterList, setGetCenterList] = useState(false);
//     const [getCityList, setGetCityList] = useState(false);
//     const [getDepartmentList, setGetDepartmentList] = useState(false);
//     const [getDesignationList, setGetDesignationList] = useState(false);

//     const [fixedCenter, setFixedCenter] = useState(true);

//     const [centerName, setCenterName] = useState(updateDoctor.in_center_name);

//     const [active, setActive] = useState(updateDoctor.in_active);

//     const initialRender = useRef(0);

//     const stopRender = useRef(false);
//     if (user_info.out_center_id === null && !stopRender.current) {
//         stopRender.current = true;
//         setFixedCenter(false);
//     }

//     useEffect(() => {
//         const fetchList = async () => {
//             try {
//                 const { data: encryptedCountryList } = await api.countryGet();

//                 const list = crypt.decryptData(encryptedCountryList); //Decryption of Data

//                 let country = [];
//                 for (let i = 0; i < Object.values(list.country).length; i++) {
//                     country.push({ id: list.country[i].country_id, name: list.country[i].country_name });
//                 }

//                 setCountryList(() => {
//                     return { country: country };
//                 });
//                 setShowCountryList(true);
//                 // setGetCountryList(false);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         const fetchStateList = async () => {
//             try {
//                 console.log(country);
//                 const { data: encryptedCountryList } = await api.stateGet({ in_country_id: country });

//                 const list = crypt.decryptData(encryptedCountryList); //Decryption of Data

//                 let state = [];
//                 for (let i = 0; i < Object.values(list.state).length; i++) {
//                     if (list.state[i].country_id === country) state.push({ id: list.state[i].state_id, name: list.state[i].state_name });
//                 }
//                 console.log(state);
//                 setStateList(() => {
//                     return { state: state };
//                 });
//                 setShowStateList(true);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         const fetchCityList = async () => {
//             try {
//                 const { data: encryptedCountryList } = await api.cityGet(state);

//                 const list = crypt.decryptData(encryptedCountryList); //Decryption of Data
//                 console.log(list);
//                 let city = [];
//                 for (let i = 0; i < Object.values(list.city).length; i++) {
//                     if (list.city[i].state_id === state) city.push({ id: list.city[i].city_id, name: list.city[i].city_name });
//                 }
//                 console.log(city);

//                 setCityList(() => {
//                     return { city: city };
//                 });
//                 setShowCityList(true);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         console.log('running', initialRender.current);
//         if (initialRender.current === 0) {
//             fetchList();
//             fetchStateList();
//             fetchCityList();
//             initialRender.current++;
//         }
//     }, []);

//     useEffect(() => {
//         const fetchStateList = async () => {
//             try {
//                 console.log(country);
//                 const { data: encryptedCountryList } = await api.stateGet({ in_country_id: country });

//                 const list = crypt.decryptData(encryptedCountryList); //Decryption of Data

//                 let state = [];
//                 for (let i = 0; i < Object.values(list.state).length; i++) {
//                     if (list.state[i].country_id === country) state.push({ id: list.state[i].state_id, name: list.state[i].state_name });
//                 }
//                 console.log(state);
//                 setStateList(() => {
//                     return { state: state };
//                 });
//                 setShowStateList(true);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         if (initialRender.current !== 0) {
//             fetchStateList();
//         }
//     }, [getStateList]);

//     useEffect(() => {
//         const fetchCityList = async () => {
//             try {
//                 const { data: encryptedCountryList } = await api.cityGet(state);

//                 const list = crypt.decryptData(encryptedCountryList); //Decryption of Data
//                 console.log(list);
//                 let city = [];
//                 for (let i = 0; i < Object.values(list.city).length; i++) {
//                     if (list.city[i].state_id === state) city.push({ id: list.city[i].city_id, name: list.city[i].city_name });
//                 }
//                 console.log(city);

//                 setCityList(() => {
//                     return { city: city };
//                 });
//                 setShowCityList(true);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         if (initialRender.current !== 0) {
//             fetchCityList();
//         }
//     }, [getCityList]);

//     // center
//     useEffect(() => {
//         const fetchCenterList = async () => {
//             try {
//                 const institute = { in_institute_id: user_info.out_institute_id };
//                 const encryptedData = crypt.encryptData(institute);
//                 const { data: decryptedData } = await api.centerGet({ data: encryptedData });
//                 const data = crypt.decryptData(decryptedData);

//                 console.log(data);

//                 let center = [];
//                 for (let i = 0; i < Object.values(data.center).length; i++) {
//                     center.push({ id: data.center[i].center_id, name: data.center[i].center_name });
//                 }

//                 setCenterList(() => {
//                     return { center: center };
//                 });
//                 setShowCenterList(true);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         if (initialRender.current !== 0) {
//             fetchCenterList();
//         }
//     }, [getCenterList]);

//     //designation
//     useEffect(() => {
//         const fetchDesignationList = async () => {
//             try {
//                 const institute = { in_institute_id: user_info.out_institute_id, in_center_id: user_info.out_center_id };
//                 const encryptedData = crypt.encryptData(institute);
//                 const { data: decryptedData } = await api.userTypeGet({ data: encryptedData });
//                 const data = crypt.decryptData(decryptedData);
//                 console.log('design data');
//                 console.log(data);

//                 let designation = [];
//                 for (let i = 0; i < Object.values(data.userType).length; i++) {
//                     designation.push({ id: data.userType[i].user_type, name: data.userType[i].user_type_name });
//                 }

//                 setDesignationlist(() => {
//                     return { designation: designation };
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchDesignationList();
//     }, []);

//     // department
//     useEffect(() => {
//         const fetchDepartmentList = async () => {
//             try {
//                 console.log('DEPARTMENT');

//                 const institute = { in_institute_id: user_info.out_institute_id, in_center_id: center };

//                 const encryptedData = crypt.encryptData(institute);
//                 const { data: decryptedData } = await api.departmentGet({ data: encryptedData });

//                 const data = crypt.decryptData(decryptedData);

//                 console.log(data);

//                 let department = [];
//                 for (let i = 0; i < Object.values(data.centerDepartment).length; i++) {
//                     // if (data.department[i].center_name === center) {
//                     department.push({ id: data.centerDepartment[i].department_id, name: data.centerDepartment[i].department_name });
//                 }
//                 // }
//                 console.log('department');
//                 console.log(department);
//                 setDepartmentList(() => {
//                     return { department: department };
//                 });
//                 setShowDepartment(true);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         if (initialRender.current !== 0) {
//             fetchDepartmentList();
//         }
//     }, [getDepartmentList]);

//     useEffect(() => {
//         if (error !== '') {
//             setTimeout(() => {
//                 setError('');
//             }, 2000);
//         }
//     }, [error]);

//     useEffect(() => {
//         if (error !== '') {
//             setTimeout(() => {
//                 setError('');
//             }, 2000);
//         }
//     }, [error]);

//     const storeDoctor = (event) => {
//         setDoctor(event.target.value);
//     };
//     const storeContact = (event) => {
//         setContact(event.target.value);
//     };
//     const storeEmail = (event) => {
//         setEmail(event.target.value);
//     };
//     const storeAddress = (event) => {
//         setAddress(event.target.value);
//     };

//     const selectCenterHandler = (event) => {
//         for (let i = 0; i < Object.values(centerlist.center).length; i++) {
//             if (centerlist.center[i].name === event.target.value) {
//                 setCenter(centerlist.center[i].id);
//                 setCenterName(centerlist.center[i].name);
//                 console.log('getting center');
//                 console.log(centerlist);
//                 console.log(centerlist.center[0].id);
//                 // setGetDepartmentList(true);
//                 break;
//             }
//         }
//         setGetDepartmentList((state) => !state);
//     };

//     const selectCityHandler = (event) => {
//         for (let i = 0; i < Object.values(cityList.city).length; i++) {
//             if (cityList.city[i].name === event.target.value) {
//                 setCity(cityList.city[i].id);
//                 break;
//             }
//         }
//     };

//     const selectDepartmentHandler = (event) => {
//         for (let i = 0; i < Object.values(departmentlist.department).length; i++) {
//             if (departmentlist.department[i].name === event.target.value) {
//                 console.log('function cehck');
//                 console.log(departmentlist);
//                 setDepartment(departmentlist.department[i].id);
//                 break;
//             }
//         }
//         setGetDesignationList((state) => !state);
//     };

//     const selectDesignationHandler = (event) => {
//         for (let i = 0; i < Object.values(designationlist.designation).length; i++) {
//             if (designationlist.designation[i].name === event.target.value) {
//                 console.log('function cehck');
//                 console.log(designationlist);
//                 setDesignation(designationlist.designation[i].id);
//                 break;
//             }
//         }
//     };

//     const selectCountryHandler = (event) => {
//         for (let i = 0; i < Object.values(countryList.country).length; i++) {
//             if (countryList.country[i].name === event.target.value) {
//                 setCountry(countryList.country[i].id);
//                 break;
//             }
//         }
//         setGetStateList((state) => !state);
//     };

//     const selectStateHandler = (event) => {
//         for (let i = 0; i < Object.values(stateList.state).length; i++) {
//             if (stateList.state[i].name === event.target.value) {
//                 setState(stateList.state[i].id);
//                 break;
//             }
//         }

//         setGetCityList((state) => !state);
//     };

//     const handleReset = () => {
//         setCity(updateDoctor.in_city_name);
//         setState(updateDoctor.in_state_name);
//         setCountry(updateDoctor.in_country_name);
//         setEmail(updateDoctor.in_user_email);
//         setAddress(updateDoctor.in_user_address);
//         setDoctor(updateDoctor.in_user_name);
//         setContact(updateDoctor.in_user_mobile);
//         setCenter(updateDoctor.in_center_name);
//         setDesignation(updateDoctor.in_user_type_name);
//         setDepartment(updateDoctor.in_department_name);
//     };

//     const doctorHandler = (event) => {
//         event.preventDefault();
//         const data = {
//             in_institute_id: user_info.out_institute_id,
//             in_user_name: doctor,
//             in_user_email: email,
//             in_user_address: address,
//             in_user_mobile: contact,
//             in_center_id: center,
//             in_center_name: updateDoctor.in_center_name,
//             in_department_id: department,
//             in_department_name: updateDoctor.in_department_name,
//             in_user_id: updateDoctor.in_user_id,
//             in_user_type: designation,
//             in_user_group_id: user_info.out_user_group_id,
//             in_country_id: country,
//             in_state_id: state,
//             in_city_id: city,
//             in_created_by: user_info.out_userid,
//             in_is_doctor: 0,
//             in_active: active
//         };
//         updateDoctorHandler(data);
//         console.log(data);
//     };

//     const activeHandler = (event) => {
//         setActive(event.target.checked === true ? 1 : 0);
//     };

//     return (
//         <>
//             <Box
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
//                 <form onSubmit={doctorHandler}>
//                     <Box
//                         sx={{
//                             fontWeight: '900',
//                             p: '5px',
//                             backgroundColor: '#ECF2FF'
//                         }}
//                     >
//                         User
//                     </Box>
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

//                     <Box sx={{ height: 'auto' }}>
//                         <Box sx={styles.select}>
//                             <Box sx={{ display: 'flex', gap: '1rem' }}>
//                                 <TextField
//                                     id="user-name-input"
//                                     label="Doctor Name"
//                                     variant="outlined"
//                                     sx={styles.input}
//                                     onChange={storeDoctor}
//                                     defaultValue={updateDoctor.in_user_name}
//                                     InputProps={{
//                                         style: { color: 'black', fontSize: '10px' }
//                                     }}
//                                 />
//                                 <TextField
//                                     id="country-name-input"
//                                     label="contact No"
//                                     variant="outlined"
//                                     sx={styles.input}
//                                     onChange={storeContact}
//                                     defaultValue={updateDoctor.in_user_mobile}
//                                     InputProps={{
//                                         style: { color: 'black', fontSize: '10px' }
//                                     }}
//                                 />
//                             </Box>
//                             <Box sx={{ display: 'flex', gap: '1rem', mb: '1rem' }}>
//                                 <TextField
//                                     id="country-name-input"
//                                     label="Email"
//                                     variant="outlined"
//                                     sx={styles.input}
//                                     onChange={storeEmail}
//                                     defaultValue={updateDoctor.in_user_email}
//                                     InputProps={{
//                                         style: { color: 'black', fontSize: '10px' }
//                                     }}
//                                 />
//                                 <TextField
//                                     id="country-name-input"
//                                     label="Address"
//                                     variant="outlined"
//                                     sx={styles.input}
//                                     onChange={storeAddress}
//                                     defaultValue={updateDoctor.in_user_address}
//                                     InputProps={{
//                                         style: { color: 'black', fontSize: '10px' }
//                                     }}
//                                 />
//                             </Box>
//                             <Box sx={{ display: 'flex', gap: '1rem', marginTop: '-1rem', marginBottom: '0.5rem' }}>
//                                 <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
//                                     <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         displayEmpty
//                                         defaultValue={updateDoctor.in_country_name}
//                                         label="Age"
//                                         onChange={selectCountryHandler}
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         <MenuItem value>{updateDoctor.in_country_name}</MenuItem>
//                                         {showCountryList &&
//                                             countryList &&
//                                             countryList.country.map((name) => (
//                                                 <MenuItem value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
//                                                     {name.name}
//                                                 </MenuItem>
//                                             ))}
//                                     </Select>
//                                 </FormControl>

//                                 <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
//                                     <InputLabel id="demo-simple-select-label">Select State</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         defaultValue={updateDoctor.in_state_name}
//                                         label="Age"
//                                         displayEmpty
//                                         onChange={selectStateHandler}
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         <MenuItem value>{updateDoctor.in_state_name}</MenuItem>
//                                         {showStateList &&
//                                             stateList &&
//                                             stateList.state.map((name) => (
//                                                 <MenuItem value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
//                                                     {name.name}
//                                                 </MenuItem>
//                                             ))}
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                             <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
//                                 <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
//                                     <InputLabel id="demo-simple-select-label">Select City</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         defaultValue={updateDoctor.in_city_name}
//                                         label="Age"
//                                         onChange={selectCityHandler}
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         {showCityList &&
//                                             cityList &&
//                                             cityList.city.map((name) => (
//                                                 <MenuItem value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
//                                                     {name.name}
//                                                 </MenuItem>
//                                             ))}
//                                     </Select>
//                                 </FormControl>
//                                 {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
//                                     <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         // value={center}
//                                         defaultValue={updateDoctor.in_center_name}
//                                         label="Age"
//                                         onChange={selectCenterHandler}
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         <MenuItem value>{updateDoctor.in_center_name}</MenuItem>
//                                         {showCenterList &&
//                                             centerlist.center.map((name) => (
//                                                 <MenuItem value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
//                                                     {name.name}
//                                                 </MenuItem>
//                                             ))}
//                                     </Select>
//                                 </FormControl> */}
//                                 <FormControl fullWidth style={{ marginBottom: '0.5rem' }}>
//                                     <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         value={centerName}
//                                         label="Center"
//                                         onChange={fixedCenter ? null : selectCenterHandler}
//                                         disabled={fixedCenter}
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         <MenuItem value>{updateDoctor.in_center_name}</MenuItem>
//                                         {showCenterList &&
//                                             centerlist.center.map((name) => (
//                                                 <MenuItem value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
//                                                     {name.name}
//                                                 </MenuItem>
//                                             ))}
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                             <Box sx={{ display: 'flex', gap: '1rem' }}>
//                                 <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
//                                     <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         defaultValue={updateDoctor.in_department_name}
//                                         label="Age"
//                                         onChange={selectDepartmentHandler}
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         {showDepartment &&
//                                             departmentlist.department.map((name) => (
//                                                 <MenuItem value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
//                                                     {name.name}
//                                                 </MenuItem>
//                                             ))}
//                                     </Select>
//                                 </FormControl>

//                                 <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
//                                     <InputLabel id="demo-simple-select-label">Select Designation</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         defaultValue={updateDoctor.in_user_type_name}
//                                         label="Age"
//                                         onChange={selectDesignationHandler}
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         {designationlist.designation.map((name) => (
//                                             <MenuItem value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
//                                                 {name.name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                             <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '1rem', mt: '-0.5rem' }}>
//                                 <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
//                                 {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
//                                 <Switch onChange={activeHandler} defaultChecked={updateDoctor.in_active} />
//                             </Box>
//                         </Box>
//                     </Box>

//                     <Box sx={{ width: '96%', height: 'auto', mt: '-2rem' }}>
//                         <Button variant="contained" size="small" color="primary" type="submit">
//                             Submit
//                         </Button>
//                         <Button variant="contained" size="small" color="error" onClick={handleReset}>
//                             Reset
//                         </Button>
//                     </Box>
//                 </form>
//             </Box>
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

// export default ProfileView;
