import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'

const myBooksTemplate = (allItems) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>

            ${allItems.length>0?
            html`
            <ul class="my-books-list">${allItems.map(previewTemplate)}</ul>` 
            :html`
             <p class="no-books">No books in database!</p>`}
        </section>`
        
const previewTemplate = (item) => html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>`

export async function myBooksPage(ctx) {
    const userId = ctx.user._id;
    console.log(userId);
    const allItems = await itemSevice.getMyBooks(userId)
    ctx.render(myBooksTemplate(allItems))
}