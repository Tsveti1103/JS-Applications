import page from '../node_modules/page/page.mjs'

import { addRender } from './middlewares/render.js';
import { addSesion } from './middlewares/sesion.js';

import { logout } from './api/userServiece.js';

import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';

page(addSesion);
page(addRender);
page('/',homePage)
page('/catalog',catalogPage)
page('/login', loginPage)
page('/register', registerPage)
page('/logout',onLogout)
page('/details/:id', detailsPage)
page('/create', createPage)
page('/edit/:id', editPage)
page.start()

function onLogout(ctx){
    logout();
    ctx.page.redirect('/')
}


import * as itemSevice from './api/itemService.js'

window.itemSevice = itemSevice