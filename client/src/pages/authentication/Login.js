//  eslint-disable
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => {
    return (
        <AuthWrapper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography sx={{ color: '#808080', mt: '-0.5rem' }} variant="h3">
                            Login
                        </Typography>
                        <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            {/* Don&apos;t have an account? */}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <AuthLogin />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
