import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import UpdateAsset from '../update-form/AssetUpdate';

const AssetUpdate = () => {
    var { state } = useLocation();
    const navigate = useNavigate();

    const [state1, setState1] = useState(state);
    useEffect(() => {
        console.log('hello there');
        // state = { a: 's' };
        console.log(state);
    }, []);
    return (
        <>
            <UpdateAsset updateAsset={state.patientsDetail} />
        </>
    );
};

export default AssetUpdate;
