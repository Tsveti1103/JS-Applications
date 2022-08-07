import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'
import { createSubmitHandler } from '../utils.js';


const editTemplate = (item, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" value=${item.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" value=${item.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" value=${item.category}/>
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50">${item.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50">${item.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" value=${item.salary} />

            <button type="submit">post</button>
        </form>
    </div>
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
        imageUrl: data.imageUrl,
        category: data.category,
        description: data.description,
        requirements: data.requirements,
        salary: data.salary
    })
    event.target.reset();
    ctx.page.redirect('/details/' + itemId);
}