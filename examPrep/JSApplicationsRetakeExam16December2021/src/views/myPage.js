import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const myPageTemplate = (user,items) => html`
<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${user.email}</h2>
</div>
<div class="board">
                ${items.length > 0
        ? items.map(previewTemplate) :
            html` <div class="no-events">
                    <p>This user has no events yet!</p>
                    </div>`}
    </div>
</section>`


const previewTemplate = (item) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src="${item.imageUrl}">
        <h2>${item.title}</h2>
        <h6>${item.date}</h6>
        <a href="/details/${item._id}" class="details-button">Details</a>
    </div>
</div>`


export async function myPage(ctx) {
    console.log(ctx.user._id);
    const items = await itemSevice.getMy(ctx.user._id)
    ctx.render(myPageTemplate(ctx.user,items))
}


