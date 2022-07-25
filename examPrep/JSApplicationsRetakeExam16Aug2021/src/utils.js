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
/*
получава контекст и функция onSunmit примерно
връща като резултат функцията с параметри контекста,
данните от форм датата и евента
чрез контекста можем да редиректнем
чрез евента можем да достъпим формоляра и да го 
ресетне(ev.target.reset()) - изпразваме полетата
а данните ни трябват за да се логнем
ф-ии като тази се наричат декоратори
даваме и една ф-я и тя я окрасява с някакви други параметри
 и допълнителна функционалност
*/
export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target))
        handler(ctx, formData, event)
    }
}