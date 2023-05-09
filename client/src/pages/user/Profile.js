// export default Profile;

//  eslint-disable
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import * as crypt from '../../utils/crypto.js';
import * as api from '../../api/index.js';

// import Button from '@mui/material/Button';
import '../configuration/configuration.css';
import { useState, useEffect, useRef } from 'react';
import UpdateProfile from 'pages/updateprofile/UpdateProfile';

const styles = {
    input: {
        marginBottom: '1.5rem',
        width: '100%',
        height: '1.8rem',
        pointerEvents: 'none'
    }
};
// let user = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
// let { user_info, security_option } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
// console.log('user data ');
// console.log(user_info);

const Profile = ({ setDetails }) => {
    let { user_info, security_option } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    const [update, setUpdate] = useState();
    const [error, setError] = useState('');
    // const [update, setUpdate] = useState(false);
    const [updateProfile, setUpdateProfile] = useState();
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    const initialRender = useRef([0, 0, 0, 0, 0]);
    // USER-UPDATE
    useEffect(() => {
        const fetchList = async () => {
            try {
                console.log('update user ');
                const decryptedData = crypt.encryptData(updateProfile);
                await api.userUpdate({ data: decryptedData });
                console.log(user_info);
                user_info = {
                    ...user_info,
                    out_user_mobile: updateProfile.in_user_mobile,
                    out_user_address: updateProfile.in_user_address
                };
                const obj = { security_option: security_option, user_info: user_info };
                console.log(obj);
                const decryptData = crypt.encryptData(obj);
                window.sessionStorage.setItem('user', JSON.stringify(decryptData));

                setUpdate(false);

                // try {
                //     const institute = {
                //         in_institute_id: user_info.out_institute_id,
                //         in_user_id: user_info.out_userid,
                //         in_is_doctor: 0
                //     };

                //     const encryptedData = crypt.encryptData(institute);
                //     const { data: decryptedData } = await api.userGet({ data: encryptedData });
                //     const data = crypt.decryptData(decryptedData); //Decryption of Data
                //     console.log(data);
                //     let row = [];

                //     for (let i = 0; i < Object.values(data.user).length; i++) {
                //         const n = {
                //             id: data.user[i].user_id,
                //             user_id: data.user[i].user_id,
                //             institute_id: data.user[i].institute_id,
                //             center_id: data.user[i].center_id,
                //             center_name: data.user[i].center_name,
                //             department_id: data.user[i].department_id,
                //             department_name: data.user[i].department_name,
                //             city_id: data.user[i].city_id,
                //             city_name: data.user[i].city_name,
                //             country_id: data.user[i].country_id,
                //             country_name: data.user[i].country_name,
                //             state_id: data.user[i].state_id,
                //             state_name: data.user[i].state_name,
                //             user_name: data.user[i].user_name,
                //             user_type_name: data.user[i].user_type_name,
                //             // user_type_id: data.user[i].user_type_id,
                //             user_mobile: data.user[i].user_mobile,
                //             active: data.user[i].active,
                //             created_by: data.user[i].created_by,
                //             user_email: data.user[i].user_email,
                //             user_type: data.user[i].user_type,
                //             user_group_id: data.user[i].user_group_id,
                //             user_address: data.user[i].user_address,
                //             // user_id: data.user[i].user_id,
                //             in_is_doctor: 0
                //             // is_doctor: data.user[i].is_doctor
                //         };
                //         row.push(n);
                //     }
                //     setRows(row);
                //     setError('');
                //     setUpdate(false);
                //     setShowSuccess(true);
                // } catch (error) {
                //     const decryptedData = error.response.data;
                //     const data = crypt.decryptData(decryptedData);
                //     setError(data.message);
                //     // setError('Country already exists.');
                //     setUpdate(true);
                // }
            } catch (error) {
                console.log(error);
                const decryptedData = error.response.data;
                const data = crypt.decryptData(decryptedData);
                setError(data.message);
                // setError('Country already exists.');
                setUpdate(true);
            }
        };
        if (initialRender.current[2] === 0) {
            initialRender.current[2] = 1;
        } else if (initialRender.current[2] === 1) {
            initialRender.current[2] = 2;
            fetchList();
        } else {
            fetchList();
        }
    }, [updateConfirmation]);

    const updateProfileHandler = (data) => {
        console.log('data is ...', data);
        setUpdateProfile((state) => {
            return {
                ...state,
                in_department_name: data.in_department_name,
                in_institute_id: data.in_institute_id,
                in_center_id: data.in_center_id,
                in_center_name: data.in_center_name,
                in_department_id: data.in_department_id,
                in_department_name: data.in_department_name,
                in_city_id: data.in_city_id,
                in_country_id: data.in_country_id,
                in_state_id: data.in_state_id,
                in_city_name: data.in_city_name,
                in_user_name: data.in_user_name,
                in_user_type_name: data.in_user_type_name,
                in_user_id: data.in_user_id,
                in_user_mobile: data.in_user_mobile,
                in_city_name: data.in_city_name,
                in_user_email: data.in_user_email,
                in_active: data.in_active,
                in_created_by: data.in_created_by,
                in_user_type: data.in_user_type,
                in_user_group_id: data.in_user_group_id,
                in_user_address: data.in_user_address,
                in_is_doctor: 0,
                in_active: data.in_active
            };
        });

        setUpdateConfirmation((state) => !state);
    };

    return (
        <>
            {/* <Dialog */}
            {update && (
                <UpdateProfile
                    updateProfileHandler={updateProfileHandler}
                    setUpdate={setUpdate}
                    error={error}
                    setError={setError}
                    updateProfile={updateProfile}
                />
            )}
            <Box
                sx={{ mt: '3rem' }}
                open={open}
                maxWidth="xs"
                fullWidth
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
                    <Box
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Profile Details
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end'
                            // position: 'absolute',
                            // top: '0',
                            // right: '0'
                        }}
                    >
                        <IconButton
                            aria-label="edit"
                            // style={{ pointerEvents: 'none' }}
                            size="small"
                            color="primary"
                            onClick={() => {
                                setUpdate(true);
                            }}
                        >
                            <EditIcon style={{ pointerEvents: 'none' }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ height: 'auto', spacing: 5, mt: '1rem' }}>
                        <Box sx={styles.select}>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="User Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.user_name}
                                    value={user_info.out_user_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />

                                <TextField
                                    id="country-name-input"
                                    label="Contact No"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.user_mobile}
                                    value={user_info.out_user_mobile}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Email"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.user_email}
                                    value={user_info.out_user_email}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                                <TextField
                                    id="country-name-input"
                                    label="Address"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.user_address}
                                    value={user_info.out_user_address}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Country Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.country_name}
                                    value={user_info.out_country_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />

                                <TextField
                                    id="country-name-input"
                                    label="State Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.state_name}
                                    value={user_info.out_state_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="City Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.city_name}
                                    value={user_info.out_city_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />

                                <TextField
                                    id="country-name-input"
                                    label="Institutue Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.center_name}
                                    value={user_info.out_institute_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="country-name-input"
                                    label="Department"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.department_name}
                                    value={user_info.out_department_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                                <TextField
                                    id="country-name-input"
                                    label="Designation"
                                    variant="outlined"
                                    sx={styles.input}
                                    // value={doctorDetail.user_type_name}
                                    value={user_info.out_user_type_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px' }
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                {user_info.out_center_name && (
                                    <TextField
                                        id="country-name-input"
                                        label="Center Name"
                                        variant="outlined"
                                        style={{ width: '49%' }}
                                        sx={styles.input}
                                        // value={doctorDetail.center_name}
                                        value={user_info.out_center_name}
                                        InputProps={{
                                            readOnly: true,
                                            style: { color: 'black', fontSize: '10px' }
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </form>
                {/* <DialogActions sx={{ width: '96%', height: 'auto' }}>
                    <Button variant="contained" size="small" color="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="contained" size="small" color="error">
                        Reset
                    </Button>
                </DialogActions> */}
            </Box>
        </>
    );
};

export default Profile;
