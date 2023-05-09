// import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// // // material-ui
// import { Box, collapse, List, Typography, NavgroupIcon } from '@mui/material';
// import NavgroupIcon  from '@mui/material-NavgroupIcon';

// // // project import
// import NavItem from './NavItem';

// // // ==============================|| NAVIGATION - LIST GROUP ||============================== //

// const NavGroup = ({ item }) => {
//     const menu = useSelector((state) => state.menu);
//     const { drawerOpen } = menu;

//     const [open, setOpen] = useState(false);

//     const handleClick = () => {
//         setOpen(!open);
//     };

//     const navCollapse = item.children?.map((menuItem) => {
//         switch (menuItem.type) {
//             case 'collapse':
//                 return <NavGroup key={menuItem.id} item={menuItem} level={1} />;
//             case 'item':
//                 return <NavItem key={menuItem.id} item={menuItem} level={1} />;
//             default:
//                 return (
//                     <Typography key={menuItem.id} variant="h6" color="error" align="center">
//                         // Fix - Group Collapse or Items //{' '}
//                     </Typography>
//                 );
//         }
//     });

//     return (
//         <>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     py: 1.25,
//                     px: 2.5,
//                     borderRadius: '12px',
//                     transition: 'all .2s ease-in-out',
//                     ...(open && {
//                         bgcolor: 'background.default',
//                         '&:hover': { bgcolor: 'background.default' },
//                         '&::before': {
//                             content: '""',
//                             position: 'absolute',
//                             top: '0px',
//                             left: '0px',
//                             height: '100%',
//                             width: '3px',
//                             bgcolor: 'primary.main'
//                         }
//                     }),
//                     ...(!open && {
//                         '&:hover': {
//                             bgcolor: 'background.paper'
//                         },
//                         '&::before': {
//                             content: '""',
//                             position: 'absolute',
//                             top: '0px',
//                             left: '0px',
//                             height: '100%',
//                             width: '3px',
//                             bgcolor: 'transparent'
//                         }
//                     })
//                 }}
//                 onClick={handleClick}
//             >
//                 <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="subtitle1">{item.title}</Typography>
//                 </Box>
//             </Box>
//             <Collapse in={open} timeout={300} unmountOnExit>
//                 <List
//                     sx={{
//                         py: 0,
//                         px: 2.5,
//                         '& .MuiTypography-root': {
//                             fontSize: '0.875rem',
//                             textTransform: 'capitalize'
//                         }
//                     }}
//                 >
//                     {navCollapse}
//                 </List>
//             </Collapse>
//         </>
//     );
// };

// NavGroup.propTypes = {
//     item: PropTypes.object
// };

// export default NavGroup;

//collapse nav

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Collapse, List, Typography, ListItemIcon } from '@mui/material';
import NavItem from './NavItem';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const menu = useSelector((state) => state.menu);
    const { drawerOpen } = menu;

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const navCollapse = item.children?.map((menuItem) => {
        switch (menuItem.type) {
            case 'collapse':
                return <NavGroup key={menuItem.id} item={menuItem} level={1} />;
            case 'item':
                return <NavItem key={menuItem.id} item={menuItem} level={1} />;
            default:
                return (
                    <Typography key={menuItem.id} variant="h6" color="error" align="center">
                        Fix - Group Collapse or Items
                    </Typography>
                );
        }
    });

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    px: 3,
                    // borderBottom: 1,
                    // borderColor: 'lightgrey',
                    cursor: 'pointer',
                    // color: '#4D455D',
                    // color: 'red',
                    // ':hover': { bgcolor: 'blue', color: 'white' },

                    transition: 'all .2s ease-in-out',
                    ...(open && {
                        bgcolor: 'background.default',
                        '&:hover': { bgcolor: 'background.default' },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            height: '100%',
                            width: '3px',
                            bgcolor: 'primary.main'
                        }
                    })
                    // ...(!open && {
                    //     '&:hover': {
                    //         bgcolor: 'background.paper'
                    //     },
                    //     '&::before': {
                    //         content: '""',
                    //         position: 'absolute',
                    //         top: '0px',
                    //         left: '0px',
                    //         height: '10%',
                    //         width: '3px',
                    //         bgcolor: 'transparent'
                    //     }
                    // })
                }}
                onClick={handleClick}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <ListItemIcon sx={{ minWidth: '32px', position: 'absolute', ml: 18 }}>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemIcon>
                    <Divider />
                    <Typography variant="subtitle1" style={{ fontSize: '12px', fontWeight: '900' }}>
                        {item.title}
                    </Typography>
                </Box>
            </Box>
            <Collapse in={open} timeout={300} unmountOnExit>
                <List
                    sx={{
                        py: 0,
                        px: 2,
                        '& .MuiTypography-root': {
                            fontSize: '0.7rem',
                            textTransform: 'capitalize'
                        }
                    }}
                >
                    {navCollapse}
                </List>
            </Collapse>
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
