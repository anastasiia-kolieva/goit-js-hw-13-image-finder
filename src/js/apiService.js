const apiKey = '18681025-f668a3aca189dfba87ba57015';

export default {
  searchWord: ' ',
  searchPage: 1,

  fetchphotoCards() {
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchWord}&page=${this.searchPage}&per_page=12&key=${apiKey}`,
    )
      .then(responce => responce.json())
      .then(data => {
        this.searchPage += 1;
        return data.hits;
      })
      .catch(err => {
        console.log(err);
      });
  },

  resetPage() {
    this.searchPage = 1;
  },

  get word() {
    return this.searchWord;
  },

  set word(newWord) {
    this.searchWord = newWord;
  },
};
