import * as api from '../api/index.js';
import * as crypt from '../utils/crypto.js';

export const authLogin = (formData, navigate, setError, setShowError) => async () => {
    // console.log(crypt.encryptData(formData));
    try {
        // const newData = crypt.encryptData(formData);

        const newFormData = { in_login_id: formData.user_id, in_password: formData.password };

        // const encryptData = crypt.encryptData(newFormData);
        console.log('Form Data is: ', newFormData);
        const encryptData = { data: crypt.encryptData(newFormData) };
        console.log('1');
        const { data } = await api.signIn(encryptData);
        console.log('2');

        // const decryptData = crypt.decryptData(data);
        // window.sessionStorage.setItem('user', JSON.stringify(decryptData));
        window.sessionStorage.setItem('user', JSON.stringify(data));
        setTimeout(() => {
            navigate('/country');
        }, 10);
        // navigate('/country');
    } catch (error) {
        console.log(error);
        const decryptedData = error.response.data;
        const data = crypt.decryptData(decryptedData);
        setError(data.message);
        setShowError(true);
    }
};

export const authRegister = (formData) => async () => {
    console.log('authRegister');
    try {
        //api call
        await api.authRegisterApi(formData);
    } catch (error) {
        dispatch({
            type: 'SIGNUP_ERROR_MESSAGE',
            payLoad: error.response.data.message
        });
    }
};
