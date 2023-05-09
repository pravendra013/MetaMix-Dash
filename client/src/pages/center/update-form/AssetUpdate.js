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
import AssetUserMapping from '../AssetUserMapping.js';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index.js';
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
// const { user_info } = JSON.parse(sessionStorage.getItem('user'));

const UpdateAsset = ({ updateAsset, updateAssetHandler }) => {
    const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

    const [deviceCode, setDeviceCode] = useState(updateAsset.in_device_code);
    const [deviceID, setDeviceID] = useState(updateAsset.in_device_id);

    const [assetTypeName, setAssetTypeName] = useState(updateAsset.in_asset_type_id);
    const [assetTypeNameList, setAssetTypeNameList] = useState();
    const [showAssetList, setShowAssetList] = useState();

    const [active, setActive] = useState(updateAsset.in_active);

    const navigate = useNavigate();

    useEffect(() => {
        const getAssetTypeNameList = async () => {
            try {
                const institute = { in_institute_id: updateAsset.in_institute_id, in_center_id: updateAsset.in_center_id };

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
        getAssetTypeNameList();
    }, []);

    // useEffect(() => {
    //     if (error !== '') {
    //         setTimeout(() => {
    //             setError('');
    //         }, 2000);
    //     }
    // }, [error]);

    const handleReset = () => {
        // setDescription();
        // setDepartment();
    };

    const storeDeviceCode = (event) => {
        console.log(event.target.value);
        setDeviceCode(event.target.value);
    };

    const storeDeviceID = (event) => {
        console.log(event.target.value);
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
    };

    const activeHandler = (event) => {
        setActive(event.target.checked === true ? 1 : 0);
    };

    const assetHandler = (event) => {
        event.preventDefault();
        const data = {
            in_device_code: deviceCode,
            in_device_id: deviceID,
            in_asset_type_id: assetTypeName,
            in_created_by: user_info.out_userid,
            in_active: active
        };
        updateAssetHandler(data);
    };

    const update = (event) => {
        // console.log(event.target.value);
        // event.preventDefault();
        const data = {
            ...updateAsset,
            in_device_code: deviceCode,
            in_device_id: deviceID,
            in_asset_type_id: assetTypeName,
            in_created_by: user_info.out_userid,
            in_active: active
        };
        navigate('/asset', { state: { data, name: 'update' } });
    };

    return (
        <>
            {/* <Dialog
                open={open}
                maxWidth="sm"
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
            > */}
            <form>
                <DialogTitle
                    sx={{
                        fontWeight: '900',
                        p: '5px',
                        backgroundColor: '#ECF2FF'
                    }}
                >
                    Asset
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
                        <Close />
                    </IconButton>
                </Box>

                <DialogContent sx={{ height: 'auto' }}>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <FormControl fullWidth style={{ marginBottom: '0.7rem' }}>
                            <TextField
                                id="center_name"
                                label="Center"
                                variant="outlined"
                                sx={styles.input}
                                disabled
                                value={updateAsset.in_center_name}
                                InputProps={{
                                    style: { fontSize: '10px' }
                                }}
                            />
                        </FormControl>

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
                    </Box>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
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
                                defaultValue={updateAsset.in_asset_type_name}
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
                    </Box>
                    <h4 style={{ marginBottom: '-0.4rem' }}>Associate User</h4>
                    <AssetUserMapping asset_id={updateAsset.in_asset_id} updateAsset={updateAsset} />

                    <Box sx={{ h: '0.5rem', display: 'inline-flex', gap: '0.7rem' }}>
                        <h4 style={{ marginTop: '0.5rem', fontWeight: 100 }}>Active</h4>
                        {/* <div style={{ position: 'absolute', bottom: '5%', left: '3%' }}> */}
                        <Switch onChange={activeHandler} defaultChecked={updateAsset.in_active} />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ width: '96%', height: 'auto', mt: '-2.5rem' }}>
                    <Button variant="contained" size="small" color="primary" type="button" onClick={() => update()}>
                        Submit
                    </Button>
                    <Button variant="contained" size="small" color="error" onClick={handleReset}>
                        Reset
                    </Button>
                </DialogActions>
            </form>
            <br />
            <br />
            {/* </Dialog> */}
            {/* 
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
            )} */}
        </>
    );
};

export default UpdateAsset;
