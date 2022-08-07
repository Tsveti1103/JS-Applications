import * as api from './api.js';
const endpoint = {
    catalog: '/data/offers?sortBy=_createdOn%20desc',
    create: '/data/offers',
    byId: '/data/offers/',
    applay: `/data/applications`,
    totalApplications: (offerId)=> `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    isApply: (offerId,userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`

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

export async function application(offerId){
    return api.post(endpoint.applay,{offerId})
}

export async function getTotalApplications(offerId){
    return api.get(endpoint.totalApplications(offerId))
}

export async function isApply(offerId,userId){
    return api.get(endpoint.isApply(offerId,userId))
}