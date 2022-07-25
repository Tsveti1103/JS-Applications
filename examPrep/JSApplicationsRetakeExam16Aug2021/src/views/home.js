import { html } from '../../node_modules/lit-html/lit-html.js'
import * as gamesService from '../api/gamesService.js'


const homeTemplate = (games) => html`
<section id="welcome-world">
    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">
    <div id="home-page">
        <h1>Latest Games</h1>
        ${games.length>0
        ? games.map(previewTemplate):
    html`<p class="no-articles">No games yet</p>`}
    </div>
</section>`

//създавам темплейт за 1 игра после мапвам всички игри през този темплейт
// ${games.map(previewTemplate)}
// ако няма игри за показване ще покаже
// html`<p class="no-articles">No games yet</p>`
const previewTemplate = (game) => html`
<div class="game">
    <div class="image-wrap">
        <img src="${game.imageUrl}">
    </div>
    <h3>${game.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href="/details/${game._id}" class="btn details-btn">Details</a>
    </div>
</div>`

/*
<a href="/details/${game._id}" class="btn details-btn">Details</a>
така правя като се натисне бутона за детайлите да ги отвори
*/
export async function homePage(ctx) {
    // взимам си данните и заради това е async
    const games = await gamesService.getRecent()
    // ако искам да си видя какви пропъртита
    // има обекта който ми връща заявката
    //console.log(games)
    // или да проверя на http://localhost:3030/admin

    //рендерирам съдържанието
    ctx.render(homeTemplate(games))
}