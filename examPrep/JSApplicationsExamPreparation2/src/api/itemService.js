import * as api from './api.js';
const endpoint = {
    catalog: '/data/cars?sortBy=_createdOn%20desc',
    create: '/data/cars',
    byId: '/data/cars/',
    myCars: (id) => `/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    search: (text) => `/data/cars?where=year%3D${text}`

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
    return api.get(endpoint.myCars(id))
}

export async function search(text){
    return api.get(endpoint.search(text))
}
