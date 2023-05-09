/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '../../../../node_modules/@mui/icons-material/index.js';

import { Alert, Select, FormControl, InputLabel, MenuItem, Switch } from '@mui/material';
import * as api from '../../../api/index.js';
import * as crypt from '../../../utils/crypto.js';
const styles = {
    input: {
        marginBottom: '0.7rem',
        width: '100%',
        height: '1.8rem'
    }
};

// if (sessionStorage.getItem('user')) {
//     const { user_info } = JSON.parse(sessionStorage.getItem('user'));
// }

const AddAsset = ({ addAssetHandler, setAdd, error, setError }) => {
    // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const [center, setCenter] = useState(user_info.out_center_id);
    const [centerList, setCenterList] = useState();
    const [showList, setShowList] = useState(false);

    const [deviceCode, setDeviceCode] = useState();
    const [deviceID, setDeviceID] = useState();

    const [assetTypeName, setAssetTypeName] = useState();
    const [assetTypeNameList, setAssetTypeNameList] = useState();
    const [showAssetList, setShowAssetList] = useState();
    const [getAssetTypeList, setGetAssetTypeList] = useState();

    const [active, setActive] = useState(0);

    useEffect(() => {
        const getCenterList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.assetsCenter({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data

                let row = [];
                for (let i = 0; i < Object.values(data.centerList).length; i++) {
                    row.push({ center_name: data.centerList[i].center_name, center_id: data.centerList[i].center_id });
                }
                setCenterList(row);
                setShowList(true);
            } catch (error) {
                console.log(error);
            }
        };

        getCenterList();
    }, []);

    useEffect(() => {
        const getAssetTypeNameList = async () => {
            try {
                const institute = { in_institute_id: user_info.out_institute_id, in_center_id: center };

                const encryptedData = crypt.encryptData(institute);
                const { data: decryptedData } = await api.assetsList({ data: encryptedData });
                const data = crypt.decryptData(decryptedData); //Decryption of Data
                console.log(data);
                let row = [];
                for (let i = 0; i < Object.values(data.asset).length; i++) {
                    row.push({
                        asset_id: data.asset[i].asset_id,
                        asset_type_id: data.asset[i].asset_type_id,
                        asset_type_name: data.asset[i].asset_type_name
                    });
                }
                setAssetTypeNameList(row);
                setShowAssetList(true);
            } catch (error) {
                console.log(error);
            }
        };
        console.log('api calling foe get assest type');
        getAssetTypeNameList();
    }, [getAssetTypeList]);

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [error]);

    const handleReset = () => {
        console.log('reset');
        setDeviceCode('');
        setDeviceID('');
        setAssetTypeName('');
    };

    const selectedCenterHandler = (event) => {
        for (let i = 0; i < Object.values(centerList).length; i++) {
            if (centerList[i].center_name === event.target.value) {
                console.log(centerList[i].center_id);
                setCenter(centerList[i].center_id);
                break;
            }
        }
        console.log('setting get assest type...');
        setGetAssetTypeList((state) => !state);
        //extract selected center id and store in center
    };

    const storeDeviceCode = (event) => {
        setDeviceCode(event.target.value);
    };

    const storeDeviceID = (event) => {
        setDeviceID(event.target.value);
    };

    const selectedAssetTypeNameHandler = (event) => {
        console.log(event.target.value);
        for (let i = 0; i < Object.values(assetTypeNameList).length; i++) {
            if (assetTypeNameList[i].asset_type_name === event.target.value) {
                setAssetTypeName(assetTypeNameList[i].asset_type_id);
                break;
            }
        }

        //extract selected  id and store in assetTypeName
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    const assetHandler = (event) => {
        event.preventDefault();
        const data = {
            in_institute_id: user_info.out_institute_id,
            // in_institute_id: 1,
            in_center_id: center,
            // in_center_id: 1,
            in_device_code: deviceCode,
            in_device_id: deviceID,
            in_asset_type_id: assetTypeName,
            in_created_by: user_info.out_userid
        };
        addAssetHandler(data);
    };

    return (
        <>
            <Dialog
                open={open}
                maxWidth="xs"
                fullWidth
                onClose={() => {
                    setError('');
                    setAdd(false);
                }}
                onBackdropClick={() => {
                    setError('');
                    setAdd(false);
                }}
                onEscapeKeyDown={() => {
                    setError('');
                    setAdd(false);
                }}
            >
                <form onSubmit={assetHandler}>
                    <DialogTitle
                        sx={{
                            fontWeight: '900',
                            p: '5px',
                            backgroundColor: '#ECF2FF'
                        }}
                    >
                        Add Asset
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
                                setAdd(false);
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    <DialogContent sx={{ height: 'auto' }}>
                        {user_info.out_center_id ? (
                            <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                                <TextField
                                    id="center_name"
                                    label="Center"
                                    variant="outlined"
                                    sx={styles.input}
                                    // onChange={storeGovtUhid}
                                    value={user_info.out_center_name}
                                    InputProps={{
                                        readOnly: true,
                                        style: { fontSize: '10px' }
                                    }}
                                />
                            </FormControl>
                        ) : (
                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel id="demo-simple-select-label">Select Center</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Center"
                                    onChange={selectedCenterHandler}
                                    style={{ fontSize: '10px' }}
                                >
                                    {showList &&
                                        centerList.map((name) => (
                                            <MenuItem
                                                className="menu-item"
                                                value={name.center_name}
                                                style={{ fontSize: '10px', height: '1.1rem' }}
                                            >
                                                {name.center_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        )}

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="device-code"
                                label="Device Code"
                                variant="outlined"
                                sx={styles.input}
                                onChange={storeDeviceCode}
                                value={deviceCode}
                                InputProps={{
                                    style: { fontSize: '10px' }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="device-id"
                                label="Device ID"
                                variant="outlined"
                                sx={styles.input}
                                onChange={storeDeviceID}
                                value={deviceID}
                                InputProps={{
                                    style: { fontSize: '10px' }
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <InputLabel id="demo-simple-select-label">Select Asset Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Asset Type"
                                onChange={selectedAssetTypeNameHandler}
                                style={{ fontSize: '10px' }}
                            >
                                {showAssetList &&
                                    assetTypeNameList.map((name) => (
                                        <MenuItem
                                            className="menu-item"
                                            value={name.asset_type_name}
                                            style={{ fontSize: '10px', height: '1.1rem' }}
                                        >
                                            {name.asset_type_name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions sx={{ width: '96%', height: 'auto', mt: '-0.7rem' }}>
                        <Button variant="contained" size="small" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="contained" size="small" color="error" onClick={handleReset}>
                            Reset
                        </Button>
                    </DialogActions>

                    {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}>
                        <Switch onChange={activeHandler} />
                    </div> */}
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

export default AddAsset;
