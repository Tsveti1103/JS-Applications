import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'

const catalogTemplate = (allItems) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${allItems.length > 0 ? allItems.map(previewTemplate) :
        html`
            <div>
                <p class="no-pets">No pets in dashboard</p>
            </div>`}
    </div>
</section>`

const previewTemplate = (item) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${item.image}">
    </article>
    <h2 class="name">${item.name}</h2>
    <h3 class="breed">${item.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${item._id}">Details</a>
    </div>
</div>`

export async function catalogPage(ctx) {
    const allItems = await itemSevice.getAll()
    ctx.render(catalogTemplate(allItems))
}