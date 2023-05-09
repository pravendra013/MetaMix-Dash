import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import ReportDetails from './center/detail-form/ReportDetail';
import UpdateReport from './center/update-form/ReportUpdate';

const Test = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [state1, setState1] = useState(state);
    useEffect(() => {
        console.log('test');
        console.log(state);
    }, []);
    return (
        <>
            {state.view === false ? (
                <UpdateReport updatePatient={state.patientsDetail} />
            ) : (
                <ReportDetails patientsDetail={state.patientsDetail} />
            )}
        </>
    );
};

export default Test;
