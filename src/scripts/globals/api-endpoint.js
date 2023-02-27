import CONFIG from './config';

const API_ENDPOINT = {
    RESTAURANT_LIST: `${CONFIG.BASE_URL}list`,
    RESTAURANT_DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
    RESTAURANT_SEARCH: (keyword) => `${CONFIG.BASE_URL}search?q=${keyword}`,
    RESTAURANT_POST_REVIEW: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
