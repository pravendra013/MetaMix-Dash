//  eslint-disable
import { Switch } from '../../../node_modules/@mui/material/index';

const ToggleComponent = ({ params }) => {
    const switchActiveStatus = () => {
        // setToggleUpdate({ in_country_name: params.row.country_name, in_country_id: params.row.id, in_active: 1 - params.row.active });
        setUpdateCountry({
            in_country_name: params.row.country_name,
            in_country_id: params.row.id,
            in_active: 1 - params.row.active
        });
        setUpdateConfirmation((state) => !state);
    };

    return (
        <div>
            <Switch
                size="small"
                defaultChecked={params.row.active}
                // inputProps={{ 'aria-label': 'ant design','aria-label': 'controlled' }}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={switchActiveStatus}
                sx={{
                    '& .MuiSwitch-switchBase': {
                        width: '25px',
                        height: '16px',
                        mr: '5px'
                        // padding: '1px'
                    },
                    '& .MuiSwitch-thumb': {
                        width: '12px',
                        height: '12px',
                        mt: '8px'
                    }
                }}
            />
        </div>
    );
};
