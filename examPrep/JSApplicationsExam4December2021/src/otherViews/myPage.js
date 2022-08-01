import { html } from '../../node_modules/lit-html/lit-html.js'
import * as postsService from '../api/postsService.js'


const myPageTemplate = (items) => html`
        <section id="my-posts-page">
            <h1 class="title">My Posts</h1>
        
            <div class="my-posts">
                ${items.length > 0
        ? items.map(previewTemplate) :
            html`<h1 class="title no-posts-title">You have no posts yet!</h1>
                `}
            </div>
        
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
    const items = await postsService.getMy(ctx.user._id)
    ctx.render(myPageTemplate(items))
}


