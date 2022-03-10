import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
// import OneNews from "./OneNews";
import ListNews from "./ListNews";
import NewsPage from "./NewsPage";
import api from "../API/HackerNewsApi";

function App() {
  const [newsList, setNewsList] = React.useState([]);
  // const [testNews, setTestNews] = React.useState({});
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [isModal, setIsModal] = React.useState(false);

  React.useEffect(() => {
    getNewsFromApi();
    // getTestApi();
  }, []);

  const getNewsFromApi = () => {
    api
      .getTheLastNewsIds()
      .then((newsIds) => {
        Promise.all(newsIds.map((id) => api.getNews(id)))
          .then((data) => {
            setNewsList(data);
          })
          .catch((err) => console.log("Новостей нет, ", err));
      })
      .catch((err) => console.log("id-шники не пришли, ", err));
  }

  const newsDate = (objectTime) => {
    const date = new Date(objectTime * 1000);
    const day = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {day, time};
  };

  // function getTestApi() {
  //   api
  //     .getTestNews()
  //     .then((data) => {
  //       setTestNews(data);
  //     })
  //     .catch((err) => console.log("Тестовая новость не загрузилась, ", err));
  // }

  return (
    <div className="body">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ListNews newsList={newsList} newsDate={newsDate} />
            {/* <NewsPage newsItem={testNews} /> */}
          </Route>
          <Route path="/news-page/:id">
            <NewsPage newsDate={newsDate}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
