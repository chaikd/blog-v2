import axios from '../axios';

function login(data: {
    userName: String;
    password: String;
}) {
    return axios.post('/api/auth/login', data)
}

// 验证token
function testToken() {
    return axios.post('/api/auth/token')
}

export {
    login,
    testToken
}