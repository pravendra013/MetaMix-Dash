// import PropTypes from 'prop-types';
// import { useState } from 'react';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import UpdateUser from '../../../../../pages/user/UpdateUser'
// // assets
// import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
// import { useNavigate } from '../../../../../../node_modules/react-router-dom/dist/index';

// // ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

// const ProfileTab = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();

//     const [selectedIndex, setSelectedIndex] = useState(0);
//     const handleListItemClick = (event, index) => {
//         setSelectedIndex(index);
//     };

//     const handleLogout = () => {
//         sessionStorage.clear();
//         navigate('/');
//     };

//     return (
//         <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
//             {/* <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
//                 <ListItemIcon>
//                     <EditOutlined />
//                 </ListItemIcon>
//                 <ListItemText primary="Edit Profile" />
//             </ListItemButton> */}
//             <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
//                 <ListItemIcon>
//                     <UserOutlined />
//                 </ListItemIcon>
//                 <ListItemText primary="View Profile" />
//             </ListItemButton>
//             <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
//                 <ListItemIcon>
//                     <LogoutOutlined />
//                 </ListItemIcon>
//                 <ListItemText primary="Logout" />
//             </ListItemButton>
//         </List>
//     );
// };

// ProfileTab.propTypes = {
//     handleLogout: PropTypes.func
// };

// export default ProfileTab;

import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
// import UpdateUser from '../../../../../pages/user/UpdateUser';
// import ProfileView from '../../../../../pages/ProfileView/ProfileView';
// import ViewProfile from '../../../../../pages/viewprofile/ViewProfile';

// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../../node_modules/react-router-dom/dist/index';

// import * as api from '../../../../../api/index';
// import * as crypt from '../../../../../api/index';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(0);
    // const handleListItemClick = (event, index) => {
    //     setSelectedIndex(index);
    // };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index === 1) {
            setDetails(true);
        } else {
            setDetails(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const [profileDetail, setProfileDetail] = useState('');
    const [details, setDetails] = useState(false);

    return (
        <Box sx={{ height: '6rem' }}>
            <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
                <ListItemButton selected={profileDetail === 1} onClick={(event) => navigate('/profile')}>
                    <ListItemIcon>
                        <UserOutlined />
                    </ListItemIcon>
                    <ListItemText primary="View Profile" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
            {details && <ViewProfile setDetails={setDetails} profileDetail={profileDetail} />}
        </Box>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func,
    handleListItemClick: PropTypes.func
};

export default ProfileTab;
