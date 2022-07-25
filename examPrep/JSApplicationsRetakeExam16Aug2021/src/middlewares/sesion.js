import {getUserData} from '../utils.js'

// закачаме си юзъра ако има такъв към контекста
export function addSesion(ctx,next){
    ctx.user = getUserData();
    next()
}