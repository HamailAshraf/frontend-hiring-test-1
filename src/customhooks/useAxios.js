import Axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useAxios = () => {
    const { token, refreshToken } = useContext(UserContext);

    const axiosInstance = Axios.create({
        baseURL: 'https://frontend-test-api.aircall.dev',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(
        config => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && error.response.status === 401) { // Unauthorized
                // Attempt to refresh token
                try {
                    const newToken = await refreshToken();
                    if (newToken) {
                        // Retry the original request with the new token
                        error.config.headers.Authorization = `Bearer ${newToken}`;
                        return axiosInstance.request(error.config);
                    }
                } catch (refreshError) {
                    console.error('Error refreshing token: ', refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};
