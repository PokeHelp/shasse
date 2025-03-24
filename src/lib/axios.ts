import axios, {AxiosInstance} from 'axios';

export const axiosService: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// TODO: voir pour leurs intégration potentielle
// axiosService.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response.status === 401) {
//             // Rediriger vers la page de login si l'utilisateur n'est pas authentifié
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );
//
// axiosService.interceptors.request.use((config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });