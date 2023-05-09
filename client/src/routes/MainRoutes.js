import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import EditablePatientReport from 'pages/center/EditablePatientReport';
import UpdateReport from 'pages/center/update-form/ReportUpdate';
import Test from 'pages/Test';
import PatientUpdate from 'pages/center/middle-page/PatientUpdate';
import AssetUpdate from 'pages/center/middle-page/AssetUpdate';
import View3D from 'pages/3DView';
// import ProfileView from 'pages/ProfileView/ProfileView';

// import { element } from 'prop-types';

// import ReportType from 'pages/configuration/ReportType';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Country = Loadable(lazy(() => import('pages/configuration/Country')));
const State = Loadable(lazy(() => import('pages/configuration/State')));
const City = Loadable(lazy(() => import('pages/configuration/City')));
const Department = Loadable(lazy(() => import('pages/configuration/Department')));
const Designation = Loadable(lazy(() => import('pages/configuration/Designation')));

const Center = Loadable(lazy(() => import('pages/center/Center')));
const Doctor = Loadable(lazy(() => import('pages/center/Doctors')));
const Patients = Loadable(lazy(() => import('pages/center/Patients')));
const Reports = Loadable(lazy(() => import('pages/center/Reports')));
const Asset = Loadable(lazy(() => import('pages/center/Asset')));

const Institute = Loadable(lazy(() => import('pages/institute/Institute')));
const User = Loadable(lazy(() => import('pages/user/User')));
const Profile = Loadable(lazy(() => import('pages/user/Profile')));
const Security = Loadable(lazy(() => import('pages/security/Security')));
const ReportType = Loadable(lazy(() => import('pages/configuration/ReportType')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'department',
            element: <Department />
        },
        {
            path: 'doctors',
            element: <Doctor />
        },
        {
            path: 'patients',
            element: <Patients />
        },
        {
            path: 'reports',
            element: <Reports />
        },
        {
            path: 'asset',
            element: <Asset />
        },
        {
            path: 'security',
            element: <Security />
        },
        {
            path: 'country',
            element: <Country />
        },

        {
            path: 'state',
            element: <State />
        },
        {
            path: 'city',
            element: <City />
        },
        {
            path: 'report-type',
            element: <ReportType />
        },
        {
            path: 'institute',
            element: <Institute />
        },
        {
            path: 'designation',
            element: <Designation />
        },
        {
            path: 'user',
            element: <User />
        },
        {
            path: 'center',
            element: <Center />
        },
        {
            path: 'profile',
            element: <Profile />
        },
        {
            path: 'reportView',
            element: <UpdateReport />
        },
        {
            path: 'test',
            element: <Test />
        },
        {
            path: 'updatepatient',
            element: <PatientUpdate />
        },
        {
            path: 'assetupdate',
            element: <AssetUpdate />
        },
        {
            path: '3d-view',
            element: <View3D />
        }
    ]
};

export default MainRoutes;
