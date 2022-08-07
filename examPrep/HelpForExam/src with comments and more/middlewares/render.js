import { render, html } from '../../node_modules/lit-html/lit-html.js'

const mainElement = document.getElementById('main-content')
const header = document.querySelector('.header')

//ф-я за рендериране
function ctxRender(content) {
    render(content, mainElement)
}

// темлейта за навигацията
// ако има user? показва едното
// ако не : другото
const navTemplate = (user) => html`
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalog">All games</a>
    ${user ? html`
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="/logout">Logout</a>
    </div>`
        : html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;


//ф-я която рендерира навигацията и закачаща рендера към контекста
export function addRender(ctx, next) {
    render(navTemplate(ctx.user),header)
    ctx.render = ctxRender;
    next()
}