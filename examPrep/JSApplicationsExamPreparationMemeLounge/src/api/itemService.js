import * as api from './api.js';
const endpoint = {
    catalog: '/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    byId: '/data/memes/',
    myMemes: (userId)=> `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`

}


export async function getAll(){
    return api.get(endpoint.catalog)
}

export async function create(data){
    return api.post(endpoint.create,data)
}

export async function getById(id){
    return api.get(endpoint.byId + id)
}

export async function deleteById(id){
    return api.del(endpoint.byId + id)
}

export async function editById(id,data){
    return api.put(endpoint.byId+id,data)
}

export async function getMy(id){
    return api.get(endpoint.myMemes(id))
}
