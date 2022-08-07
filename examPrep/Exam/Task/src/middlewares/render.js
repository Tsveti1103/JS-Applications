import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.querySelector('.main')
const header = document.querySelector('.header')

function ctxRender(content) {
    render(content, mainElement)
}

const navTemplate = (user) => html`
<a id="logo" href="/">
    <img id="logo-img" src="./images/logo.jpg" alt="" /></a>

<nav>
    <div>
        <a href="/catalog">Dashboard</a>
    </div>
    ${user?html`
    <div class="user">
        <a href="/create">Create Offer</a>
        <a href="/logout">Logout</a>
    </div>`
    :html`
    <div class="guest">
        <a href="login">Login</a>
        <a href="register">Register</a>
    </div>`}
</nav>`;

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender;
    next()
}