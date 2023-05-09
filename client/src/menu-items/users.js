// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import Person3Icon from '@mui/icons-material/Person3';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    Person3Icon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const users = {
    id: 'user',
    title: 'User',
    type: 'group',
    // url: '/login',
    // icon: icons.LoginOutlined,
    children: [
        {
            id: 'user',
            title: 'User',
            type: 'item',
            url: '/user',
            icon: icons.Person3Icon
            // target: true
        }
        // {
        //     id: 'profile',
        //     title: 'Profile',
        //     type: 'item',
        //     url: '/profile',
        //     icon: icons.Person3Icon
        //     // target: true
        // }
    ]
};

// const users = {
//     id: 'user',
//     title: 'User',
//     type: 'group',
//     url: '/sample-page',
//     icon: icons.LoginOutlined,
//     target: true
// };

export default users;
