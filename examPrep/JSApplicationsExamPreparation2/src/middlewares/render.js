import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('site-content')
const header = document.querySelector('.header')

function ctxRender(content) {
    render(content, mainElement)
}

const navTemplate = (user) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/catalog">All Listings</a>
    <a href="/search">By Year</a>
    ${user?html`
    <div id="profile">
        <a>Welcome ${user.username}</a>
        <a href="/my">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="/logout">Logout</a>
    </div>`
    :html`
        <div id="guest">
        <a href="/login">Login</a>
        <a href="register">Register</a>
    </div>`}
    
</nav>`;

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender;
    next()
}