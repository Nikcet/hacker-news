import React from "react";
import { useParams } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import Comments from "./Comments";
import api from "../API/HackerNewsApi";

const NewsPage = (props) => {
  const [news, setNews] = React.useState({});
  const [comments, setComments] = React.useState([]);
  let { id } = useParams();
  const { day, time } = props.newsDate(news.time);

  React.useEffect(() => {
    getNews();
  }, [props.newsItem]);

  const getComments = (newsId) => {
    api
      .getComments(newsId)
      .then((newsObject) => {
        if (newsObject) {
          Promise.all(newsObject.kids.map((id) => api.getComment(id))).then(
            (datas) => {
              setComments(datas);
            }
          );
        }
      })
      .catch((err) => console.log("Не пришли комментарии, ", err));
  };

  const getNews = async () => {
    await api
      .getNews(id)
      .then((newsObject) => {
        if (newsObject) {
          setNews(newsObject);
          getComments(newsObject.id);
        }
      })
      .catch((err) => console.log("Не получил новость, ", err));
  };

  console.log(comments);

  return (
    <Container>
      <a
        href={news?.url}
        className="news__link"
        target="_blank"
        rel="noreferrer"
      >
        <Header as="h1" className="news__header">
          {news?.title}
        </Header>
      </a>
      <p className="news__link-text">
        Link to original:
        <a
          href={news?.url}
          className="news__link"
          target="_blank"
          rel="noreferrer"
        >
          {` ${news?.url}`}
        </a>
      </p>
      <p className="news__date">{`Published at ${time}, ${day}`}</p>
      <p className="news__author">{`By ${news?.by}`}</p>
      <p className="news__comments">{`Number of comments: ${news?.descendants}`}</p>
      <Comments comments={comments} {...props} />
    </Container>
  );
};

export default NewsPage;
