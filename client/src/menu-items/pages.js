// assets;
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    AppRegistrationIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    children: [
        {
            id: 'login1',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        },
        {
            id: 'register1',
            title: 'Register',
            type: 'item',
            url: '/register',
            // icon: icons.ProfileOutlined,
            icon: icons.AppRegistrationIcon,
            target: true
        }
    ]
};

export default pages;
