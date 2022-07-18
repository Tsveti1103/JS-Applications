import {contacts} from './contacts.js'
import {html,render} from './node_modules/lit-html/lit-html.js'
const contactsDiv = document.getElementById('contacts');
let a = []
contacts.forEach(contact=>createContact(contact));

function createContact(contact){
    const el = html`<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button class="detailsBtn" @click="${(ev) => showMore(ev)}">Details</button>
        <div class="details" id="${contact.id}">
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>
    </div>
</div>`
a.push(el);
}
render(a,contactsDiv)

function showMore(ev){
    if(ev.target.textContent == 'Details'){
        ev.target.nextElementSibling.style.display='inline'
        ev.target.textContent = 'Hide'
    }else{
        ev.target.nextElementSibling.style.display='none'
        ev.target.textContent = 'Details'
    }
}