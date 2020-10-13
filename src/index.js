import refs from './js/refs.js';
import photoCardTemplate from './templates/photo-card-template.hbs';
import fetchphotoCards from './js/apiService';
import './styles.css';

let searchWord = ' ';
let searchPage = 1;

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const input = event.currentTarget;
  searchWord = input.elements.query.value;

  refs.photoCardsContainer.innerHTML = ' ';
  input.reset();

  searchPage = 1;
  fetchphotoCards(searchWord, searchPage).then(hits => {
    updatePhotoCard(hits);
    searchPage += 1;
  });
});

function updatePhotoCard(hits) {
  const markupPhotoCard = photoCardTemplate(hits);
  refs.photoCardsContainer.insertAdjacentHTML('beforeend', markupPhotoCard);
}

refs.loadMoreBtn.addEventListener('click', () => {
  fetchphotoCards(searchWord, searchPage).then(hits => {
    updatePhotoCard(hits);
    searchPage += 1;
  });
});
