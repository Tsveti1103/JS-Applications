export function getUserData() {
    return JSON.parse(localStorage.getItem('user'))
}

export function getAccessToken() {
    const user = getUserData();
    if (user) {
        return user.accessToken;
    }
    else {
        return null
    }
}

export function clearUserData() {
    localStorage.removeItem('user')
}

export function setUserData(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target))
        handler(ctx, formData, event)
    }
}