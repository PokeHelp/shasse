import axios, {AxiosInstance} from 'axios';

export const axiosService: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});