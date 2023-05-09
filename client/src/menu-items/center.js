// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
// import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// import BlindIcon from '@mui/icons-material/Blind';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// icons
const icons = {
    LocalHospitalIcon,
    TextSnippetIcon,
    AirlineSeatFlatIcon,
    ViewInArRoundedIcon,
    MeetingRoomIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const configuration = {
    id: 'center',
    title: 'Center',
    type: 'group',
    children: [
        {
            id: 'center',
            title: 'Center',
            type: 'item',
            url: '/center',
            icon: icons.MeetingRoomIcon
            // target: true
        },
        {
            id: 'doctors',
            title: 'Doctors',
            type: 'item',
            url: '/doctors',
            icon: icons.LocalHospitalIcon
            // target: true
        },
        {
            id: 'patients',
            title: 'Patients',
            type: 'item',
            url: '/patients',
            icon: icons.AirlineSeatFlatIcon
            // target: true
        },
        {
            id: 'reports',
            title: 'Reports',
            type: 'item',
            url: '/reports',
            icon: icons.TextSnippetIcon
            // target: true
        },
        {
            id: 'asset',
            title: 'Asset',
            type: 'item',
            url: '/asset',
            icon: icons.ViewInArRoundedIcon
            // target: true
        }
    ]
};

export default configuration;
