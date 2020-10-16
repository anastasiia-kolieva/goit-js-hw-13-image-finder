import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core';
import * as basicLightbox from 'basiclightbox';
import refs from './js/refs.js';
import photoCardTemplate from './templates/photo-card-template.hbs';
import apiService from './js/apiService';
import './styles.css';

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const input = event.currentTarget;
  apiService.word = input.elements.query.value.trim();

  refs.photoCardsContainer.innerHTML = ' ';
  input.reset();

  apiService.resetPage();

  if (apiService.word === ' ') {
    alert({
      text: 'photo name not entered for search',
      type: 'info',
    });
    refs.loadMoreBtn.classList.add('load-more__display-none');
    return;
  } else {
    refs.loadMoreBtn.classList.replace(
      'load-more__display-none',
      'load-more-btn',
    );
  }

  apiService.fetchphotoCards().then(hits => {
    if (hits.length === 0) {
      error({
        text: 'There is no photo with this name.',
      });
      refs.loadMoreBtn.classList.add('load-more__display-none');
    } else {
      updatePhotoCard(hits);

      refs.loadMoreBtn.classList.replace(
        'load-more__display-none',
        'load-more-btn',
      );
    }

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });

    // сделала цикл перебора массиваю во время перебора навешиваю обработчик и если кликнули должна открыться модалка
    for (const card of hits) {
      refs.photoCardsContainer.addEventListener('click', () => {
        const instance = basicLightbox.create(
          `<img src="${card.largeImageURL}" width="800" height="600">`,
        );
        if (event.target.tagName === 'IMG') {
          instance.show();
        }
      });
    }


    // Ещё вариант с forEach
    // const createModal = hits.forEach(card => {
    //   // refs.photoCardsContainer.addEventListener('click', () => {
    //   //   // basicLightbox.create(
    //   //   //   `<img src="${card.largeImageURL}" width="800" height="600">`,
    //   //   // );
    //   // });
    // });

    // if (event.target.tagName === 'IMG') {
    //   createModal().show();
    // }
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
