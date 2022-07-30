import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (item, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${item.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${item.brand}</li>
            <li><span>Model:</span>${item.model}</li>
            <li><span>Year:</span>${item.year}</li>
            <li><span>Price:</span>${item.price}$</li>
        </ul>

        <p class="description-para">${item.description}</p>
        ${item.isOwner?html`
        <div class="listings-buttons">
            <a href="/edit/${item._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>`: nothing}

    </div>
</section>`

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId)
    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
    }
    ctx.render(detailsTemplate(item, onDelete))
    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this ${item.brand} ${item.model}?`)
        if (choice) {
            await itemSevice.deleteById(itemId);
            ctx.page.redirect('/catalog')
        }
    }
}