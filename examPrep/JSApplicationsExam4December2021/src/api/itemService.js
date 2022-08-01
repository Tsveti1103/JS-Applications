import * as api from './api.js';
const endpoint = {
    catalog: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    byId: '/data/albums/',
    search:(query)=> `/data/albums?where=name%20LIKE%20%22${query}%22`

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

export async function search(query){
    return api.get(endpoint.search(query))
}
