/* eslint-disable */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { FormControl } from '@mui/material';
// import '../configuration.css';
const styles = {
    input: {
        marginBottom: '1.5rem',
        width: '100%',
        height: '1.8rem'
        // pointerEvents: 'none'
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

const fontColor = {
    style: { color: 'rgb(50, 50, 50)' }
};

const StateDetails = ({ setDetails, stateDetail }) => {
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
                        State Details
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
                        <Box sx={styles.select}>
                            {/* <FormControl fullWidth style={{ marginBottom: '0.5rem' }}> */}
                            <TextField
                                id="details"
                                label="Country Name"
                                variant="outlined"
                                sx={styles.input}
                                value={stateDetail.country_name}
                                // disabled
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'black', fontSize: '10px', height: '2rem' }
                                }}
                                inputProps={fontColor}
                            />
                            {/* </FormControl> */}
                        </Box>
                        <TextField
                            id="details"
                            label="State Name"
                            variant="outlined"
                            sx={styles.input}
                            // disabled
                            value={stateDetail.state_name}
                            InputProps={{
                                readOnly: true,
                                style: { color: 'black', fontSize: '10px', height: '2rem' }
                            }}
                            inputProps={fontColor}
                        />
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default StateDetails;
