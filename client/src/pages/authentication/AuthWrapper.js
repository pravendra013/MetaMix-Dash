import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import metalogo from '../../assets/images/logo/logoMM.png';
// import AuthFooter from 'components/cards/AuthFooter';

// assets
// import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <Box sx={{ minHeight: '100vh' }}>
        {/* <AuthBackground /> */}
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            // justifyContent="center"
            sx={{
                minHeight: '100vh'
            }}
        >
            {/* <Grid item xs={12} sx={{ ml: 3, mt: 3, margin: 'auto' }}>
                <Logo />
            </Grid> */}

            <Grid item xs={12} sx={{ ml: 3, mt: 3, margin: 'auto', display: 'flex' }}>
                <img alt="logo" src={metalogo} style={{ height: '3rem', marginTop: '1rem' }} />
                <h1 style={{ marginLeft: '15px', color: '#808080' }}>MetaMix Tech</h1>
            </Grid>

            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    // alignItems="center"
                    sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                >
                    <Grid item>
                        <AuthCard>{children}</AuthCard>
                    </Grid>
                </Grid>
            </Grid>

            {/* auth footer  */}
            {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                <AuthFooter />
            </Grid> */}
        </Grid>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
