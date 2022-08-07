import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const myPageTemplate = (user,items) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${items.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
                ${items.length > 0
        ? items.map(previewTemplate) :
            html`<p class="no-memes">No memes in database.</p>
                `}
    </div>
</section>`


const previewTemplate = (item) => html`
 <div class="user-meme">
        <p class="user-meme-title">${item.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${item.imageUrl}">
        <a class="button" href="/details/${item._id}">Details</a>
    </div>`


export async function myPage(ctx) {
    console.log(ctx.user._id);
    const items = await itemSevice.getMy(ctx.user._id)
    ctx.render(myPageTemplate(ctx.user,items))
}


