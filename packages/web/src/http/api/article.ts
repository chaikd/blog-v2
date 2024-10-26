import axios from '../axios'

function getList(params?: {
    currentPage: number,
    size: number,
    [prop: string]: any,
}) {
    return axios.get('/api/article', { params })
}
function getOne(id: string) {
    return axios.get(`/api/article/${id}`)
}

export {
    getList,
    getOne,
}