import * as api from './api.js';
const endpoint = {
    catalog: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/pets',
    byId: '/data/pets/',
    donate: '/data/donation',
    donationCount: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    isDonate: (petId,userId)=> `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`

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


export async function donation(petId){
    return api.post(endpoint.donate,{petId})
}

export async function getDonation(petId){
    return api.get(endpoint.donationCount(petId))
}

export async function isDonationByUser(petId,userId){
    return api.get(endpoint.isDonate(petId,userId))
}
