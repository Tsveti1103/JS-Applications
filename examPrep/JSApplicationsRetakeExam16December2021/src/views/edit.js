import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'
import { createSubmitHandler } from '../utils.js';


const editTemplate = (item, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value=${item.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${item.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" value=${item.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description"
                placeholder="Description">${item.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value=${item.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>`

export async function editPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId);
    ctx.render(editTemplate(item, createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, event) {
    const itemId = ctx.params.id;
    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required!')
    }
    await itemSevice.editById(itemId, {
        title: data.title,
        date: data.date,
        author: data.author,
        imageUrl: data.imageUrl,
        description: data.description
    })
    event.target.reset();
    ctx.page.redirect('/details/' + itemId);
}