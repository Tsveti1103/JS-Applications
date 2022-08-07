import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../utils.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (user,item, onDelete, comments, commentsTemplate,onSubmit,commentFormTemplate) => html`
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
        </div>`: nothing}
        ${commentsTemplate(comments)}
        ${commentFormTemplate(onSubmit,user,item)}
    </div>
</section>`

const commentsTemplate = (comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
    ${comments.length > 0 ? html`<ul>${comments.map(commentCard)}</ul>`
        : html`<p class="no-comment">No comments.</p>`}
</div>`

const commentCard = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}.</p>
</li>`

const commentFormTemplate = (onSubmit,user,item) =>{
    if(user && !item.isOwner){
        return html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onSubmit}class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`
    }
    return nothing
}

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId)
    const comments = await itemSevice.getComments(itemId)
    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
    }
    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this ${item.title}?`)
        if (choice) {
            await itemSevice.deleteById(itemId);
            ctx.page.redirect('/')
        }
    }
    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target))
        if(data.comment==''){
            return alert('All fields are required!')
        }
        await itemSevice.createComment(itemId, data.comment);
        event.target.reset();
        ctx.page.redirect(`/details/${itemId}`);

    }

    ctx.render(detailsTemplate(ctx.user,item, onDelete, comments, commentsTemplate,onSubmit,commentFormTemplate))
}
