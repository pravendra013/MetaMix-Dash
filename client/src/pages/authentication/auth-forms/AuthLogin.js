// //  eslint-disable
// import React, { useEffect, useRef, useState } from 'react';
// import { Link as RouterLink, useHistory } from 'react-router-dom';
// import { Alert, TextField } from '../../../../node_modules/@mui/material/index';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// // import '.../../pages/configuration/configuration.css';

// import { Box } from '@mui/material';
// import './login.css';

// // material-ui
// import {
//     Button,
//     Checkbox,
//     Divider,
//     FormControlLabel,
//     FormHelperText,
//     Grid,
//     Link,
//     IconButton,
//     InputAdornment,
//     InputLabel,
//     OutlinedInput,
//     Stack,
//     Typography
// } from '@mui/material';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// // project import

// import AnimateButton from 'components/@extended/AnimateButton';

// // assets

// import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
// import { authLogin } from 'action/auth';
// import { useDispatch } from 'react-redux';

// // ============================|| FIREBASE - LOGIN ||============================ //

// const AuthLogin = () => {
//     const [checked, setChecked] = React.useState(false);

//     const [showPassword, setShowPassword] = React.useState(false);
//     const [switchText, setSwitchText] = React.useState(true);
//     const [error, setError] = useState();
//     const [showError, setShowError] = useState();

//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     useEffect(() => {
//         setTimeout(() => {
//             setError('');
//             setShowError(false);
//         }, 3000);
//     }, [error]);
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const changeState = (event) => {
//         console.log('clicked');
//         setSwitchText(false);
//     };

//     const timestamp = Date.now();

//     return (
//         <>
//             {/* <button onClick={changeState}>change</button> */}
//             <Formik
//                 initialValues={{
//                     // user_id: 'metamedviser@gmail.com',
//                     // password: 'XFKxUoE5'
//                     user_id: '',
//                     password: ''
//                 }}
//                 validationSchema={Yup.object().shape({
//                     user_id: Yup.string().email('Must be a valid user_id').max(255).required('Email is required'),
//                     password: Yup.string().max(255).required('Password is required')
//                 })}
//                 onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//                     try {
//                         setStatus({ success: false });
//                         setSubmitting(false);
//                         console.log(values);
//                         // console.log(values);
//                         // navigate('dashboard');
//                         dispatch(authLogin(values, navigate, setError, setShowError));
//                     } catch (err) {
//                         setStatus({ success: false });
//                         setErrors({ submit: err.message });
//                         setSubmitting(false);
//                     }
//                 }}
//             >
//                 {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//                     <form noValidate onSubmit={handleSubmit}>
//                         <Grid container spacing={2} xs={12}>
//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <TextField
//                                         id="user_id-login"
//                                         type="user_id"
//                                         value={values.user_id}
//                                         style={{ width: '105%', marginBottom: '0.5rem' }}
//                                         name="user_id"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         label="Enter Email"
//                                         InputProps={{
//                                             style: { color: 'black', fontSize: '12px', height: '2rem' }
//                                         }}
//                                         fullWidth
//                                         error={Boolean(touched.user_id && errors.user_id)}
//                                     />

//                                     {touched.user_id && errors.user_id && (
//                                         <Box
//                                             sx={{
//                                                 position: 'absolute',
//                                                 left: 0,
//                                                 bottom: 0,
//                                                 width: '30%',
//                                                 zIndex: 2222
//                                             }}
//                                         >
//                                             <Alert
//                                                 severity="error"
//                                                 error
//                                                 id="standard-weight-helper-text-user_id-login"
//                                                 sx={{
//                                                     backgroundColor: 'lightred',
//                                                     color: 'red'
//                                                 }}
//                                             >
//                                                 {errors.user_id}
//                                             </Alert>
//                                         </Box>
//                                     )}
//                                 </Stack>
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <TextField
//                                         fullWidth
//                                         error={Boolean(touched.password && errors.password)}
//                                         id="password-login"
//                                         type={showPassword ? 'text' : 'password'}
//                                         value={values.password}
//                                         style={{ width: '105%' }}
//                                         name="password"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         InputProps={{
//                                             endAdornment: (
//                                                 <InputAdornment position="end">
//                                                     <IconButton
//                                                         color="primary"
//                                                         size="small"
//                                                         onClick={handleClickShowPassword}
//                                                         onMouseDown={handleMouseDownPassword}
//                                                     >
//                                                         {showPassword ? (
//                                                             <Visibility style={{ fontSize: '18px' }} />
//                                                         ) : (
//                                                             <VisibilityOff style={{ fontSize: '18px' }} />
//                                                         )}
//                                                     </IconButton>
//                                                 </InputAdornment>
//                                             ),
//                                             style: { color: 'black', fontSize: '10px', height: '2rem' }
//                                         }}
//                                         label="Password"
//                                     />

//                                     {touched.password && errors.password && (
//                                         <Box
//                                             sx={{
//                                                 position: 'absolute',
//                                                 left: 0,
//                                                 bottom: 0,
//                                                 width: '30%',
//                                                 zIndex: 2222
//                                             }}
//                                         >
//                                             <Alert
//                                                 severity="error"
//                                                 error
//                                                 id="standard-weight-helper-text-password-login"
//                                                 sx={{
//                                                     backgroundColor: 'lightred',
//                                                     color: 'red'
//                                                 }}
//                                             >
//                                                 {errors.password}
//                                             </Alert>
//                                         </Box>
//                                     )}
//                                 </Stack>
//                             </Grid>

//                             <Grid item xs={12} sx={{ mt: -1 }}>
//                                 <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//                                     <FormControlLabel
//                                         control={
//                                             <Checkbox
//                                                 checked={checked}
//                                                 onChange={(event) => setChecked(event.target.checked)}
//                                                 name="checked"
//                                                 color="primary"
//                                                 style={{ transform: 'scale(0.75)' }}
//                                             />
//                                         }
//                                         label={
//                                             <Typography sx={{ fontSize: '12px' }} variant="h6">
//                                                 Keep me sign in
//                                             </Typography>
//                                         }
//                                     />
//                                     <Link variant="h6" component={RouterLink} to="" color="text.primary">
//                                         {/* Forgot Password? */}
//                                     </Link>
//                                 </Stack>
//                             </Grid>
//                             {errors.submit && (
//                                 <Grid item xs={12}>
//                                     <FormHelperText error>{errors.submit}</FormHelperText>
//                                 </Grid>
//                             )}
//                             <Grid item xs={12}>
//                                 <AnimateButton>
//                                     <Button
//                                         disableElevation
//                                         disabled={isSubmitting}
//                                         fullWidth
//                                         size="large"
//                                         type="submit"
//                                         variant="contained"
//                                         color="primary"
//                                         sx={{ height: '2rem', mt: '-0.5rem', width: '105%' }}
//                                     >
//                                         Login
//                                     </Button>
//                                 </AnimateButton>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 )}
//             </Formik>

//             {showError && (
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         left: 0,
//                         bottom: 0,
//                         width: '30%',
//                         zIndex: 2222
//                     }}
//                 >
//                     <Alert
//                         severity="error"
//                         error
//                         id="standard-weight-helper-text-password-login"
//                         sx={{
//                             backgroundColor: 'lightred',
//                             color: 'red'
//                         }}
//                     >
//                         {error}
//                     </Alert>
//                 </Box>
//             )}
//         </>
//     );
// };

// export default AuthLogin;

//  eslint-disable
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Alert, TextField } from '../../../../node_modules/@mui/material/index';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import '.../../pages/configuration/configuration.css';

import { Box } from '@mui/material';
import './login.css';

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import

import AnimateButton from 'components/@extended/AnimateButton';

// assets

import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { authLogin } from 'action/auth';
import { useDispatch } from 'react-redux';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [checked, setChecked] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const [switchText, setSwitchText] = React.useState(true);
    const [error, setError] = useState();
    const [showError, setShowError] = useState();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setError('');
            setShowError(false);
        }, 3000);
    }, [error]);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changeState = (event) => {
        console.log('clicked');
        setSwitchText(false);
    };

    // const handleLogin = async (values) => {
    //     try {
    //         console.log(values);
    //         await dispatch(authLogin(values, navigate, setError, setShowError));
    //         window.location.reload(); // Refresh the page after successful login
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <>
            {/* <button onClick={changeState}>change</button> */}
            <Formik
                initialValues={{
                    // user_id: 'metamedviser@gmail.com',
                    // password: 'XFKxUoE5'
                    user_id: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    user_id: Yup.string().email('Must be a valid user_id').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        console.log(values);

                        // console.log(values);
                        // navigate('dashboard');
                        dispatch(authLogin(values, navigate, setError, setShowError));
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}

                // onSubmit={(values) => {
                //     handleLogin(values);
                // }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2} xs={12}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="user_id-login"
                                        type="user_id"
                                        value={values.user_id}
                                        style={{ width: '105%', marginBottom: '0.5rem' }}
                                        name="user_id"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Enter Email"
                                        InputProps={{
                                            style: { color: 'black', fontSize: '12px', height: '2rem' }
                                        }}
                                        fullWidth
                                        error={Boolean(touched.user_id && errors.user_id)}
                                    />

                                    {touched.user_id && errors.user_id && (
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
                                                severity="error"
                                                error
                                                id="standard-weight-helper-text-user_id-login"
                                                sx={{
                                                    backgroundColor: 'lightred',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.user_id}
                                            </Alert>
                                        </Box>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <TextField
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        style={{ width: '105%' }}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? (
                                                            <Visibility style={{ fontSize: '18px' }} />
                                                        ) : (
                                                            <VisibilityOff style={{ fontSize: '18px' }} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: { color: 'black', fontSize: '10px', height: '2rem' }
                                        }}
                                        label="Password"
                                    />

                                    {touched.password && errors.password && (
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
                                                severity="error"
                                                error
                                                id="standard-weight-helper-text-password-login"
                                                sx={{
                                                    backgroundColor: 'lightred',
                                                    color: 'red'
                                                }}
                                            >
                                                {errors.password}
                                            </Alert>
                                        </Box>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                                style={{ transform: 'scale(0.75)' }}
                                            />
                                        }
                                        label={
                                            <Typography sx={{ fontSize: '12px' }} variant="h6">
                                                Keep me sign in
                                            </Typography>
                                        }
                                    />
                                    <Link variant="h6" component={RouterLink} to="" color="text.primary">
                                        {/* Forgot Password? */}
                                    </Link>
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ height: '2rem', mt: '-0.5rem', width: '105%' }}
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>

            {showError && (
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
                        severity="error"
                        error
                        id="standard-weight-helper-text-password-login"
                        sx={{
                            backgroundColor: 'lightred',
                            color: 'red'
                        }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}
        </>
    );
};

export default AuthLogin;
