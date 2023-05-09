// assets
import { DashboardOutlined } from '@ant-design/icons';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';

// icons
const icons = {
    DashboardOutlined,
    DashboardCustomizeRoundedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: { DashboardCustomizeRoundedIcon },
    // icon: icons.DashboardCustomizeRoundedIcon,
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            // icon: icons.DashboardOutlined,
            icon: icons.DashboardCustomizeRoundedIcon
            // breadcrumbs: false
        }
    ]
};

// const dashboard = {
//     id: 'dashboard',
//     title: 'Dashboard',
//     // type: 'item',
//     url: '/dashboard/default',
//     // icon: icons.DashboardOutlined,
//     icon: icons.DashboardCustomizeRoundedIcon
//     // breadcrumbs: false
// };

export default dashboard;
