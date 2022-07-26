import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const homeTemplate = (items) => html`
<section id="dashboard-page">
<h1 class="title">All Posts</h1>
        ${items.length>0
        ?html`<div class="all-posts">${items.map(previewTemplate)}</div>` :
    html`<h1 class="title no-posts-title">No posts yet!</h1>`}
</section>`

const previewTemplate = (item) => html`
<div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src="${item.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>`

export async function homePage(ctx) {
    const items = await itemSevice.getHome()
    ctx.render(homeTemplate(items))
}