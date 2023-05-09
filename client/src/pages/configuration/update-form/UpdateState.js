/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
import Switch from '@mui/material/Switch';
import { Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
// import '../configuration.css';
const styles = {
    input: {
        marginBottom: '1rem',
        width: '100%',
        height: '1.8rem',
        marginTop: '0.5rem'
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

const UpdateState = ({ updateStateHandler, setUpdate, error, setError, updateState }) => {
    const [state, setState] = useState(updateState.in_state_name);
    const [country, setCountry] = useState(updateState.in_country_id);

    const [list, setList] = useState({ country: [] });
    const [active, setActive] = useState(updateState.in_active);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data: encryptedCountryList } = await api.countryGet();

                const countryList = crypt.decryptData(encryptedCountryList); //Decryption of Data

                let country = [];
                for (let i = 0; i < Object.values(countryList.country).length; i++) {
                    country.push({ id: countryList.country[i].country_id, name: countryList.country[i].country_name });
                }

                setList(() => {
                    return { country: country };
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

    const storeState = (event) => {
        setState(event.target.value);
    };

    const stateHandler = (event) => {
        event.preventDefault();
        const data = { in_state_name: state, in_country_id: country, in_active: active };
        updateStateHandler(data);
    };

    const handleReset = () => {
        setState(updateState.in_state_name);
    };

    const selectCountryHandler = (event) => {
        for (let i = 0; i < Object.values(list.country).length; i++) {
            if (list.country[i].name === event.target.value) {
                setCountry(list.country[i].id);
                break;
            }
        }
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
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
                <form onSubmit={stateHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        State
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
                        <Box sx={styles.select}>
                            <FormControl fullWidth style={{ marginBottom: '0.5rem' }}>
                                <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Country"
                                    onChange={selectCountryHandler}
                                    defaultValue={updateState.in_country_name}
                                    style={{ fontSize: '10px' }}
                                >
                                    {list.country.map((name) => (
                                        <MenuItem className="menu-item" value={name.name} style={{ fontSize: '10px', height: '1.1rem' }}>
                                            {name.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            id="country-name-input"
                            label="State Name"
                            variant="outlined"
                            sx={styles.input}
                            onChange={storeState}
                            value={state}
                            InputProps={{
                                style: { fontSize: '10px' }
                            }}
                        />
                        <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem', mt: '-0.5rem' }}>
                            <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                            {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
                            <Switch onChange={activeHandler} defaultChecked={updateState.in_active} />
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

export default UpdateState;
