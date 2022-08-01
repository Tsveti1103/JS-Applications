import { html,nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'

const catalogTemplate = (allItems,user) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
        ${allItems.length>0? allItems.map(item=>previewTemplate(item,user)):
        html`<p>No Albums in Catalog!</p>`}
</section>`
        
const previewTemplate = (item,user) => html`
<div class="card-box">
    <img src="${item.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${user?html`
        <div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>`:nothing}
    </div>
</div>`

export async function catalogPage(ctx) {
    const allItems = await itemSevice.getAll()
    ctx.render(catalogTemplate(allItems,ctx.user))
}