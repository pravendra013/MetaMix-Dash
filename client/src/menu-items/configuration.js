// assets

import FlagIcon from '@mui/icons-material/Flag';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DescriptionIcon from '@mui/icons-material/Description';

// import { DescriptionIcon, FlagIcon, ApartmentIcon, GroupsIcon, CoPresentIcon } from '@mui/material';
// icons
const icons = {
    FlagIcon,
    LocationCityIcon,
    ApartmentIcon,
    GroupsIcon,
    CoPresentIcon,
    DescriptionIcon
};

// const NavgroupIcon = {
//     FlagIcon
// };

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const configuration = {
    id: 'configuration',
    title: 'Configuration',
    type: 'group',

    icon: icons.FlagIcon,
    children: [
        {
            id: 'country',
            title: 'Country',
            type: 'item',
            url: '/country',
            icon: icons.FlagIcon,
            collapse: true
            // target: true
        },
        {
            id: 'state',
            title: 'State',
            type: 'item',
            url: '/state',
            icon: icons.LocationCityIcon,
            collapse: true
            // target: true
        },
        {
            id: 'city',
            title: 'City',
            type: 'item',
            url: '/city',
            icon: icons.ApartmentIcon,
            collapse: true
            // target: true
        },
        {
            id: 'department',
            title: 'Department',
            type: 'item',
            url: '/department',
            icon: icons.GroupsIcon,
            collapse: true
            // target: true
        },
        {
            id: 'designation',
            title: 'Designation',
            type: 'item',
            url: '/designation',
            icon: icons.CoPresentIcon,
            collapse: true
            // target: true
        },
        {
            id: 'report-type',
            title: 'Report Type',
            type: 'item',
            url: '/report-type',
            icon: icons.DescriptionIcon,
            collapse: true
            // target: true
        }
        // {
        //     id: 'profile-view',
        //     title: 'Profile View',
        //     type: 'item',
        //     url: '/profileview',
        //     icon: icons.DescriptionIcon,
        //     collapse: true
        //     // target: true
        // }
    ]
    // collapse: false
};

export default configuration;
