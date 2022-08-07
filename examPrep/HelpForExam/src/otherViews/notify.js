const errorBoxEl = document.querySelector('#errorBox')
const messageEl=errorBoxEl.querySelector('span')

export function errorMessage(message){
    messageEl.textContent = message;
    errorBoxEl.style.display = 'block';
    setTimeout(() => errorBoxEl.style.display = 'none',3000)
}
