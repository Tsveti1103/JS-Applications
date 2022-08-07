import * as api from './api.js';
const endpoint = {
    home: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    catalog: '/data/games?sortBy=_createdOn%20desc',
    create: '/data/games',
    byId: '/data/games/',

}


export async function getHome(){
    return api.get(endpoint.home)
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
