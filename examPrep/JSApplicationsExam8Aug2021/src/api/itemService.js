import * as api from './api.js';
const endpoint = {
    catalog: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    byId: '/data/books/',
    myBooks: (userId) =>`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    like:`/data/likes`,
    likes:(bookId) =>`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    likeFromUser: (userId,bookId) =>`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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


export async function getMyBooks(userId){
    return api.get(endpoint.myBooks(userId))
}

export async function like(bookId){
    return api.post(endpoint.like,{bookId})
}

export async function getLikesCount(bookId){
    return api.get(endpoint.likes(bookId))
}


export async function likeFromUser(userId, bookId){
    return api.get(endpoint.likeFromUser(userId, bookId))
}
