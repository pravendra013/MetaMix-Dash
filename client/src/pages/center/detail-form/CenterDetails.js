/* eslint-disable */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const styles = {
    input: {
        marginBottom: '1.5rem',
        width: '100%',
        height: '1.8rem'
        // pointerEvents: 'none'
    }
    // select: {
    //     cursor: 'not-allowed',
    //     pointerEvents: 'all !important'
    // }
};

const CenterDetails = ({ setDetails, centerDetail }) => {
    return (
        <>
            <Dialog
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
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Center Details
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

                    <DialogContent sx={{ height: 'auto', spacing: 2 }}>
                        <Box sx={styles.select}>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
                                    label="Institute Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_institute_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                                <TextField
                                    id="details"
                                    label="Center Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_center_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
                                    label="Doctor Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_user_name}
                                    InputProps={{
                                        // readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />

                                <TextField
                                    id="details"
                                    label="Contact No"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_user_mobile}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
                                    label="Email"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_user_email}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />

                                <TextField
                                    id="details"
                                    label="Country Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_country_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <TextField
                                    id="details"
                                    label="State Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_state_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                                <TextField
                                    id="details"
                                    label=" City Name"
                                    variant="outlined"
                                    sx={styles.input}
                                    value={centerDetail.in_city_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'black', fontSize: '10px', height: '2rem' }
                                    }}
                                />
                            </Box>
                            <TextField
                                id="details"
                                label=" Center Address"
                                variant="outlined"
                                sx={styles.input}
                                value={centerDetail.in_center_address}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                        </Box>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default CenterDetails;
