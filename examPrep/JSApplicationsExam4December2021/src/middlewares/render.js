import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('main-content')
const header = document.querySelector('.header')

function ctxRender(content) {
    render(content, mainElement)
}

const navTemplate = (user) => html`
<nav>
    <img src="./images/headphones.png">
    <a href="/">Home</a>
    <ul>
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        
        ${user ? html`
        <li><a href="/create">Create Album</a></li>
        <li><a href="/logout">Logout</a></li>`
        : html`
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`}
       
    </ul>
</nav>`;

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = ctxRender;
    next()
}