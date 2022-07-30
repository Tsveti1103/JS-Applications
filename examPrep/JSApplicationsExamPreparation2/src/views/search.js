import { html,render } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const searchTemplate = (onClick) => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        <div class="search-result"></div>
          
    </div>
</section>`

const previewTemplate = (item) => html`
<div class="listing">
        <div class="preview">
            <img src="${item.imageUrl}">
        </div>
        <h2>${item.brand} ${item.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${item.year}</h3>
                <h3>Price: ${item.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${item._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`

const resultsTemplate= (allItems)=> html`
        ${allItems.length > 0 ? allItems.map(item => previewTemplate(item)) 
        : html`<p class="no-result">No result.</p>`}`

export  function searchPage(ctx) {
    const user = ctx.user
    function onClick(ev){
        const searchResultEl = document.getElementsByClassName('search-result')[0]
        const text = document.getElementById('search-input').value;
        itemSevice.search(text)
        .then(allItems => {
            render(resultsTemplate(allItems),searchResultEl)
        })
    }
    ctx.render(searchTemplate(onClick))

}