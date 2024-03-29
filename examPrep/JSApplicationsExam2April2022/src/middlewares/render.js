import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('content')
const header = document.querySelector('.header')

function ctxRender(content) {
    render(content, mainElement)
}

const navTemplate = (user) => html`
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Dashboard</a></li>
        ${user?html`
        <li><a href="/create">Create Postcard</a></li>
        <li><a href="/logout">Logout</a></li>`
        :html`
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`}

    </ul>
</nav>`;

export function addRender(ctx, next) {
render(navTemplate(ctx.user),header)
ctx.render = ctxRender;
next()
}