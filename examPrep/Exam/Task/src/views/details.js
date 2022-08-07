import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (user,item, onDelete,totalApp,onApplay,isApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${item.imageUrl} alt="example1" />
        <p id="details-title">${item.title}</p>
        <p id="details-category">
            Category: <span id="categories">${item.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${item.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${item.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${item.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${totalApp}</strong></p>
        ${user?html`
        <div id="action-buttons">
            ${item.isOwner?html`
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
            :html`${isApply==0?html`<a @click=${onApplay} href="" id="apply-btn">Apply</a>`:nothing}`}       
        </div>`: nothing}
        
    </div>
</section>`

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId)
    const totalApp = await itemSevice.getTotalApplications(itemId)
    let userId = ''
    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
        userId = ctx.user._id
    }
    const isApply = userId? await itemSevice.isApply(itemId,userId):0
    ctx.render(detailsTemplate(ctx.user,item, onDelete,totalApp,onApplay,isApply))
    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this ${item.title}?`)
        if (choice) {
            await itemSevice.deleteById(itemId);
            ctx.page.redirect('/catalog')
        }
    }
    async function onApplay() {
        await itemSevice.application(itemId)
        ctx.page.redirect(`/details/${itemId}`)
    }
}