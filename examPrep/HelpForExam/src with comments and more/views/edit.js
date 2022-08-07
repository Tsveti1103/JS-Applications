import { html } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'
import { createSubmitHandler } from '../utils.js';


const editTemplate = (item,onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value=${item.title} />

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value=${item.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value=${item.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value=${item.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" >${item.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`

export async function editPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId);
    ctx.render(editTemplate(item,createSubmitHandler(ctx,onSubmit)))
}

async function onSubmit(ctx, data, event) {
    const itemId = ctx.params.id;
    //ако една стойност от всички стойности в обекта data
    // е празен масив ще върне true
    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required!')
    }
    //пращаме заявка с тези данни
    await itemSevice.edit(itemId,{
        title: data.title,
        category: data.category,
        maxLevel: data.maxLevel,
        imageUrl: data.imageUrl,
        summary: data.summary
    })
    event.target.reset();
    ctx.page.redirect('/details/'+itemId);
}