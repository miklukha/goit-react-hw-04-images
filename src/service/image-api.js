import PropTypes from 'prop-types';
import axios from 'axios';
const API_KEY = '26815129-636df5f0482082ec4ff5cd1a9';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  orientation: 'horizontal',
  per_page: 12,
  image_type: 'photo',
};

export const fetchImage = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};

fetchImage.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
