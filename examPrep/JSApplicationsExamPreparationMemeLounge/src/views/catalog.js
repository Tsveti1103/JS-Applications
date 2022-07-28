import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'

const catalogTemplate = (allItems) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
            ${allItems.length > 0 ? allItems.map(previewTemplate) :
        html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`

const previewTemplate = (item) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src="${item.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
    </div>
</div>`

 
export async function catalogPage(ctx) {
    const allItems = await itemSevice.getAll()
    ctx.render(catalogTemplate(allItems))
}