import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (item, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src="${item.imageUrl}" />
            <h1>${item.title}</h1>
            <span class="levels">MaxLevel: ${item.maxLevel}</span>
            <p class="type">${item.category}</p>
        </div>
        <p class="text">${item.summary}</p>

        ${item.isOwner ? html`
        <div class="buttons">
            <a href="/edit/${item._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>`
        : nothing}
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
        const choice = confirm(`Are you sure you want to delete this ${item.title}?`)
        if (choice) {
            await itemSevice.deleteById(itemId);
            ctx.page.redirect('/')
        }
    }
}