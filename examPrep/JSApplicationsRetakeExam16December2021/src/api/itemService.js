import * as api from './api.js';
const endpoint = {
    home: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters',
    byId: '/data/theaters/',
    my:(userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    like:`/data/likes`,
    likesCount:(theaterId)=>`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    isLiked:(theaterId,userId)=>`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}


export async function getHome(){
    return api.get(endpoint.home)
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
    return api.get(endpoint.my(id))
}

export async function like(theaterId){
    return api.post(endpoint.like,{theaterId})
}

export async function getLikesCount(theaterId){
    return api.get(endpoint.likesCount(theaterId))
}

export async function isLiked(theaterId,userId){
    return api.get(endpoint.isLiked(theaterId,userId))
}