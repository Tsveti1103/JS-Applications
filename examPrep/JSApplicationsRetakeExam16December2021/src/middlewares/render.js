import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('content')
const header = document.querySelector('.header')

function ctxRender(content) {
    render(content, mainElement)
}

const navTemplate = (user) => html`
<nav>
    <a href="/">Theater</a>
    <ul>
        ${user?html`        
        <li><a href="/my">Profile</a></li>
        <li><a href="/create">Create Event</a></li>
        <li><a href="/logout">Logout</a></li>`
        :html`        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`}
    </ul>
</nav>`;

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender;
    next()
}