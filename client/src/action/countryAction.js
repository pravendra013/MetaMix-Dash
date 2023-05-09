// import * as api from '../api/index.js';
// import * as crypt from '../utils/crypto.js';

// //COUNTRY-LIST
// export const countryList = (token) => async () => {
//     try {
//         const encryptData = { token: crypt.encryptData(token) };
//         const { data } = await api.countryList(encryptData);
//         // const decryptData = crypt.decryptData(data);
//         // return decryptData;
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// //COUNTRY-ADD
// export const countryCreate = (token) => async () => {
//     try {
//         const encryptData = { token: crypt.encryptData(token) };
//         const { data } = await api.countryCreate(encryptData);
//         // const decryptData = crypt.decryptData(data);
//         // return decryptData;
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// // COUNTRY-UPDATE
// export const countryUpdate = (token) => async () => {
//     try {
//         const encryptData = { token: crypt.encryptData(token) };
//         const { data } = await api.countryUpdate(encryptData);
//         // const decryptData = crypt.decryptData(data);
//         // return decryptData;
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// //COUNTRY-DELETE
// export const countryDelete = (token) => async () => {
//     try {
//         const encryptData = { token: crypt.encryptData(token) };
//         const { data } = await api.countryDelete(encryptData);
//         // const decryptData = crypt.decryptData(data);
//         // return decryptData;
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// //COUNTRY-SEARCH
// export const countryGet = (token) => async () => {
//     try {
//         const encryptData = { token: crypt.encryptData(token) };
//         const { data } = await api.countryGet(encryptData);
//         // const decryptData = crypt.decryptData(data);
//         // return decryptData;
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };
