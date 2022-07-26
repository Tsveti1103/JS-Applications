import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const myPageTemplate = (items) => html`
<section id="my-posts-page">
<h1 class="title">My Posts</h1>
        ${items.length > 0
        ?html`<div class="my-posts">${items.map(previewTemplate)}</div>`  :
        html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`

const previewTemplate = (item) => html`
 <div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src="${item.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>`


export async function myPage(ctx) {
    console.log(ctx.user._id);
    const items = await itemSevice.getMy(ctx.user._id)
    ctx.render(myPageTemplate(items))
}


