import * as crypt from './crypto';
const operationCheck = (page, operation) => {
    // const { security_option } = JSON.parse(sessionStorage.getItem('user'));
    const { security_option } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
    let pageIndex = 0;

    for (let index = 0; index < Object.values(security_option).length; index++) {
        if (security_option[index].security_option_name === page) {
            pageIndex = index;
            break;
        }
    }
    console.log(security_option[pageIndex], operation);
    return security_option[pageIndex][operation];
};

export default operationCheck;

// const { user_info } = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));
