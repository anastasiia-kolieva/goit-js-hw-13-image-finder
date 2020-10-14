import * as basicLightbox from 'basiclightbox';
import refs from './js/refs.js';
import photoCardTemplate from './templates/photo-card-template.hbs';
import apiService from './js/apiService';
import './styles.css';

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const input = event.currentTarget;
  apiService.word = input.elements.query.value;

  refs.photoCardsContainer.innerHTML = ' ';
  input.reset();

  apiService.resetPage();

  apiService.fetchphotoCards().then(hits => {
    updatePhotoCard(hits);

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });

    hits.forEach(card => {
      // Пытаюсь сделать открытие модального окна с большим изображением (largeImageURL) используя basicLightbox.
      console.log(card.largeImageURL);
      // Пример из документации basicLightbox (при нажатии на кнопку открывается модальное окно):
      // document.querySelector('button.image').onclick = () => {
      // 	basicLightbox.create(`
      //   <img width="1400" height="900" src="https://placehold.it/1400x900">
      // `).show()
      // }
      const photoCardImg = document.querySelector('.photo-card-image');
      // У меня при клике на картинку модальное окно не открывается((
      photoCardImg.onclick = () => {
        basicLightbox
          .create(
            // в src ссылка на большое изображение largeImageURL
            `<img src="${card.largeImageURL}" width="800" height="600">`,
          )
          .show();
      };
    });
  });
});

function updatePhotoCard(hits) {
  const markupPhotoCard = photoCardTemplate(hits);
  refs.photoCardsContainer.insertAdjacentHTML('beforeend', markupPhotoCard);
}

refs.loadMoreBtn.addEventListener('click', () => {
  apiService.fetchphotoCards().then(hits => {
    updatePhotoCard(hits);
  });
});
