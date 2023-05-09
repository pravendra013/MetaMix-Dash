/* eslint-disable */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { FormControl } from '@mui/material';

const styles = {
    input: {
        marginBottom: '1.5rem',
        width: '100%',
        height: '1.8rem'
        // pointerEvents: 'none'
    }
};

const CityDetails = ({ setDetails, cityDetail }) => {
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
                        City Details
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
                            {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}> */}
                            <TextField
                                id="details"
                                label="Country Name"
                                variant="outlined"
                                sx={styles.input}
                                // disabled
                                value={cityDetail.country_name}
                                InputProps={{
                                    readOnly: true,

                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                            {/* </FormControl> */}

                            {/* <FormControl fullWidth style={{ marginBottom: '0.7rem' }}> */}
                            <TextField
                                id="details"
                                label="State Name"
                                variant="outlined"
                                // disabled
                                sx={styles.input}
                                value={cityDetail.state_name}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                            />
                            {/* </FormControl> */}
                        </Box>

                        <TextField
                            id="details"
                            label="City Name"
                            variant="outlined"
                            sx={styles.input}
                            // disabled
                            value={cityDetail.city_name}
                            InputProps={{
                                readOnly: true,
                                style: { color: 'black', fontSize: '10px', height: '2rem' }
                            }}
                        />
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default CityDetails;
