import * as api from './api.js';
// речник с адресите, на които се ивършват заявките
const endpoint = {
    home: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    catalog: '/data/games?sortBy=_createdOn%20desc',
    create: '/data/games',
    byId: '/data/games/',
    deleteById: '/data/games/',
    edit: '/data/games/',
    // my:(userId)=> `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    //donate: '/data/donation',
    // donationCount: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    // isDonate: (petId,userId)=> `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

// ф-я която праща гет заявка на съответния адрес
export async function getHome(){
    return api.get(endpoint.home)
}
// гет на всички за каталога
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
    return api.del(endpoint.deleteById + id)
}

export async function edit(id,data){
    return api.put(endpoint.edit+id,data)
}


/*
for my things
export async function getMy(id){
    return api.get(endpoint.my(id))
}
*/

/*
for comments

const endpoints = {
    byGameId: (gameId) =>`/data/comments?where=gameId%3D%22${gameId}%22`,
    post: '/data/comments'
}

export async function getByGameID(gameId){
    return api.get(endpoints.byGameId(gameId));
}


export async function postComments(comment) {
    return api.post(endpoints.post,comment);
}
*/

/*

for donation or likes they are the same person
export async function donation(petId){
    return api.post(endpoint.donate,{petId})
}

export async function getDonation(petId){
    return api.get(endpoint.donationCount(petId))
}

export async function isDonationByUser(petId,userId){
    return api.get(endpoint.isDonate(petId,userId))
}
*/