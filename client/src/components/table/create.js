// import React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const styles = {
//     box: {
//         position: 'absolute',
//         top: '8.9rem',
//         width: '100%',
//         height: '75%',
//         backdropFilter: 'blur(12px)',
//         backgroundColor: '#fafafb',
//         right: '1px'
//     },
//     formContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%'
//     },
//     form: {
//         width: '40%',
//         height: '12rem',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#E8E2E2',
//         marginTop: '-10rem',
//         borderRadius: '15px'
//     },
//     input: {
//         marginBottom: '1rem',
//         width: '90%',
//         height: '1.8rem'
//     },
//     buttons: {
//         display: 'flex',
//         gap: '1rem',
//         justifyContent: 'flex-end',
//         width: '90%',
//         height: '1.8rem'
//     }
// };

// function create() {
//     return (
//         // <Box
//         //     style={{
//         //         top: '9rem',
//         //         right: '0.02rem',
//         //         // bottom: 'auto',
//         //         // padding: '0px',
//         //         width: '100%',
//         //         flex: 1,
//         //         height: '75% ',
//         //         // border: 'opx',
//         //         position: 'absolute',
//         //         backgroundColor: 'grey'
//         //     }}
//         // >
//         //     <div
//         //         sx={styles.formdiv}
//         //         //  style={{ width: '30%', backgroundColor: 'white', margin: '0 auto', borderRadius: '15px' }}
//         //     >
//         //         <form style={{}}>
//         //             <h2>Add Country</h2>
//         //             <div>
//         //                 <TextField id="outlined-basic" label="Country ID" variant="outlined" style={{ width: '20rem' }} />
//         //             </div>

//         //             <div style={{ display: 'flex', marginTop: '1rem', gap: '1rem' }}>
//         //                 <Button variant="contained" size="small" sx={{ height: '1.8rem', width: '3rem' }}>
//         //                     Submit
//         //                 </Button>
//         //                 <Button variant="contained" color="error" size="small" sx={{ height: '1.8rem', width: '3rem' }}>
//         //                     Reset
//         //                 </Button>
//         //             </div>
//         //         </form>
//         //     </div>
//         // </Box>

//         <Box sx={styles.box}>
//             <Box sx={styles.formContainer}>
//                 <Box sx={styles.form}>
//                     <h2 style={{ marginTop: '-3rem', color: 'grey' }}>Add Country</h2>
//                     <TextField id="country-name-input" label="Country Name" variant="outlined" sx={styles.input} />
//                     <Box sx={styles.buttons}>
//                         <Button variant="contained" size="small" color="primary">
//                             Submit
//                         </Button>
//                         <Button variant="outlined" size="small" color="error">
//                             Reset
//                         </Button>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// }

// export default create;
