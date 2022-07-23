import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (user, item, isLiked, likes, onDelete, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${item.title}</h1>
            <div>
                <img src=${item.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${item.description}</p>
            <h4>Date: ${item.date}</h4>
            <h4>Author: ${item.author}</h4>
            ${user ? html`
            <div class="buttons">
                ${item.isOwner ? html`
                <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
            : html`${isLiked == 0 ? html`<a class="btn-like" @click=${onLike} href="#">Like</a>` :
                nothing}`}
            </div>`: nothing}

            <p class="likes">Likes: ${likes}</p>
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId)
    const likes = await itemSevice.getLikesCount(itemId)
    const isLiked = ctx.user ? await itemSevice.isLiked(itemId, ctx.user._id) : 0

    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
    }
    ctx.render(detailsTemplate(ctx.user, item, isLiked, likes, onDelete, onLike))
    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this ${item.title}?`)
        if (choice) {
            await itemSevice.deleteById(itemId);
            ctx.page.redirect('/')
        }
    }
    async function onLike() {
        await itemSevice.like(itemId)
        ctx.page.redirect('/details/' + itemId);

    }
}