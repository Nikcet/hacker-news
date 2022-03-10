const urlStories = "https://hacker-news.firebaseio.com/v0/newstories";
const urlItem = "https://hacker-news.firebaseio.com/v0/item";
const numberOfStories = "100";

class HackerNewsApi {
  constructor(urlNews, urlItem) {
    this.urlNews = urlNews;
    this.urlItem = urlItem;
  }

  onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
  }

  getTheLastNewsIds() {
    return fetch(`${this.urlNews}.json?orderBy="$key"&limitToLast=${numberOfStories}&print=pretty`)
      .then(this.onResponse)
      .then(data => Object.values(data))
  }

  getNews(newsId) {
    return fetch(`${this.urlItem}/${newsId}.json?print=pretty`)
      .then(this.onResponse)
  }

  getComments(newsId) {
    return fetch(`${this.urlItem}/${newsId}.json?print=pretty`)
      .then(this.onResponse)
  }

  getComment(commentId) {
    return fetch(`${this.urlItem}/${commentId}.json?print=pretty`)
      .then(this.onResponse)
  }

  getTestNews() {
    return fetch(`${this.urlItem}/8863.json?print=pretty`)
      .then(this.onResponse)
  }
}

const api = new HackerNewsApi(urlStories, urlItem);

export default api;