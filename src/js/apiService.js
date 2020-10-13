import photoCardTemplate from '../templates/photo-card-template.hbs';
import refs from './refs';

const apiKey = '18681025-f668a3aca189dfba87ba57015';

// Например
fetchphotoCards('dog', 3);

export default function fetchphotoCards(searchWord, searchPage) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchWord}&page=${searchPage}&per_page=12&key=${apiKey}`,
  )
    .then(responce => responce.json())
    .then(({hits}) => {
      const markupPhotoCard = photoCardTemplate(hits);
      refs.photoCardsContainer.insertAdjacentHTML('beforeend', markupPhotoCard);
    })
    .catch(error => console.log(error));
}
