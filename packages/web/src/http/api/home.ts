import axios from '../axios';

function getDatas() {
  return axios.get(`/api/home`)
}

export {
  getDatas
}