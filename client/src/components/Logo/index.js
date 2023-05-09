import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
// import Logo from './Logo';
import metalogo from '../../assets/images/logo/logoMM.png';
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
        {/* <Logo /> */}
        <img alt="logo" src={metalogo} style={{ height: '2rem' }} />
        <h3 style={{ marginLeft: '15px', color: '#808080' }}>MetaMix Tech</h3>
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
