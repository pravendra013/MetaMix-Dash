// assets
// import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

// icons
const icons = {
    CorporateFareIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const institute = {
    id: 'institute',
    title: 'Institute',
    type: 'group',
    // url: '/login',
    children: [
        {
            id: 'institute',
            title: 'Institute',
            type: 'item',
            url: '/institute',
            icon: icons.CorporateFareIcon
            // target: true
        }
    ]
};

// const institute = {
//     id: 'institute',
//     title: 'Institute',
//     url: '/institute',
//     icon: icons.CorporateFareIcon,
//     type: 'group'
// };

export default institute;
