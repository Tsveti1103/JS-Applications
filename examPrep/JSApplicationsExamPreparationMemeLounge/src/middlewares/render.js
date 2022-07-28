import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.querySelector('.main')
const header = document.querySelector('.header')

function ctxRender(content) {
    render(content, mainElement)
}

const navTemplate = (user) => html`
<a href="/catalog">All Memes</a>
${user ? html`
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${user.email}</span>
        <a href="/my">My Profile</a>
        <a href="logout">Logout</a>
    </div>
</div>`
        : html`
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>`}
`;

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender;
    next()
}