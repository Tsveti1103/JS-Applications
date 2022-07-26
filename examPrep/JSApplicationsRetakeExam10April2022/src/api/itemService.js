import * as api from './api.js';
const endpoint = {
    home: '/data/posts?sortBy=_createdOn%20desc',
    create: '/data/posts',
    byId: '/data/posts/',
    myPosts: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    donate: `/data/donations`,
    totalDonations: (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    userDonation: (postId,userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`

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
    return api.get(endpoint.myPosts(id))
}


export async function makeDonation(postId){
    return api.post(endpoint.donate,{postId})
}


export async function getDonationsCount(postId){
    return api.get(endpoint.totalDonations(postId))
}

export async function getUserDonation(postId,userId){
    return api.get(endpoint.userDonation(postId,userId))
}