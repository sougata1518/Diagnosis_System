import axios from 'axios';
import { doLogin, getToken } from '../../LocalStorage';

export const BASE_URL = 'http://localhost:9090/api';

export const myAxios = axios.create({
    baseURL:BASE_URL
});

export const privateAxios = axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
});

privateAxios.interceptors.request.use(
    async config =>{
        const token = await getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)