// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import SecurityIcon from '@mui/icons-material/Security';

// icons
const icons = {
    SecurityIcon,
    LoginOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const security = {
    id: 'security',
    title: 'Security',
    type: 'group',
    // url: '/login',
    icon: icons.LoginOutlined,
    children: [
        {
            id: 'security',
            title: 'Security',
            type: 'item',
            url: '/security',
            icon: icons.SecurityIcon
            // target: true
        }
    ]
};

// const security = {
//     id: 'security',
//     title: 'Security',
//     type: 'group',
//     url: '/security',
//     icon: icons.SecurityIcon
//     // target: true
// };

export default security;
