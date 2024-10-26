import axios from '../../axios'

const config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}
function getList(params?: Object) {
    return axios.get('/api/console/article', { params })
}
function getOne(id: string) {
    return axios.get(`/api/console/article/${id}`)
}
function deleteData(params: { _id: string }) {
    return axios.delete('/api/console/article', { params })
}
function addData(data: Object) {
    return axios.post('/api/console/article', data)
}
function update(data: Object) {
    return axios.put('/api/console/article', data, config)
}

function uploadImgToken() {
    return axios.get(`/api/console/article/uploadimg/token`)
}

export {
    getList,
    deleteData,
    addData,
    getOne,
    update,
    uploadImgToken
}