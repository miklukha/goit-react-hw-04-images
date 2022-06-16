import PropTypes from 'prop-types';
// import axios from 'axios';

// const API_KEY = '563492ad6f917000010000017177ac82ad294f609aa250f88e62125c';
// axios.defaults.baseURL = 'https://api.pexels.com/v1/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
// axios.defaults.params = {
//   orientation: 'landscape',
//   per_page: 15,
// };

// export const getImages = async (query, page) => {
//   const { data } = await axios.get(`search?query=${query}&page=${page}`);
//   return data;
// };

const API_KEY = '26815129-636df5f0482082ec4ff5cd1a9';

// const service = axios.create({
//   baseURL: 'https://pixabay.com/api/',
//   headers: { 'Access-Control-Allow-Origin': '*' },
//   params: {
//     api_key: API_KEY,
//     orientation: 'horizontal',
//     per_page: 12,
//     image_type: 'photo',
//   },
// });

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
// axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };
// axios.defaults.params = {
//   orientation: 'horizontal',
//   per_page: 12,
//   image_type: 'photo',
// };

// export const fetchImage = async (query, page, perPage) => {
//   // const { data } = await axios.get(`search?query=${query}&page=${page}`);
//   // return data;
//   return await axios.get(`search?query=${query}&page=${page}`);
// };

const BASE_URL = 'https://pixabay.com/api/';
function fetchImage(query, page, perPage) {
  const searchParams = new URLSearchParams({
    q: query,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response;
  });
}

export const imageAPI = {
  fetchImage,
};

fetchImage.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
