import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (user,item,donationsCount, onDelete,onDonate,hasDonated,buttonsTemlate) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${item.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${item.title}</h2>
                <p class="post-description">Description: ${item.description}</p>
                <p class="post-address">Address: ${item.address}</p>
                <p class="post-number">Phone number: ${item.phone}</p>
                <p class="donate-Item">Donate Materials: ${donationsCount}</p>


                <div class="btns">
                    ${buttonsTemlate(user,item,hasDonated,onDelete,onDonate)}
                </div>

            </div>
        </div>
    </div>
</section>`

function buttonsTemlate(user,item,hasDonated,onDelete,onDonate){
    let result = nothing;
    if(user && item.isOwner){
        result = html`  <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
    }
    else if(user && !item.isOwner && hasDonated==0){
        result = html`<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>`
    }
    return result;

}

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await itemSevice.getById(itemId)
    const donationsCount = await itemSevice.getDonationsCount(itemId)
    let userId = ''
    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
        userId = ctx.user._id
    }
    const hasDonated = userId? await itemSevice.getUserDonation(itemId,userId):0
    ctx.render(detailsTemplate(ctx.user,item,donationsCount, onDelete,onDonate,hasDonated,buttonsTemlate))
    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this ${item.title}?`)
        if (choice) {
            await itemSevice.deleteById(itemId);
            ctx.page.redirect('/')
        }
    }
    async function onDonate(){
        await itemSevice.makeDonation(itemId)
        ctx.page.redirect(`/details/${itemId}`)
    }
}

