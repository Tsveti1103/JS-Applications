import { html,nothing,render } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const searchTemplate = (onClick) => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${onClick}>Search</button>
    </div>
    <h2>Results:</h2>
    <div class="search-result">
    </div>
    </div>
</section>`

const previewTemplate = (user, item) => html`
<div class="card-box">
    <img src="${item.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: ${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${user ? html`
        <div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>`: nothing}
    </div>
</div>`

const resultsTemplate= (user,allItems)=> html`
        ${allItems.length > 0 ? allItems.map(item => previewTemplate(user, item)) 
        : html`<p class="no-result">No result.</p>`}`

export  function searchPage(ctx) {
    const user = ctx.user
    function onClick(ev){
        const searchResultEl = document.getElementsByClassName('search-result')[0]
        const query = document.getElementById('search-input').value;
        itemSevice.search(query)
        .then(allItems => {
            render(resultsTemplate(user,allItems),searchResultEl)
        })
    }
    ctx.render(searchTemplate(onClick))

}