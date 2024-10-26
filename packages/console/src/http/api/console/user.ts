import axios from '../../axios';

class User {
    _id?: string;
    userName?: string;
    password?: string;
    power?: string;
}

function addUser(body: User) {
    return axios.post('/api/console/user', body)
}

function getUser(params?) {
    return axios.get('/api/console/user', { params })
}

function deleteUser(params?: { _id: string }) {
    return axios.delete('/api/console/user', { params })
}

function isexist(params?: { userName: string }) {
    return axios.get('/api/console/user/isexist', { params })
}

export {
    addUser,
    getUser,
    deleteUser,
    isexist
}