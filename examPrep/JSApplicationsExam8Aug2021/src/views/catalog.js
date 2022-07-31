import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'

const catalogTemplate = (allItems) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>

            ${allItems.length>0?
            html`
            <ul class="other-books-list">${allItems.map(previewTemplate)}</ul>` 
            :html`
            <p class="no-books">No books in database!</p>`}
        </section>`
        
const previewTemplate = (item) => html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>`


export async function catalogPage(ctx) {
    const allItems = await itemSevice.getAll()
    ctx.render(catalogTemplate(allItems))
}