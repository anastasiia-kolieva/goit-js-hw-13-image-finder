const apiKey = '18681025-f668a3aca189dfba87ba57015';

function fetchphotoCards(searchWord, searchPage) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchWord}&page=${searchPage}&per_page=12&key=${apiKey}`,
  )
    .then(responce => responce.json())
    .then(data=>data.hits)
    .catch(error => console.log(error));
}

export default fetchphotoCards;
