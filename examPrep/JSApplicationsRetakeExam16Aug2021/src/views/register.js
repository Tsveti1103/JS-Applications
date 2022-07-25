import { html } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../utils.js'
import * as userService from '../api/userServiece.js'

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
    <form @submit=${onSubmit} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx,onSubmit)))
}
//същото като логин, но ползваме ф-ята регистер за заявката
// и преди всияко правим проверка дали всички полета са попълнени
// ако не са алъртваме грешка и ретърнваме за да спре програмата
// проверяваме дали паролите съвпадат
async function onSubmit(ctx,data,event){
    if(data.email =='' || data.password==''){
        return alert('All fields are required!')
        /*може и на 2 реда
         alert('All fields are required!')
         return */
    }
    if(data.password != data[`confirm-password`]){
        return alert('Passwords don\'t match!')
    }
    await userService.register(data.email,data.password)
    event.target.reset()
    ctx.page.redirect('/')
}