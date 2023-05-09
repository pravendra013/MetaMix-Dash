/* eslint-disable */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const styles = {
    input: {
        marginBottom: '0.7rem',
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

const CountryDetails = ({ setDetails, countryName }) => {
    return (
        <>
            <Dialog
                open={true}
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
                        Country Details
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
                        <TextField
                            id="details"
                            label="Country Name"
                            variant="outlined"
                            sx={styles.input}
                            value={countryName}
                            // disabled
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color: 'black',
                                    fontSize: '10px'
                                }
                            }}
                        />
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default CountryDetails;
