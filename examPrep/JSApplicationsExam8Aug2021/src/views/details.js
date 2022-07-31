import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (user,item, onDelete,onLike,isLiked,likes) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <div class="actions">
            ${user?html`
            ${item.isOwner?html`
            <a class="button" href="/edit/${item._id}">Edit</a>
            <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>`
            :html`${isLiked==0?html`<a class="button" @click=${onLike} href="javascript:void(0)">Like</a>`: nothing}`}`
            :nothing}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${item.description}</p>
    </div>
</section>`

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId)
    const likes = await itemSevice.getLikesCount(itemId)
    let userId;
    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
        userId = ctx.user._id;
    }
    const isLiked = userId? await itemSevice.likeFromUser(ctx.user._id, itemId):0

    ctx.render(detailsTemplate(ctx.user,item, onDelete,onLike,isLiked,likes))
    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this ${item.title}?`)
        if (choice) {
            await itemSevice.deleteById(itemId);
            ctx.page.redirect('/catalog')
        }
    }
    async function onLike(){
        await itemSevice.like(itemId)
        ctx.page.redirect(`/details/${itemId}`)
    }
}