import axios from 'axios'
import store from '../store/index'
const token = localStorage.getItem("token");

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        authorization: `bearer ${token}`,
    },
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (401 === error.response.status) {
        store.dispatch('auth/logout')
        window.location.href = '/auth/login'
    } else {
        return Promise.reject(error);
    }
});

export default instance