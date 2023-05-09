import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import UpdatePatient from '../update-form/UpdatePatient';

const PatientUpdate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [state1, setState1] = useState(state);
    useEffect(() => {
        console.log('hello there');
        console.log(state);
    }, []);
    return <UpdatePatient updatePatient={state.patientsDetail} />;
};

export default PatientUpdate;
