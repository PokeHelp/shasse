import axios, {AxiosInstance} from 'axios';

const axiosService: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosService;