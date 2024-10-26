import axios from '../axios';

function getCarousel() {
    return axios.get(`/api/album/carousel`);
}

function getAlbum(parentId: string | number) {
    return axios.get(`/api/album/${parentId}`)
}

export {
    getCarousel,
    getAlbum
}