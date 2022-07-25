import { clearUserData, setUserData } from '../utils.js';
import * as api from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}
// ф-я за логин правя си post заявка с email и password,
// на съответния път (endpoint)
// запазвам си user данните
export async function login(email, password) {
    const result = await api.post(endpoints.login,{email, password});
    setUserData(result);
    return result;
}

// като login но endpoint-a е различен
export async function register(email, password) {
    const result = await api.post(endpoints.register,{email, password});
    setUserData(result);
    return result;
}

// правя си гет заявка на съответния път (endpoint)
// без await защото искам да се изпълни веднага
// чистя данните в локал сториджът
export async function logout() {
    api.get(endpoints.logout);
    clearUserData();
}
