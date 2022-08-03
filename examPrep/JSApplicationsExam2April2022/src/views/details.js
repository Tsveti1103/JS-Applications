import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import * as itemSevice from '../api/itemService.js'


const detailsTemplate = (user,item, onDelete,onDonate,isDonated,totalDonation) => html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${item.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${item.name}</h1>
                        <h3>Breed: ${item.breed}</h3>
                        <h4>Age: ${item.age}</h4>
                        <h4>Weight: ${item.weight}</h4>
                        <h4 class="donation">Donation: ${totalDonation*100}$</h4>
                    </div>
                    ${user? html`
                    <div class="actionBtn">
                        ${item.isOwner?html`
                        <a href="/edit/${item._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                        :html`${isDonated==0?html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`:nothing}
                       `}
                    </div>`
                    :nothing}
                </div>
            </div>
        </section>`

export async function detailsPage(ctx) {
    const petId = ctx.params.id;

    const item = await itemSevice.getById(petId)
    const totalDonation = await itemSevice.getDonation(petId)
    const userId = ctx.user._id;
    const isDonated = userId? await itemSevice.isDonationByUser(petId,userId):0

    if (ctx.user) {
        item.isOwner = ctx.user._id == item._ownerId;
    }
    ctx.render(detailsTemplate(ctx.user,item, onDelete,onDonate,isDonated,totalDonation))

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this ${item.name}?`)
        if (choice) {
            await itemSevice.deleteById(petId);
            ctx.page.redirect('/')
        }
    }
    async function onDonate(){
        await itemSevice.donation(petId)
        ctx.page.redirect(`/details/${petId}`)
    }
}