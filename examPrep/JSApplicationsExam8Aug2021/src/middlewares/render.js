import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('site-content')
const header = document.getElementById('site-header')

function ctxRender(content) {
    render(content, mainElement)
}

const navTemplate = (user) => html`
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/catalog">Dashboard</a>
        ${user ? html`
        <div id="user">
            <span>Welcome, ${user.email}</span>
            <a class="button" href="/my">My Books</a>
            <a class="button" href="/create">Add Book</a>
            <a class="button" href="/logout">Logout</a>
        </div>`
        : html`
        <div id="guest">
            <a class="button" href="/login">Login</a>
            <a class="button" href="/register">Register</a>
        </div>`}
    </section>
</nav>`;

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender;
    next()
}