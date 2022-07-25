import * as api from './api.js';

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