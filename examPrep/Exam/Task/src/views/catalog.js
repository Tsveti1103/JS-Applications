import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'

const catalogTemplate = (allItems) => html`
<section id="dashboard">
    <h2>Job Offers</h2>
    ${allItems.length > 0 ? allItems.map(previewTemplate) :
    html`<h2>No offers yet.</h2>`}
</section>`

const previewTemplate = (item) => html`
<div class="offer">
    <img src="${item.imageUrl}" alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${item.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
</div>`
export async function catalogPage(ctx) {
    const allItems = await itemSevice.getAll()
    ctx.render(catalogTemplate(allItems))
}