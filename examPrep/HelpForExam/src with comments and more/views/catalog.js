import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'

const catalogTemplate = (allItems) => html`
        <section id="catalog-page">
            <h1>All Games</h1>
            ${allItems.length>0? allItems.map(previewTemplate):
            html`<h3 class="no-articles">No articles yet</h3>`}
        </section>`
        
const previewTemplate = (item) => html`
<div class="allGames">
<div class="allGames-info">
    <img src="${item.imageUrl}">
    <h6>${item.category}</h6>
    <h2>${item.title}</h2>
    <a href="/details/${item._id}" class="details-button">Details</a>
</div>
</div>`
export async function catalogPage(ctx) {
    const allItems = await itemSevice.getAll()
    ctx.render(catalogTemplate(allItems))
}