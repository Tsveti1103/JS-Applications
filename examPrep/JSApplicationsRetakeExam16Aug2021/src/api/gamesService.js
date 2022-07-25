import * as api from './api.js';
// речник с адресите, на които се ивършват заявките
const endpoint = {
    recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    allGames: '/data/games?sortBy=_createdOn%20desc',
    create: '/data/games',
    byId: '/data/games/',
    deleteById: '/data/games/',
    update: '/data/games/'
}

// ф-я която праща гет заявка на съответния адрес
export async function getRecent(){
    return api.get(endpoint.recent)
}
// гет на всички за каталога
export async function getAll(){
    return api.get(endpoint.allGames)
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

export async function update(id,data){
    return api.put(endpoint.update+id,data)
}
