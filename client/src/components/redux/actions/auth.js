import axios from 'axios';

import { LOGIN, LOGOUT } from './types';

export const register = data => {
    return dispatch => {
        axios.post('http://localhost:3001/register', data)
            .then(res => {
                let { user, token } = res.data;
                
                dispatch({
                    type: LOGIN,
                    payload: {
                        user, 
                        token,
                    }
                });
            })
            .catch(err => {
                alert('Possible duplicate credentials, try a new username and/or email');
            });
    };
};

export const login = data => {
    return dispatch => {
        axios.post('http://localhost:3001/login', data)
            .then(res => {
                let { user, token } = res.data;

                dispatch({
                    type: LOGIN,
                    payload: {
                        user, 
                        token
                    }
                });
            })
            .catch(err => {
                alert('Check your login credentials and try again');
            });
    };
};

export const userLoggedIn = (user, token) => ({
    type: LOGIN,
    payload: {
        user, token
    }
});

export const logout = () => ({
    type: LOGOUT
});