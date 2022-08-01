import {getUserData} from '../utils.js'

export function addSesion(ctx,next){
    ctx.user = getUserData();
    next()
}