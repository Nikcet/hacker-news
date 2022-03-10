import React from "react";
// import ListNews from "./ListNews";
import { Container, Header, List } from "semantic-ui-react";
import { Link, useRouteMatch } from "react-router-dom";
import NewsPage from "./NewsPage";

const OneNews = (props) => {
  let { path } = useRouteMatch();

  const { day, time } = props.newsDate(props.item.time);

  // console.log(path, props.item.id);

  return (
    <Container>
      <Link to={`${path}news-page/${props.item.id}`}>
        <Header as="h2" className="news__header">
          {props.item.title}
        </Header>
      </Link>
      <List.Content className="news__attributes">
        <p className="news__attribute news__rating">
          rating: {props.item.score};
        </p>
        <p className="news__attribute news__author">
          posted by {props.item.by}
        </p>
        <p className="news__attribute news__date">
          at {time}, {day}
        </p>
      </List.Content>
    </Container>
  );
};

export default OneNews;
