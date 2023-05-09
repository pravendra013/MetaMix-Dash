import axios from 'axios';

import * as crypt from '../utils/crypto.js';
const API = axios.create({ baseURL: `http://${process.env.REACT_APP_BASE_URL}` });

// const API = axios.create({ baseURL: 'http://192.168.15.115:9000' });
// const API = axios.create({ baseURL: 'http://192.168.15.169:9000' });
// const API = axios.create({ baseURL: 'http://localhost:9000' });
// const API = axios.create({ baseURL: 'http://122.176.21.60:9000' });
// const API = axios.create({ baseURL: 'http://122.176.21.59:9000' });
// const API = axios.create({ baseURL: 'http://192.168.15.157:8000' });

API.interceptors.request.use((req) => {
    let user = false;

    if (JSON.parse(sessionStorage.getItem('user'))) {
        // const { user_info } = JSON.parse(sessionStorage.getItem('user'));
        user = true;
    }

    if (user) {
        const user_data = crypt.decryptData(JSON.parse(sessionStorage.getItem('user')));

        const data = {
            token: user_data.user_info.in_token,
            login_id: user_data.user_info.out_loginid
        };

        req.headers.Authorization = `Bearer ${data.login_id} ${data.token}`;
    }

    return req;
});

//LOG-IN & SIGN-IN
export const signIn = (formData) => API.post('/login/validate', formData);
export const authRegisterApi = (formData) => API.post('/user/signup', formData);

//COUNTRY
export const countryList = () => API.post('/country/list');
export const countryCreate = (data) => API.post('/country/create', data);
export const countryDelete = (data) => API.post('/country/delete', data);
export const countryGet = (data) => API.post('/country/get', data);
export const countryUpdate = (data) => API.post('/country/update', data);

//CITY
export const cityList = () => API.post('/city/list');
export const cityCreate = (data) => API.post('/city/create', data);
export const cityDelete = (data) => API.post('/city/delete', data);
export const cityGet = (data) => API.post('/city/get', data);
export const cityUpdate = (data) => API.post('/city/update', data);

//STATE
export const stateList = () => API.post('/state/list');
export const stateCreate = (data) => API.post('/state/create', data);
export const stateDelete = (data) => API.post('/state/delete', data);
export const stateGet = (data) => API.post('/state/get', data);
export const stateUpdate = (data) => API.post('/state/update', data);

//DEPARTMENT
export const departmentList = (data) => API.post('/centerDepartment/list', data);
export const departmentCreate = (data) => API.post('/centerDepartment/create', data);
export const departmentDelete = (data) => API.post('/centerDepartment/delete', data);
export const departmentGet = (data) => API.post('/centerDepartment/get', data);
export const departmentUpdate = (data) => API.post('/centerDepartment/update', data);

//REPORT TYPE
export const reportTypeList = () => API.post('/reportDocumentType/list');
export const reportTypeGet = (data) => API.post('/reportDocumentType/get', data);
export const reportTypeCreate = (data) => API.post('/reportDocumentType/create', data);
export const reportTypeUpdate = (data) => API.post('/reportDocumentType/update', data);
export const reportTypeDelete = (data) => API.post('/reportDocumentType/delete', data);

//PATIENT
export const patientList = () => API.post('/patient/list');
export const patientCreate = (data) => API.post('/patient/create', data);
export const patientDelete = (data) => API.post('/patient/delete', data);
export const patientGet = (data) => API.post('/patient/get', data);
export const patientUpdate = (data) => API.post('/patient/update', data);

//Designation
export const userTypeList = (data) => API.post('/userType/list', data);
export const userTypeGet = (data) => API.post('/userType/get', data);
export const userTypeCreate = (data) => API.post('/userType/create', data);
export const userTypeUpdate = (data) => API.post('/userType/update', data);
export const userTypeDelete = (data) => API.post('/userType/delete', data);

//SECURITY
export const userGroupList = () => API.post('/usergroup/list');
export const userGroupGet = (data) => API.post('/usergroup/get', data);
export const userGroupCreate = (data) => API.post('/usergroup/create', data);
export const userGroupUpdate = (data) => API.post('/usergroup/update', data);

//CENTER
export const centerList = (data) => API.post('/center/list', data);

//SECURITY OPTION LIST
export const securityOptionList = () => API.post('/securityOption/list');

//USER GROUP SECURITY
export const getUserGroupSecurity = (data) => API.post('/userGroupSecurity/get', data);
//         USER/DOCTOR
export const userList = (data) => API.post('/user/list', data);
export const userGet = (data) => API.post('/user/get', data);
export const userCreate = (data) => API.post('/user/create', data);
export const userUpdate = (data) => API.post('/user/update', data);
export const userDelete = (data) => API.post('/user/delete', data);

export const centerGet = (data) => API.post('/center/get', data);
export const centerCreate = (data) => API.post('/center/create', data);
export const centerUpdate = (data) => API.post('/center/update', data);
export const centerDelete = (data) => API.post('/center/delete', data);

//PATIENT-DEPARTMENT
// export const userTypeList = () => API.post('/userType/list');
export const patientDepartmentGet = (data) => API.post('/patientDepartmentMapping/get', data);
export const patientDepartmentCreate = (data) => API.post('/patientDepartmentMapping/create', data);
export const patientDepartmentUpdate = (data) => API.post('/patientDepartmentMapping/update', data);
// export const userTypeDelete = (data) => API.post('/userType/delete', data);

//INSTITUTE
// export const userTypeList = () => API.post('/userType/list');
export const instituteGet = () => API.post('/institute/get');
export const instituteCreate = (data) => API.post('/institute/create', data);
export const instituteUpdate = (data) => API.post('/institute/update', data);
// export const userTypeDelete = (data) => API.post('/userType/delete', data);

//ASSET
export const assetsList = (data) => API.post('/assets/list', data);
export const assetsGet = (data) => API.post('/assets/get', data);
export const assetsCreate = (data) => API.post('/assets/create', data);
export const assetsUpdate = (data) => API.post('/assets/update', data);
export const assetsDelete = (data) => API.post('/assets/delete', data);
export const assetsCenter = (data) => API.post('/center/list', data);

//ASSET USER MAPPING
export const assetUserMappingList = (data) => API.post('/assetUserMapping/list', data);
export const assetUserMappingGet = (data) => API.post('/assetUserMapping/get', data);
export const assetUserMappingCreate = (data) => API.post('/assetUserMapping/create', data);
export const assetUserMappingUpdate = (data) => API.post('/assetUserMapping/update', data);
export const assetUserMappingDelete = (data) => API.post('/assetUserMapping/delete', data);
export const assetUserMappingUserList = (data) => API.post('/user/list', data);

//REPORT DOCUMENT TYPE
export const reportDocumentTypeList = (data) => API.post('/reportDocumentType/list', data);
export const reportDocumentTypeGet = () => API.post('/reportDocumentType/get');
export const reportDocumentTypeCreate = (data) => API.post('/reportDocumentType/create', data);
export const reportDocumentTypeUpdate = (data) => API.post('/reportDocumentType/update', data);
export const reportDocumentTypeDelete = (data) => API.post('/reportDocumentType/delete', data);
// export const reportDocumentTypeCenter = (data) => API.post('/center/list', data);

//PATIEN REPORT
export const patientReportsList = (data) => API.post('/patientReports/list', data);
export const patientReportsGet = (data) => API.post('/patientReports/get', data);

export const patientReportsCreate = (data, content) =>
    API.post('/patientReports/create', data, {
        headers: {
            'Content-Type': content
        }
    });

export const patientReportsUpdate = (data) => API.post('/patientReports/update', data);
export const patientReportsDelete = (data) => API.post('/patientReports/delete', data);
export const patientReportsCenter = (data) => API.post('/center/list', data);
