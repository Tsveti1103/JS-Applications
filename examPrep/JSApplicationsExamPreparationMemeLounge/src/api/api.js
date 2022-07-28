import { clearUserData, getAccessToken } from "../utils.js";
import { errorMessage } from "../views/notify.js";

const host = 'http://localhost:3030';


async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };
    const token = getAccessToken();
    if (token !== null) {
        options.headers['X-Authorization'] = token;
    }
    if (data) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data);
    };

    try {
        const response = await fetch(host + url, options);
        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData()
            }
            const error = await response.json();
            throw new Error(error.message);
        }
        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        errorMessage(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');

