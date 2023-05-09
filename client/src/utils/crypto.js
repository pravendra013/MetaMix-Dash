import CryptoJS from 'crypto-js';

// const secretPass = process.env.REACT_APP_SECRET_KEY;
const secretPass = process.env.REACT_APP_SECRET_KEY;

export const encryptData = (data) => {
    try {
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), secretPass).toString();
        // const encryptData = CryptoJS.AES.encrypt(data, secretPass);

        return encryptData;
        // return 1;
    } catch (error) {
        console.log(error);
    }
};

export const decryptData = (data) => {
    try {
        // const bytes = CryptoJS.AES.decrypt(data, secretPass);
        const bytes = CryptoJS.AES.decrypt(data, secretPass);

        const decryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptData;
    } catch (error) {
        console.log(error);
    }
};
