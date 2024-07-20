import { useState } from 'react';
import { UserContext } from './UserContext';
import Axios from 'axios';

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

    const refreshToken = async () => {
        try {
            const response = await Axios.post('https://frontend-test-api.aircall.dev/auth/refresh-token', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setToken(response.data.access_token);
            localStorage.setItem('token', JSON.stringify(response.data.access_token));
            return response.data.access_token;
        } catch (error) {
            console.error('Error refreshing token: ', error);
        }
    };

    return (
        <UserContext.Provider value={{ token, setToken, refreshToken}}>
            {children}
        </UserContext.Provider>
    );
};
