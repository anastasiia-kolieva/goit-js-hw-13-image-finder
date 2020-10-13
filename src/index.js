import refs from './js/refs.js';
import apiService from './js/apiService';
import './styles.css';

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  console.log(event.currentTarget.elements.query);
});
